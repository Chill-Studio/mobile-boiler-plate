const { toPascalCase } = require("../../utils.script");

module.exports = (name) => {
  const namePascal = toPascalCase(name);
  return `/* 
  ${namePascal} is a component that 
*/
export function ${namePascal}  () {
  return <></>;
}`;
};
