const { toPascalCase } = require("../../utils.script");

module.exports = (name) => {
  const namePascal = toPascalCase(name);
  return `import React from "react";
  /*
  ${namePascal} is a component that 
*/
export function ${namePascal}  (p:{}) {
  return <></>;
}`;
};
