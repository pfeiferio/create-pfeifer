{
  "name": "{{ package.name }}",
  "version": "1.0.0",
  "description": "",
  "license": "MIT",
  "author": "{{ package.author }}",
  "sideEffects": false,
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "files": [
    "dist/",
    "README.md",
    "LICENSE"
  ],
  "keywords": [
  ],
  "repository": {
    "type": "git",
    "url": "git+https://github.com/{{ urlPathPart }}.git"
  },
  "bugs": {
    "url": "https://github.com/{{ urlPathPart }}/issues"
  },
  "homepage": "https://github.com/{{ urlPathPart }}#readme",
  "engines": {
    "node": ">={{ node.version }}"
  },
  "scripts": {
    "prepublishOnly": "npm test",
    "build": "npm run clean && tsc",
    "clean": "rm -rf dist",
    "test": "npm run build && node --test 'test/'",
    "test:coverage": "npm run build && node --test 'test/' --experimental-test-coverage --test-coverage-exclude='test/**'",
    "test:coverage:c8": "npm run build && npx c8 node --test 'test/'",
    "test:coverage:lcov": "npm run build && node --enable-source-maps --test 'test/' --experimental-test-coverage --test-coverage-exclude='test/**' --test-reporter=lcov --test-reporter-destination=lcov.info"
  },
  "devDependencies": {
    "@types/node": "^20.17.9",
    "typescript": "^5.9.3"
  }
}
