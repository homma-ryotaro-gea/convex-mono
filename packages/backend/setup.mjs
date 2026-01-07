/**
 * This script runs `npx @convex-dev/auth` to help with setting up
 * environment variables for Convex Auth.
 *
 * You can safely delete it and remove it from package.json scripts.
 */

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import { config as loadEnvFile } from "dotenv";

if (!fs.existsSync(".env.local")) {
	// Something is off, skip the script.
	process.exit(0);
}

const config = {};
loadEnvFile({ path: ".env.local", processEnv: config, quiet: true });

const runOnceWorkflow = process.argv.includes("--once");

if (runOnceWorkflow && config.SETUP_SCRIPT_RAN !== undefined) {
	// The script has already ran once, skip.
	process.exit(0);
}

const variables = JSON.stringify({
	help:
		"This command can help you configure the credentials for authentication services " +
		"via additional Convex environment variables.",
	providers: [],
	success:
		"You're all set. If you need to, you can rerun this command with `node setup.mjs`.",
});

console.error(
	"You chose Convex Auth as the auth solution. " +
		"This command will walk you through setting up " +
		"the required Convex environment variables",
);

const result = spawnSync(
	"npx",
	["@convex-dev/auth", "--variables", variables, "--skip-git-check"],
	{ stdio: "inherit" },
);

if (runOnceWorkflow) {
	fs.writeFileSync(".env.local", "\nSETUP_SCRIPT_RAN=1\n", { flag: "a" });
}

process.exit(result.status);
