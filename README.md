# 🤖 Figmatron2000

> Fetch design tokens from Figma's API and output them to files in different formats

[![Build Status](https://travis-ci.com/dreamyguy/figmatron2000.svg?branch=master)](https://travis-ci.com/dreamyguy/figmatron2000) [![Node Version](https://img.shields.io/badge/node-v12.14.0-brightgreen.svg)](https://github.com/nodejs/node/releases/tag/v12.14.0) [![MIT Licence](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/dreamyguy/figmatron2000/blob/master/LICENSE)

**Figmatron2000** is a [**`npm` package**][2] that enables you to:

**1. Fetch the data from Figma's API.**

**2. Extract the design tokens from the retrieved data as variables**, in the following formats:

  - JSON
  - SCSS
  - LESS

**3. Individually customize the full path to these files, including their file names**

_If a custom path is not defined_, they will be exported to a default location, which is:

```
src
└── figmatron2000   <= you'll need to create this directory
    ├── designTokens.json
    ├── designTokens.less
    └── designTokens.scss
```

**4. Connect to Figma by having all configuratoin on a `.env` file, safely untracked by `git`**.

# Install

```
npm install figmatron2000 --save-dev
```

# Usage

To conveniently use **Figmatron2000** in your project:

1. Include this `script` in your project's `package.json` (after installing `figmatron2000`):

```
"scripts": {
  ...
  "figmatron2000": "node ./node_modules/figmatron2000/lib/index.js"
},
```

> 👉 `lib/index.js` only exist in the [**`npm` distribution**][2].

2. On your project's `.env` file, include your **Figma Client ID**, your **Figma Token** and the paths to **Figmatron2000**'s output:

```
FIGMA_CLIENT_ID = 'xxxxxxxxxxxxxxxxxxxxxx'
TOKEN_FIGMA = 'xxxxx-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
EXPORT_PATH_JSON = 'src/figmatron2000/json/designTokens'
EXPORT_PATH_SCSS = 'src/figmatron2000/scss/designTokens'
EXPORT_PATH_LESS = 'src/figmatron2000/less/designTokens'
```

> 👉 The paths above are just examples, they can be whatever you'd like them to be, **_but all directories included in the path need to exist_** or else the script will not be able to fullfil the export (in this case `figmatron2000` under `src` - and `json/scss/less` under `figmatron2000`).

> 👉 Note that `designTokens` above is the file name, and that the extension should be omitted. The script will take care of the extensions.

## Development

If you intend to contribute with pull-requests or simply try running **Figmatron2000** locally, you'd be better off using `node v12.14.0` or greater, as to avoid errors with `.mjs` files.

Use [**nvm**][3] for managing multiple `node` versions locally.

## License

[MIT](LICENSE)

## About

**Figmatron2000** was put together by [Wallace Sidhrée][1]. 👨‍💻🇳🇴

  [1]: http://sidhree.com/
  [2]: https://www.npmjs.com/package/figmatron2000
  [3]: https://github.com/nvm-sh/nvm
