export function validatePackageName(value: string): boolean | string {
  if (!value) return "Package name is required."

  const parts = value.split("/")

  if (value.startsWith("@")) {
    // scoped: must be exactly @vendor/package
    if (parts.length !== 2 || !parts[0] || parts[0] === "@" || !parts[1]) {
      return "Scoped packages must follow the format @vendor/package."
    }
    return true
  }

  // unscoped: must not contain /
  if (parts.length > 1) {
    return "Unscoped packages must not contain a slash."
  }

  return true
}

export function validateNodeVersion(value: string): boolean | string {
  if (!value) return "Node version is required."

  if (!/^\d+(\.\d+){0,2}$/.test(value)) {
    return "Node version must be a valid version number (e.g. 18, 18.0, 18.0.0)."
  }

  return true
}

export function validateEmail(value: string): boolean | string {
  if (!value) return "Email is required."

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "Email must be a valid address (e.g. name@domain.tld)."
  }

  return true
}


export function validateAuthorName(value: string): boolean | string {
  if (!value.trim()) return "Author name is required."
  return true
}
