import {execSync} from "node:child_process"
import {isDebug, log} from "../logger/logger.js"
import {Messages} from "../messages/messages.js"

export function getGitConfig(key: string): string {
  try {
    return execSync(`git config --get ${key}`, {
      encoding: "utf8"
    }).trim()
  } catch {
    return ""
  }
}

export function configureLocalGitUser(targetDir: string, name: string, email: string): void {
  try {
    execSync(`git config user.name "${name}"`, {cwd: targetDir})
    execSync(`git config user.email "${email}"`, {cwd: targetDir})
    log.info(Messages.GIT.USER_CONFIGURED())
  } catch {
    log.warn(Messages.ERROR.GIT_CONFIG_FAILED())
  }
}

export function initGitRepo(targetDir: string): void {
  const quiet = isDebug() ? '' : '-q'

  try {
    execSync("git --version", {stdio: "ignore"})
  } catch {
    log.warn(Messages.GIT.NOT_INSTALLED())
    return
  }

  try {
    execSync(`git init ${quiet} -b main`, {cwd: targetDir, stdio: "inherit"})
    execSync("git add .", {cwd: targetDir, stdio: "inherit"})
    log.info(Messages.GIT.INITIALIZED())
    execSync(`git commit ${quiet} -m "Initial commit"`, {cwd: targetDir, stdio: "inherit"})
    log.info(Messages.GIT.INITIAL_COMMIT())
  } catch {
    log.warn(Messages.ERROR.GIT_INIT_FAILED())
  }
}
