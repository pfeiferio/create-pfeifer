# create-pfeifer

[![npm version](https://badge.fury.io/js/create-pfeifer.svg)](https://www.npmjs.com/package/create-pfeifer)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](https://nodejs.org/)

> Scaffold new npm packages with @pfeiferio standards.

## Usage

`
npm init pfeifer@latest
`

## Prompts

| Prompt | Default |
|---|---|
| Package name | `@pfeiferio/` |
| Node version | `18` |
| Author name | from `git config user.name` |
| Author email | from `git config user.email` |

## What it does

- Creates the project directory
- Copies and renders the template (interpolates `package.json`, `README.md`, `LICENSE`, `.nvmrc`)
- Initializes a git repository with an initial commit
- Configures local git user

## Options

| Flag | Description |
|---|---|
| `--version`, `-v` | Print version and exit |
| `--debug`, `-d` | Enable debug logging |

## Template variables

| Variable | Description |
|---|---|
| `package.name` | Full package name, e.g. `@pfeiferio/my-package` |
| `package.author` | Author string, e.g. `Pascal Pfeifer <pascal@pfeifer.zone>` |
| `node.version` | Node version, e.g. `18` |
| `urlPathPart` | Derived from package name, e.g. `pfeiferio/my-package` |
| `packageNameUrlSafe` | URL-encoded package name |
| `year` | Current year |

## Updating

`npm init pfeifer` uses the npx cache. To force the latest version:

```bash
npm init pfeifer@latest
```

If the cached version is stale:

```bash
rm -rf ~/.npm/_npx
```

## License

MIT
