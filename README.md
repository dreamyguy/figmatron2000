# 🤖 Figmatron2000

> Fetch design tokens from Figma's API and output them to files in different formats

With **Figmatron2000** you will be able to:

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

**4. Connect to Figma by having all configuratoin on a `.env` file, safely untracked by `git`**

These configurations are:

```
FIGMA_CLIENT_ID = 'xxxxxxxxxxxxxxxxxxxxxx'
TOKEN_FIGMA = 'xxxxx-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
EXPORT_PATH_JSON = 'src/figmatron2000/json/designTokens'
EXPORT_PATH_SCSS = 'src/figmatron2000/scss/designTokens'
EXPORT_PATH_LESS = 'src/figmatron2000/less/designTokens'
```

> 👉 The paths above are just examples, they can be whatever you'd like them to be, **_but they need to exist_**.

## Install

```
npm install figmatron2000 --save-dev
```

## Usage

To conveniently use **Figmatron2000** in your project:

1. Include this `script` in your project's `package.json` (after installing `figmatron2000`):

```
"scripts": {
  ...
  "figmatron2000": "node ./node_modules/figmatron2000/lib/index.js"
},
```

2. On your project's `.env` file, include your **Figma Client ID**, your **Figma Token** and the paths to **Figmatron2000**'s output:

```
FIGMA_CLIENT_ID = 'xxxxxxxxxxxxxxxxxxxxxx'
TOKEN_FIGMA = 'xxxxx-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
EXPORT_PATH_JSON = 'src/figmatron2000/json/designTokens'
EXPORT_PATH_SCSS = 'src/figmatron2000/scss/designTokens'
EXPORT_PATH_LESS = 'src/figmatron2000/less/designTokens'
```

> 👉 Note that `designTokens` above is the file name, and that the extension should be omitted. The script will take care of the extensions.

> 👉 Also note that you will have to create the directories that you've defined in your paths (in this case `figmatron2000` under `src` - and `json/scss/less` under `figmatron2000`). _But the name of directories and filenames are of course up to you.

## License

[MIT](LICENSE)

## About

**Figmatron2000** was put together by [Wallace Sidhrée][1]. 👨‍💻🇳🇴

  [1]: http://sidhree.com/
