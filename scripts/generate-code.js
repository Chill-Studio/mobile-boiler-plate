const { exit } = require("process");
const {
  createFileFromTemplate,
  toKebabCase,
  isIncludedInArray,
  getFiles,
} = require("./utils.script");

const EXTENSION = {
  component: "tsx",
  container: "tsx",
  page: "tsx",
};

const params = process.argv.slice(2, process.argv.length);
if (params.length !== 2) {
  console.log(
    "You are missing a param, usage :  yarn run g <component|container|page|model> <MyComponentName>"
  );
  exit(-1);
}

const name = params[1];
const type = params[0];

generateCode(name, type);

async function generateCode(name, type) {
  const files = await getFiles("./scripts/code-generation/templates");
  const allowedTypes = files.map((f) => {
    const splitedOnSlash = f.split("/");
    const fileName = splitedOnSlash[splitedOnSlash.length - 1];
    const templateType = fileName.split("-")[0];
    return templateType;
  });

  let isAllowedType = false;
  for (let i = 0; i < allowedTypes.length; i++) {
    if (allowedTypes[i] === type) {
      isAllowedType = true;
      break;
    }
  }
  if (!isAllowedType) {
    console.log(
      "Wrong type parameter, usage : yarn run g <" +
        allowedTypes.join("|") +
        "> <MyComponentName>"
    );
    exit(-1);
  }

  const nameKebab = toKebabCase(name);
  createFileFromTemplate(
    "./src/" + type + "s/" + nameKebab,
    nameKebab,
    type,
    EXTENSION[type]
  );
  require("./rollup-files");
}
