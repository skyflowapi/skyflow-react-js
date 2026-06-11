#!/usr/bin/env node
/**
 * 14-day cooling period validator — PR gate.
 *
 * Checks every version currently pinned in package.json against its npm publish
 * date. Fails if any version was published less than COOLING_DAYS days ago.
 *
 * Run automatically on PRs that touch package.json (see CI.yml).
 * Can also be run locally before pushing:
 *
 *   node scripts/validate-deps.js
 *   COOLING_DAYS=30 node scripts/validate-deps.js
 *
 * Exit codes:
 *   0  — all versions satisfy the cooling period
 *   1  — one or more versions are too recent
 */
'use strict';

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const COOLING_DAYS = parseInt(process.env.COOLING_DAYS || '14', 10);

function getPublishDate(pkg, version) {
  try {
    const raw = execSync(`npm info "${pkg}@${version}" time --json 2>/dev/null`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    const times = JSON.parse(raw);
    return times[version] ? new Date(times[version]) : null;
  } catch {
    return null;
  }
}

function parseSpec(spec) {
  const match = spec.match(/^([~^>=<]*)(.+)$/);
  return match?.[2] || spec;
}

function daysOld(date) {
  return Math.floor((Date.now() - date.getTime()) / 86400000);
}

function main() {
  const pkgPath = path.resolve(process.cwd(), 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - COOLING_DAYS);
  const cutoffStr = cutoff.toISOString().slice(0, 10);
  const today = new Date().toISOString().slice(0, 10);

  console.log(`\n14-day cooling period check — ${today}`);
  console.log(`Policy: versions must be published on or before ${cutoffStr}\n`);

  const violations = [];
  const registryErrors = [];

  for (const section of ['dependencies', 'devDependencies']) {
    if (!pkg[section]) continue;

    for (const [name, spec] of Object.entries(pkg[section])) {
      const version = parseSpec(spec);

      process.stdout.write(`  ${name}@${version} ... `);
      const publishDate = getPublishDate(name, version);

      if (!publishDate) {
        process.stdout.write('⚠  could not verify (registry error)\n');
        registryErrors.push({ name, version });
        continue;
      }

      const age = daysOld(publishDate);

      if (publishDate > cutoff) {
        process.stdout.write(`✗  FAIL (published ${publishDate.toISOString().slice(0, 10)}, only ${age}d old)\n`);
        violations.push({ name, version, published: publishDate.toISOString().slice(0, 10), age });
      } else {
        process.stdout.write(`✓  ${publishDate.toISOString().slice(0, 10)} (${age}d old)\n`);
      }
    }
  }

  console.log('\n── Result ' + '─'.repeat(71));

  if (registryErrors.length) {
    console.log(`\n  ⚠  ${registryErrors.length} package(s) could not be verified:`);
    registryErrors.forEach(({ name, version }) => console.log(`     - ${name}@${version}`));
  }

  if (!violations.length) {
    console.log('\n  ✓ All versions satisfy the 14-day cooling period.\n');
    process.exit(0);
  }

  console.log(`\n  ✗ ${violations.length} version(s) violate the ${COOLING_DAYS}-day cooling period:\n`);
  const col = (s, w) => String(s).padEnd(w);
  console.log(`  ${col('Package', 44)} ${col('Version', 12)} Published   Days old`);
  console.log(`  ${'─'.repeat(72)}`);
  violations.forEach(({ name, version, published, age }) => {
    console.log(`  ${col(name, 44)} ${col(version, 12)} ${published}  ${age}d`);
  });

  console.log(`
  These versions were published less than ${COOLING_DAYS} days ago.
  Wait until ${cutoffStr} has passed or pin to an older compliant version.
`);

  process.exit(1);
}

main();
