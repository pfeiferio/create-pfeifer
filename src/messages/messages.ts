export const Messages = {
  ERROR: {
    MISSING_PROJECT_NAME: (): string =>
      "❌ Missing project name.",

    INVALID_AUTHOR: (): string =>
      "❌ Invalid or missing author. Expected format: Name <email>",

    DIRECTORY_EXISTS: (name: string): string =>
      `❌ Directory "${name}" already exists.`,

    GIT_INIT_FAILED: (): string =>
      "⚠️ Git initialization failed.",

    GIT_CONFIG_FAILED: (): string =>
      "⚠️ Failed to configure local git user.",

    UNEXPECTED: (err: unknown): string =>
      `❌ Unexpected error: ${err instanceof Error ? err.message : String(err)}`
  },
  GIT: {
    INITIALIZED: (): string =>
      "✅ Git repository initialized.",

    NOT_INSTALLED: (): string =>
      "⚠️ Git not installed. Skipping git init.",

    USER_CONFIGURED: (): string =>
      "✅ Local git user configured.",

    INITIAL_COMMIT: (): string =>
      "📝 Creating initial commit...",
  },
  INFO: {
    STARTING: (version: string): string =>
      `🚀 create-pfeifer (v${version}) starting...`,

    CREATING_PROJECT: (name: string): string =>
      `📦 Creating project "${name}"...`,

    COPYING_FILES: (): string =>
      "📂 Copying template files...",

    INITIALIZING_GIT: (): string =>
      "🔧 Initializing git repository...",

    CONFIGURING_GIT: (): string =>
      "👤 Configuring local git user...",

    SUCCESS: (): string =>
      "✅ Project created successfully.",

    NEXT_STEPS: (name: string): string =>
      `→ cd ${name}\n→ npm install`
  },

  PROMPT: {
    PROJECT_NAME: (defaultName?: string): string =>
      defaultName
        ? `Project name (${defaultName}): `
        : "Project name: ",

    AUTHOR: (defaultAuthor?: string): string =>
      defaultAuthor
        ? `Author (${defaultAuthor}): `
        : "Author: ",

    CREATE_GITHUB_REPO: (): string =>
      "Create GitHub repository? (y/N): "
  }
}
