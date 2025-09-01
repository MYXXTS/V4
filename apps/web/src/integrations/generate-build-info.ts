import * as fs from "fs";
import { execSync } from "child_process";
import type { AstroIntegration, AstroIntegrationLogger } from "astro";

interface BuildInfo {
  version: string;
  commitTime: string;
  commitHash: string;
  commitLink: string;
  buildTime: string;
}

const getLastCommitHash = (
  logger: AstroIntegrationLogger
): {
  fullHash: string;
  commitLink: string;
  commitTime: string;
} => {
  try {
    const fullHash = execSync("git rev-parse HEAD").toString().trim();
    const remoteUrl = execSync("git config --get remote.origin.url")
      .toString()
      .trim();
    const commitTime = new Date(
      execSync('git log -1 --pretty=format:"%cd" --date=iso').toString().trim()
    ).toISOString();

    let repoUrl = "";
    if (remoteUrl.includes("github.com")) {
      if (remoteUrl.startsWith("git@github.com:")) {
        const repo = remoteUrl
          .replace("git@github.com:", "")
          .replace(".git", "");
        repoUrl = `https://github.com/${repo}`;
      } else if (remoteUrl.startsWith("https://github.com/")) {
        repoUrl = remoteUrl.replace(".git", "");
      }
    }

    const commitLink = repoUrl ? `${repoUrl}/commit/${fullHash}` : "";

    return {
      fullHash,
      commitLink,
      commitTime,
    };
  } catch (err: any) {
    logger.error(`获取Git信息失败: ${err.message}`);
    return {
      fullHash: "unknown",
      commitLink: "",
      commitTime: "",
    };
  }
};

const getVersion = (logger: AstroIntegrationLogger): string => {
  try {
    const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));
    return packageJson.version || "0.0.0";
  } catch (err: any) {
    logger.error(`读取package.json失败: ${err.message}`);
    return "0.0.0";
  }
};

const generateBuildInfo = (logger: AstroIntegrationLogger): void => {
  const { fullHash, commitLink, commitTime } = getLastCommitHash(logger);
  const version = getVersion(logger);
  const path = "./src/assets/build-info.json";

  const buildInfo: BuildInfo = {
    version,
    commitTime,
    commitHash: fullHash,
    commitLink,
    buildTime: new Date().toISOString(),
  };

  fs.writeFileSync(path, JSON.stringify(buildInfo, null, 2));
};

export function generateBuildInfoIntegration(): AstroIntegration {
  return {
    name: "generate-build-info",
    hooks: {
      "astro:config:setup": ({ logger }) => {
        generateBuildInfo(logger);
        logger.info("Integration ready.");
      },
    },
  };
}
