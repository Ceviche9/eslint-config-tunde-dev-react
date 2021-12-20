# eslint-config-tunde-dev-react

## About the project 

> This project i made base on [eslint-config-galex](https://github.com/ljosberinn/eslint-config-galex).

## How to use

```sh
yarn add -D eslint-config-galex eslint

npm install --save-dev eslint-config-galex eslint
```
## With create-react-app

you'll have to install several dependencies on top:

- `eslint-plugin-testing-library`

### Without TypeScript

- `@babel/eslint-parser`

### With TypeScript

- `@typescript-eslint/parser`
- `@typescript-eslint/eslint-plugin`

## Usage with Next.js

Unless you set [`eslint.ignoreDuringBuilds`](https://nextjs.org/docs/api-reference/next.config.js/ignoring-eslint) to `true` in your `next.config.js`, you will have to install `eslint-config-next` separately. Otherwise, the build will fail due to their hard dependency on `eslint-config-next`.

I _heavily recommend_ doing so, as the Next.js internal eslint-config contains less features and is far less strict.

### With TypeScript

- `@typescript-eslint/parser`
- `@typescript-eslint/eslint-plugin`

# Setup

```js
// .eslintrc.js
module.exports = {
  extends: 'tunde-dev-react',
};

// or .eslintrc
{
  "extends": "tunde-dev-react"
}
```
## What's included?

Everything is dynamically included based on your `package.json` and when using TypeScript, your `tsconfig.json`.
Rules are selectively applied based on file name patterns.

All rules are commented and link to their docs.

- [x] React
- [x] Next.js
- [x] TypeScript
- [x] Node.js
- [x] prettier

# Customization

All rulesets and overrides are created through functions accepting an object
matching this schema:

```ts
interface Project {
  /**
   * whether `jest` is present
   */
  hasJest: boolean;
  /**
   * whether `@testing-library/jest-dom` is present
   */
  hasJestDom: boolean;
  /**
   * whether `@types/node` is present
   */
  hasNodeTypes: boolean;
  /**
   * whether any `@testing-library/<environment>` is present
   */
  hasTestingLibrary: boolean;
  /**
   * whether any `@storybook/<package>` is present
   */
  hasStorybook: boolean;
  typescript: {
    /**
     * whether `typescript` is present
     */
    hasTypeScript: boolean;
    /**
     * the installed version
     */
    version: string;
    /**
     * your tsConfig; used to detect feature availability
     */
    config?: object;
  };
  react: {
    /**
     * whether any flavour of react is present
     */
    hasReact: boolean;
    /**
     * whether `next` is present
     */
    isNext: boolean;
    /**
     * whether `preact` is present
     * currently without effect
     */
    isPreact: boolean;
    /**
     * the installed version
     */
    version: string;
    /**
     * whether the project was bootstrapped with create-react-app
     */
    isCreateReactApp: boolean;
  };
  /**
   * your custom rules on top
   */
  rules?: object;
}
```

## Available main exports:

This list only mentions the exports most people will need. For an exhaustive
list, check out the source.

### Overrides

- `const { createTSOverride } = require('eslint-config-galex/src/overrides/typescript')`
- `const { createReactOverride } = require('eslint-config-galex/src/overrides/react')`

### Rulesets

- `const { createEslintCoreRules } = require('eslint-config-galex/src/rulesets/eslint-core')`
- `const { createNextJsRules } = require('eslint-config-galex/src/rulesets/next')`


## TypeScript:

- let inference work where possible:

  - only strongly type exports (enforced via `@typescript-eslint/explicit-module-boundary-types`)

  - strongly type complex return types (currently not enforceable)

- prefer using `type` over `interface`

## JavaScript

- `null` is not forbidden, as it conveys meaning. Enjoy debugging code which
  does not differentiate between intentional `undefined` and unintentional
  `undefined`.

- `prefer-const`

- `curly`: prefer

  ```js
  if (true) {
    doSomething();
  }
  ```

  over

  ```js
  if (true) doSomething();
  ```
