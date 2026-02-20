import {describe, it} from "node:test"
import assert from "node:assert/strict"
import {
  validateAuthorName,
  validateEmail,
  validateNodeVersion,
  validatePackageName
} from "../dist/validation/validation.js"

describe("validatePackageName", () => {
  it("returns error for empty string", () => {
    assert.equal(validatePackageName(""), "Package name is required.")
  })

  it("accepts valid scoped package", () => {
    assert.equal(validatePackageName("@pfeiferio/my-package"), true)
  })

  it("rejects scoped package without package part", () => {
    assert.equal(validatePackageName("@pfeiferio/"), "Scoped packages must follow the format @vendor/package.")
  })

  it("rejects bare @ sign", () => {
    assert.equal(validatePackageName("@"), "Scoped packages must follow the format @vendor/package.")
  })

  it("rejects scoped package with too many parts", () => {
    assert.equal(validatePackageName("@pfeiferio/foo/bar"), "Scoped packages must follow the format @vendor/package.")
  })

  it("accepts valid unscoped package", () => {
    assert.equal(validatePackageName("my-package"), true)
  })

  it("rejects unscoped package with slash", () => {
    assert.equal(validatePackageName("my/package"), "Unscoped packages must not contain a slash.")
  })
})

describe("validateNodeVersion", () => {
  it("returns error for empty string", () => {
    assert.equal(validateNodeVersion(""), "Node version is required.")
  })

  it("accepts major only", () => {
    assert.equal(validateNodeVersion("18"), true)
  })

  it("accepts major.minor", () => {
    assert.equal(validateNodeVersion("18.0"), true)
  })

  it("accepts major.minor.patch", () => {
    assert.equal(validateNodeVersion("18.0.0"), true)
  })

  it("rejects four part version", () => {
    assert.notEqual(validateNodeVersion("18.0.0.0"), true)
  })

  it("rejects text", () => {
    assert.notEqual(validateNodeVersion("abc"), true)
  })

  it("rejects v-prefix", () => {
    assert.notEqual(validateNodeVersion("v18"), true)
  })
})

describe("validateEmail", () => {
  it("returns error for empty string", () => {
    assert.equal(validateEmail(""), "Email is required.")
  })

  it("accepts valid email", () => {
    assert.equal(validateEmail("pascal@pfeifer.zone"), true)
  })

  it("rejects missing @", () => {
    assert.notEqual(validateEmail("pascalpfeifer.zone"), true)
  })

  it("rejects missing domain", () => {
    assert.notEqual(validateEmail("pascal@"), true)
  })

  it("rejects missing tld", () => {
    assert.notEqual(validateEmail("pascal@pfeifer"), true)
  })

  it("rejects spaces", () => {
    assert.notEqual(validateEmail("pas cal@pfeifer.zone"), true)
  })
})

describe("validateAuthorName", () => {
  it("returns error for empty string", () => {
    assert.equal(validateAuthorName(""), "Author name is required.")
  })

  it("returns error for whitespace only", () => {
    assert.equal(validateAuthorName("   "), "Author name is required.")
  })

  it("accepts valid name", () => {
    assert.equal(validateAuthorName("Pascal Pfeifer"), true)
  })
})
