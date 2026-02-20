interface LoggerOptions {
  silent?: boolean
  debug?: boolean
}

const LEVELS = {
  INFO: "info",
  ERROR: "error",
  WARN: "warn",
  DEBUG: "debug"
} as const

type Level = typeof LEVELS[keyof typeof LEVELS]

let confIsSilent = false
let confIsDebug = false

export function configureLogger(options: LoggerOptions = {}): void {
  confIsSilent = options.silent ?? false
  confIsDebug = options.debug ?? false
}

export function isDebug() {
  return confIsDebug
}

export function isSilent() {
  return confIsSilent
}

function write(level: Level, message: string): void {
  if (confIsSilent && level !== LEVELS.ERROR) {
    return
  }

  if (level === LEVELS.ERROR) {
    console.error(message)
    return
  }

  if (level === LEVELS.WARN) {
    console.warn(message)
    return
  }

  if (level === LEVELS.DEBUG) {
    if (confIsDebug) {
      console.log(message)
    }
    return
  }

  console.log(message)
}

export const log = {
  info: (msg: string) => write(LEVELS.INFO, msg),
  error: (msg: string) => write(LEVELS.ERROR, msg),
  warn: (msg: string) => write(LEVELS.WARN, msg),
  debug: (msg: string) => write(LEVELS.DEBUG, msg)
}
