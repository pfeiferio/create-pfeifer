import fs from "node:fs/promises"
import path from "node:path"
import {interpolate} from "@pfeiferio/string-interpolate"

export interface TemplateReplacements {
  package: {
    name: string
    description: string
    author: string
  }
  node: {
    version: string
  }
}

interface ComputedReplacements extends TemplateReplacements, Record<string, unknown> {
  urlPathPart: string
  packageNameUrlSafe: string
  year: number
}

function buildReplacements(replacements: TemplateReplacements): ComputedReplacements {
  return {
    ...replacements,
    urlPathPart: replacements.package.name.replace("@", ""),
    packageNameUrlSafe: encodeURIComponent(replacements.package.name),
    year: new Date().getFullYear()
  }
}

/**
 * Recursively renders a template directory into a target directory.
 *
 * - Files ending with `.tpl` are interpolated
 * - `.tpl` extension is removed
 * - Other files are copied as-is
 * - File and directory names are also interpolated
 */
export async function renderDirectory(
  sourceDir: string,
  targetDir: string,
  replacements: TemplateReplacements
): Promise<void> {
  const computed = buildReplacements(replacements)
  await renderDirectoryRecursive(sourceDir, targetDir, computed)
}

async function renderDirectoryRecursive(
  sourceDir: string,
  targetDir: string,
  replacements: ComputedReplacements
): Promise<void> {
  const entries = await fs.readdir(sourceDir, {withFileTypes: true})

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name)

    const interpolatedName = interpolate(entry.name, replacements, {keep: true})
    const isTemplateFile = interpolatedName.endsWith(".tpl")
    const outputName = isTemplateFile ? interpolatedName.slice(0, -4) : interpolatedName
    const targetPath = path.join(targetDir, outputName)

    if (entry.isDirectory()) {
      await fs.mkdir(targetPath, {recursive: true})
      await renderDirectoryRecursive(sourcePath, targetPath, replacements)
      continue
    }

    if (entry.isFile()) {
      if (isTemplateFile) {
        const content = await fs.readFile(sourcePath, "utf8")
        const rendered = interpolate(content, replacements, {keep: true})
        await fs.writeFile(targetPath, rendered, "utf8")
      } else {
        await fs.copyFile(sourcePath, targetPath)
      }
    }
  }
}
