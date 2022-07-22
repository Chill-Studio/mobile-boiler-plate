const { rollup } = require("./code-generation/code-generators/rollup");

function generateAutoExports() {
  //Example : test.component.tsx will be rolledUp in ./src/components/index.ts
  return Promise.all([
    rollup("./src/components", ["component"]),
    rollup("./src/pages", ["page"]),
    rollup("./src/hooks", ["hook"]),
    rollup("./src/utils", ["utils"]),
    rollup("./src/store", ["store"]),
    rollup("./src/typings", ["typing"]),
  ]);
}

generateAutoExports();
