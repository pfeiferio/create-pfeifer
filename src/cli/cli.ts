#!/usr/bin/env node

import fs from "node:fs/promises"
import path from "node:path"
import {fileURLToPath} from "node:url"
import process from "node:process"

import {configureLocalGitUser, initGitRepo} from "../git/git.js"
import {promptAuthor, promptNodeVersion, promptPackageName} from "../prompt/prompt.js"
import {configureLogger, log} from "../logger/logger.js"
import {Messages} from "../messages/messages.js"
import {renderDirectory} from "../template/renderTemplate.js"
import {parseArguments} from "../arguments/arguments.js";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const pkg = JSON.parse(await fs.readFile(path.join(__dirname, "../../package.json"), "utf8"))
const {args, version, debug} = parseArguments(process.argv.slice(2))

if (version) {
  log.info(`create-pfeifer v${pkg.version}`)
  process.exit(0)
}

configureLogger({debug})

async function main(): Promise<void> {
  try {
    log.info(Messages.INFO.STARTING(pkg.version))

    let projectName = args[0] ?? ""

    if (!projectName) {
      projectName = await promptPackageName()
    }

    if (!projectName) {
      log.error(Messages.ERROR.MISSING_PROJECT_NAME())
      log.info("Usage: npm create pfeifer <project-name>")
      process.exit(1)
    }

    const nodeVersion = await promptNodeVersion()

    const author = await promptAuthor()
    const authorString = `${author.name} <${author.email}>`

    const targetDir = path.resolve(process.cwd(), projectName)

    try {
      await fs.access(targetDir)
      log.error(Messages.ERROR.DIRECTORY_EXISTS(projectName))
      process.exit(1)
    } catch {
      // expected → directory does not exist
    }

    log.info(Messages.INFO.CREATING_PROJECT(projectName))
    await fs.mkdir(targetDir, {recursive: true})

    log.info(Messages.INFO.COPYING_FILES())
    const templateDir = path.resolve(__dirname, "../templates/package")
    await renderDirectory(templateDir, targetDir, {
      package: {
        name: projectName,
        description: "",
        author: authorString
      },
      node: {
        version: nodeVersion
      }
    })

    log.info(Messages.INFO.INITIALIZING_GIT())
    initGitRepo(targetDir)

    log.info(Messages.INFO.CONFIGURING_GIT())
    configureLocalGitUser(targetDir, author.name, author.email)

    log.info(Messages.INFO.SUCCESS())
    log.info(Messages.INFO.NEXT_STEPS(projectName))
  } catch (err) {
    log.error(Messages.ERROR.UNEXPECTED(err))
    process.exit(1)
  }
}


function isCancelError(err: unknown): boolean {
  return err === "" || (err instanceof Error && err.message === "")
}

process.on("uncaughtException", (err) => {
  if ("code" in err && err.code === "ERR_USE_AFTER_CLOSE") {
    log.info("\n❌ Aborted.")
    process.exit(1)
  }
  throw err
})

try {
  await main()
} catch (err) {
  if (isCancelError(err)) {
    log.info("\n❌ Aborted.")
    process.exit(1)
  }
  log.error(Messages.ERROR.UNEXPECTED(err))
  process.exit(1)
}
