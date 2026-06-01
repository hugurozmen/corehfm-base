import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [, , appName, featureName] = process.argv;

if (!appName || !featureName) {
  throw new Error("Usage: create-feature <mobile|web> <feature-name>");
}

const featureRoot = join(process.cwd(), "apps", appName, "src", "features", featureName);
const folders = ["api", "components", "hooks"];

mkdirSync(featureRoot, { recursive: true });

for (const folder of folders) {
  mkdirSync(join(featureRoot, folder), { recursive: true });
}

writeFileSync(join(featureRoot, "schema.ts"), "export {};\n", { flag: "wx" });
writeFileSync(join(featureRoot, "types.ts"), "export {};\n", { flag: "wx" });
writeFileSync(join(featureRoot, "index.ts"), "export {};\n", { flag: "wx" });

console.log(`Created ${featureRoot}`);
