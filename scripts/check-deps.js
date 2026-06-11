#!/usr/bin/env node
/**
 * Monthly dependency checker.
 *
 * Usage:
 *   node scripts/check-deps.js            # report only, no file changes
 *   node scripts/check-deps.js --apply    # report + write bumps to package.json
 *   COOLING_DAYS=30 node scripts/check-deps.js
 *
 * Exit codes:
 *   0  — nothing outdated
 *   1  — outdated found (or --apply wrote changes)
 */
'use strict';

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const COOLING_DAYS = parseInt(process.env.COOLING_DAYS || '14', 10);
const APPLY = process.argv.includes('--apply');

// Packages whose major bumps require extra human validation
const HIGH_RISK_DEVDEPS = new Set([
  'typescript', 'jest', 'jest-environment-jsdom', 'ts-jest',
  'eslint', 'react', 'react-dom', '@babel/core', '@babel/preset-env',
  '@babel/preset-typescript', '@babel/preset-react',
]);

function semverCompare(a, b) {
  const parts = v => v.replace(/^[^0-9]*/, '').split('.').map(n => parseInt(n, 10) || 0);
  const pa = parts(a), pb = parts(b);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const diff = (pa[i] || 0) - (pb[i] || 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

function majorOf(v) {
  return parseInt(v.replace(/^[^0-9]*/, '').split('.')[0], 10) || 0;
}

function isPreRelease(version) {
  return /[.-](alpha|beta|rc|next|canary|pre|dev|experimental)/i.test(version);
}

/**
 * Risk levels:
 *   HIGH   - major bump of a runtime dep, or major bump of core toolchain devDep
 *   MEDIUM - major bump of any other devDep
 *   LOW    - minor or patch bump
 */
function riskLevel(name, currentVersion, newVersion, section) {
  const isMajorBump = majorOf(newVersion) > majorOf(currentVersion);
  if (!isMajorBump) return 'LOW';
  if (section === 'dependencies') return 'HIGH';
  if (HIGH_RISK_DEVDEPS.has(name)) return 'HIGH';
  return 'MEDIUM';
}

function getNpmTimes(pkg) {
  try {
    const raw = execSync(`npm info "${pkg}" time --json 2>/dev/null`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function parseSpec(spec) {
  const match = spec.match(/^([~^>=<]*)(.+)$/);
  return { range: match?.[1] || '', version: match?.[2] || spec };
}

function cutoffDate() {
  const d = new Date();
  d.setDate(d.getDate() - COOLING_DAYS);
  return d;
}

function daysOld(dateStr) {
  return Math.floor((Date.now() - new Date(dateStr)) / 86400000);
}

function stableVersions(times) {
  return Object.entries(times)
    .filter(([v]) => v !== 'created' && v !== 'modified' && !isPreRelease(v))
    .sort((a, b) => semverCompare(b[0], a[0]));
}

function main() {
  const pkgPath = path.resolve(process.cwd(), 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

  const cutoff = cutoffDate();
  const cutoffStr = cutoff.toISOString().slice(0, 10);
  const today = new Date().toISOString().slice(0, 10);

  console.log(`\nDependency check — ${today}`);
  console.log(`Cooling period: ${COOLING_DAYS} days  |  Cutoff: ${cutoffStr}`);
  if (APPLY) console.log('Mode: --apply (package.json will be updated)');
  console.log('');

  const outdated = [];
  const errors = [];

  for (const section of ['dependencies', 'devDependencies']) {
    if (!pkg[section]) continue;

    for (const [name, currentSpec] of Object.entries(pkg[section])) {
      const { range, version: currentVersion } = parseSpec(currentSpec);

      process.stdout.write(`  checking ${name} ... `);
      const times = getNpmTimes(name);

      if (!times) {
        process.stdout.write('⚠  registry error\n');
        errors.push(name);
        continue;
      }

      const stable = stableVersions(times);
      const compliant = stable.filter(([, d]) => new Date(d) <= cutoff);

      if (!compliant.length) {
        process.stdout.write('— skip (no stable compliant version)\n');
        continue;
      }

      const [latestCompliant, compliantDate] = compliant[0];
      const [latestOverall, overallDate] = stable[0];

      if (semverCompare(latestCompliant, currentVersion) <= 0) {
        process.stdout.write(`  up to date (${currentVersion})\n`);
        continue;
      }

      const isExcluded = semverCompare(latestOverall, latestCompliant) > 0;
      const age = daysOld(compliantDate);
      const risk = riskLevel(name, currentVersion, latestCompliant, section);

      process.stdout.write(
        `  OUTDATED  ${currentVersion} → ${latestCompliant}  [${risk}]` +
        (isExcluded ? `  (${latestOverall} excluded — ${daysOld(overallDate)}d old)` : '') +
        '\n'
      );

      outdated.push({
        name,
        section,
        current: currentSpec,
        latest: range + latestCompliant,
        published: compliantDate.slice(0, 10),
        age,
        risk,
        excluded: isExcluded ? latestOverall : null,
        excludedAge: isExcluded ? daysOld(overallDate) : null,
      });

      if (APPLY) {
        pkg[section][name] = range + latestCompliant;
      }
    }
  }

  if (APPLY && outdated.length) {
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  }

  // ── Report ──────────────────────────────────────────────────────────────────
  console.log('\n── Report ' + '─'.repeat(71));

  if (!outdated.length) {
    console.log('\n  ✓ All dependencies are up to date.\n');
    if (errors.length) {
      console.log(`  ⚠  ${errors.length} package(s) skipped due to registry errors.\n`);
    }
    process.exit(0);
  }

  const high   = outdated.filter(r => r.risk === 'HIGH');
  const medium = outdated.filter(r => r.risk === 'MEDIUM');
  const low    = outdated.filter(r => r.risk === 'LOW');

  console.log(`\n  ${outdated.length} package(s) ${APPLY ? 'bumped' : 'can be upgraded'} — ${high.length} HIGH / ${medium.length} MEDIUM / ${low.length} LOW\n`);

  const col = (s, w) => String(s).padEnd(w);
  console.log(`  ${col('Package', 44)} ${col('Current', 12)} ${col('Available', 12)} Published   Age  Risk`);
  console.log(`  ${'─'.repeat(100)}`);

  const RISK_ICON = { HIGH: '🔴', MEDIUM: '🟡', LOW: '🟢' };

  for (const group of [high, medium, low]) {
    for (const r of group) {
      const note = r.excluded ? `  ← ${r.excluded} excluded (${r.excludedAge}d old)` : '';
      console.log(
        `  ${col(r.name, 44)} ${col(r.current, 12)} ${col(r.latest, 12)} ${r.published}  ${String(r.age).padStart(3)}d  ${RISK_ICON[r.risk]} ${r.risk}${note}`
      );
    }
  }

  // ── Risk guidance ────────────────────────────────────────────────────────────
  if (high.length) {
    console.log('\n── HIGH risk guidance ' + '─'.repeat(59));
    console.log('\n  These packages have breaking changes between major versions.');
    console.log('  Read the changelog before merging:\n');
    for (const r of high) {
      const type = r.section === 'dependencies' ? '(runtime — affects consumers)' : '(core toolchain)';
      console.log(`  • ${r.name}  ${r.current} → ${r.latest}  ${type}`);
      console.log(`    Check: https://www.npmjs.com/package/${r.name}?activeTab=versions`);
    }
    console.log('');
  }

  if (!APPLY) {
    console.log(`\n  Next steps:
    1. Review HIGH risk items first and test thoroughly
    2. Bump versions manually in package.json after testing
    3. CI validate-deps gate enforces the 14-day cooling period on your PR\n`);
  } else {
    console.log('\n  package.json updated. Run npm install to apply.\n');
  }

  process.exit(1);
}

main();
