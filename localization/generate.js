const {readFile, writeFile, mkdir} = require("fs/promises");
const {existsSync} = require("fs");
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
      resultData[locale][stringName] = {"message": translationFile[stringName][locale]};
    }
  }

  for (const locale in resultData) {
    const localeDir = join(targetPath, locale);
    if (!existsSync(localeDir)) {
      await mkdir(localeDir);
    }
    await writeFile(join("./", targetPath, locale, "messages.json"), JSON.stringify(resultData[locale], null,2));
  }
}

run();
