const write = require("write");

const { getFiles } = require("../../utils.script");

async function rollup(path, fileNameList) {
  const rollupPaths = [];
  let pathToWrite;
  const files = await getFiles(path);
  // Run through all files of the given path
  files.forEach((file) => {
    // Split each part of the path
    const pathSplited = file.split("/");
    // Get the file name
    const fileName = pathSplited[pathSplited.length - 1];
    // Get the folder the file is in
    const folderName = pathSplited[pathSplited.length - 2];

    // Ignore .index files since they probably are fle containing exports only
    if (!fileName.includes("index")) {
      // Store in variable if the current file folder is included in the fileNameList
      // Like ./src/components
      let isFolderFileNameList =
        fileNameList.findIndex((v) => folderName.includes(v)) > -1;
      // Store in variable if the current file is included in the fileNameList
      let isFileNameIncludedInFileNameList =
        fileNameList.findIndex((v) => fileName.includes(v)) > -1;

      const splitedFileName = fileName.split(".");
      splitedFileName.pop();
      const fileNameWithoutExtension = splitedFileName.join(".");
      if (isFileNameIncludedInFileNameList) {
        pathToWrite = `export * from "./${folderName}/${fileNameWithoutExtension}"`;
      } else if (isFolderFileNameList) {
        pathToWrite = `export * from "./${fileNameWithoutExtension}"`;
      }
      rollupPaths.push(pathToWrite);
    }
  });
  let rollupAsString = rollupPaths.join("\r\n");
  write.sync(`${path}/index.ts`, rollupAsString, {
    newline: true,
  });
}

module.exports = { rollup };
