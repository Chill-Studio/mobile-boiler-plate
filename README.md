# Mobile boiler plate

## Automatic export in index.ts

### Rollup exports in an index.ts

1. In scripts/rollup-files.js add the files you want to exports automatically in generateAutoExports

### Allow the import by an alias

1. Make sure you have added an alias in tsconfig.paths.json

## Generate code

```shell
yarn run g <component|page> <MyComponentName|MyPageName>
```
You can add templates src/script/code-generation/templates

## Troubleshouting
