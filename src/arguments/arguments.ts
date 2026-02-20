import {log} from "../logger/logger.js";
import process from "node:process";

export function parseArguments(args: string[]) {

  let version = false
  let debug = false
  const prepared = args.filter(arg => {
      if (arg === '--version' || arg === '-v') {
        version = true
        return false
      } else if (arg === '--debug' || arg === '-d') {
        debug = true
        return false
      }

      if (arg.startsWith('-')) {
        log.error(`unknonw option ${arg}`)
        process.exit(1)
      }

      return true
    }
  )

  return {
    args: prepared,
    version,
    debug
  }
}
