# 🤖 Figmatron2000

> Fetch design tokens from Figma's API and output them to files in different formats

## Goals

**1. Fetch the data from Figma's API.** ✅

**2. Extract the design tokens from the retrieved data as variables**, and do things with them. Like:

  - Generate a **`designTokens.json`** file, as a backup. ✅
  - Generate a **`designTokens.js`** file.
  - Generate a **`designTokens.scss`** file. ✅
  - Generate a **`designTokens.less`** file. ✅
  - Create versions of generated files at every release.

**3. The ultimate goal is to use versioned files containing design tokens provided by Figma at the frontend.**

I'm still unsure if goal **3.** will be solved within this repository or if **Figmatron2000** will simply be a package that fetches the data from **Figma's API** — _**as it is**_.

But there will surely be tests and a demo page in this repo, for validation purposes.

## What's ready

- A **`.env`** file (untracked by **`git`**) that stores **Figma**'s `token` and `cliend id`.
- The connection to the **Figma's API**.
- Generate a **`designTokens.json`** file, as a backup.
- Generate a **`designTokens.scss`** file.
- Generate a **`designTokens.less`** file.
- Configuration to some of the upcoming features.

## License

[MIT](LICENSE)

## About

**Figmatron2000** was put together by [Wallace Sidhrée][1]. 👨‍💻🇳🇴

  [1]: http://sidhree.com/