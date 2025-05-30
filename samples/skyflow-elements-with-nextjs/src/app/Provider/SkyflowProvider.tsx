"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Env, LogLevel, SkyflowElements } from "skyflow-react-js";
import { IConfig } from "skyflow-react-js/lib/core";

const SkyflowProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [skyflowConfig, setSkyflowConfig] = useState<IConfig>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getBearerToken = () => {
        return new Promise<string>((resolve) => {
            resolve("<TOKEN>");
        });
      };

      const config = {
        vaultID: "<VAULT_ID>",
        vaultURL: "<VAULT_URL>",
        getBearerToken,
        options: {
          logLevel: LogLevel.DEBUG,
          env: Env.DEV,
        },
      };
      setSkyflowConfig(config);
    }
  }, []);

  /*
  // Comment above useEffect and uncomment below code to use with hooks
  const getBearerToken = useCallback(() => {
    return new Promise<string>((resolve) => {
      resolve("<TOKEN>");
    });
  }, []);

  const config = useMemo(() => {
    return {
      vaultID: "<VAULT_ID>",
      vaultURL: "<VAULT_URL>",
      getBearerToken,
      options: {
        logLevel: LogLevel.DEBUG,
        env: Env.DEV,
      },
    };
  }, [getBearerToken]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Set the skyflow config once window is defined
      setSkyflowConfig(config);
    }
  }, [config]);

  */

  if (!skyflowConfig) return null;
  return <SkyflowElements config={skyflowConfig}>{children}</SkyflowElements>;
};

export default SkyflowProvider;
