import Enquirer from "enquirer"
import {getGitConfig} from "../git/git.js"
import {validateAuthorName, validateEmail, validateNodeVersion, validatePackageName} from "../validation/validation.js";
import {Defaults} from "../defaults/defaults.js";

export interface Author {
  name: string
  email: string
}

export async function promptPackageName(): Promise<string> {
  const result = await Enquirer.prompt<{ name: string }>({
    type: "input",
    name: "name",
    message: "Package name",
    initial: Defaults.PACKAGE_NAME_PREFIX,
    validate: validatePackageName
  })
  return result.name
}

export async function promptNodeVersion(): Promise<string> {
  const result = await Enquirer.prompt<{ version: string }>({
    type: "input",
    name: "version",
    message: "Node version",
    initial: Defaults.NODE_VERSION,
    validate: validateNodeVersion
  })
  return result.version
}

export async function promptAuthor(): Promise<Author> {
  const defaultName = getGitConfig("user.name")
  const defaultEmail = getGitConfig("user.email")

  const {name} = await Enquirer.prompt<{ name: string }>({
    type: "input",
    name: "name",
    message: "Author name",
    initial: defaultName,
    validate: validateAuthorName
  })

  const {email} = await Enquirer.prompt<{ email: string }>({
    type: "input",
    name: "email",
    message: "Author email",
    initial: defaultEmail,
    validate: validateEmail
  })

  return {
    name: name.trim() || defaultName,
    email: email.trim() || defaultEmail
  }
}

