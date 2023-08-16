import fs from "node:fs/promises"
import { existsSync } from "node:fs"
import path from "node:path"
import os from "node:os"
import util from "node:util"
import child_process from "node:child_process"

const exec = util.promisify(child_process.exec);

const CWD = process.cwd()
const SOURCE_PATH = process.argv[2] ?? error("Expect source path to be provided")
const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? error("Expect GITHUB_TOKEN to be provided with env variables")

async function readdirRecursive(dirName) {
  const files = [];
  const items = await fs.readdir(dirName, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory()) {
      files.push(...(await readdirRecursive(path.join(dirName, item.name))))
    } else {
      files.push(path.join(dirName, item.name));
    }
  }

  return files;
}

async function moveAll(from, to) {
  const files = await fs.readdir(from);
  return Promise.all(files.map(file => fs.copyFile(path.join(from, file), path.join(to, file))))
}

async function buildSingleWebsite(workingDir, configPath, rootPath = "/") {
  await fs.cp(configPath, path.join(workingDir, path.basename(configPath)));
  await exec("npm i", { cwd: workingDir })
  await exec("npm run build", {
    cwd: workingDir,
    env: Object.assign({ ROOT_PATH: rootPath }, process.env)
  })
}

async function main() {
  const TMP_DIR = path.join(os.tmpdir(), Date.now().toString())
  const DIST_PATH = path.join(CWD, "dist");
  const FULL_SOURCE_PATH = path.join(CWD, SOURCE_PATH)
  const FULL_EVENTS_PATH = path.join(FULL_SOURCE_PATH, "events")
  const FULL_CONFIG_PATH = path.join(FULL_SOURCE_PATH, ".confrc")


  if (existsSync(DIST_PATH)) {
    await fs.rm(DIST_PATH, { recursive: true, force: true });
  }
  
  await exec(`git clone https://${GITHUB_TOKEN}@github.com/fest-dev/template.git ${TMP_DIR}`)

  await buildSingleWebsite(TMP_DIR, FULL_CONFIG_PATH);
  await fs.cp(path.join(TMP_DIR, "dist"), DIST_PATH, { recursive: true });

  for (const subConfig of await readdirRecursive(FULL_EVENTS_PATH)) {
    const SUB_CONFIG_SOURCE = path.relative(FULL_SOURCE_PATH, path.dirname(subConfig))
    await buildSingleWebsite(TMP_DIR, subConfig, `/${SUB_CONFIG_SOURCE}/`)
    await moveAll(path.join(TMP_DIR, "dist", "_astro"), path.join(DIST_PATH, "_astro"))
    await fs.rm(path.join(TMP_DIR, "dist", "_astro"), { recursive: true }) 
    await fs.cp(
      path.join(TMP_DIR, "dist"),
      path.join(DIST_PATH, SUB_CONFIG_SOURCE),
     { recursive: true }
    )
  }

  await fs.cp(path.join(CWD, "CNAME"), path.join(DIST_PATH, "CNAME"));
}

main()

function error(message) {
  throw new Error(message)
}
