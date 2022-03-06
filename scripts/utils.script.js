const write = require("write");
const { resolve } = require("path");
const { readdir } = require("fs").promises;

function createFileFromTemplate(rootPath, fileName, template, extension) {
  const codeString =
    require(`./code-generation/templates/${template}-template.script`)(
      fileName
    );
  write.sync(`${rootPath}/${fileName}.${template}.${extension}`, codeString, {
    newline: true,
  });
}

function clearAndUpper(text) {
  return text.replace(/-/, "").toUpperCase();
}

function toPascalCase(text) {
  return text.replace(/(^\w|-\w)/g, clearAndUpper);
}
const toKebabCase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join("-");

function isIncludedInArray(string, array) {
  return array.findIndex((item) => string.includes(item)) > -1;
}

async function getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  return Array.prototype.concat(...files);
}

module.exports = {
  createFileFromTemplate,
  toPascalCase,
  toKebabCase,
  isIncludedInArray,
  getFiles,
};
