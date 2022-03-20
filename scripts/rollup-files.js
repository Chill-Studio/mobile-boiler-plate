const { rollup } = require("./code-generation/code-generators/rollup");

function generateAutoExports() {
  //Example : test.component.tsx will be rolledUp in ./src/components/index.ts
  return Promise.all([
    rollup("./src/components", ["component"]),
    rollup("./src/pages", ["page"]),
    rollup("./src/utils", ["utils"]),
    rollup("./src/locales/en", ["ts"]),
    rollup("./src/store", ["slice", "selector", "atom"]),
  ]);
}

generateAutoExports();
