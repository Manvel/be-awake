const {readFile, writeFile} = require("fs/promises");
const { join } = require("path");
const targetPath = "src/_locales";

async function run() {
  const translationFile = JSON.parse(await readFile(join(__dirname, "translations.json")));
  const resultData = {};

  for (const stringName in translationFile) {
    for (const locale in translationFile[stringName]) {
      if (!resultData[locale]) {
        resultData[locale] = {}
      }
      resultData[locale][stringName] = translationFile[stringName][locale];
    }
  }

  for (const locale in resultData) {
    await writeFile(join(targetPath, locale, "messages.json"), JSON.stringify(obj, null,2));
  }
}

run();
