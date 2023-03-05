# Mobile boiler plate

## Getting started

### Start

```shell
yarn && yarn dev
```

### Debug
(mac only)
```shell
yarn debug
``` 

## Config

app.config.ts for config and typing

import from "@config"


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

## I18N

1. Add a local translation file

Suffix the name of you objet with `_<lng>`

```js
export const common_en = {
    "title": "Hello"
}
```



## Fonts

- add them  in App.tsx
- Replace the theme.fontConfig
- Use them with <T> component
- Add the 
```jsx
<T fontSize={"4xl"} fontWeight={900}>
  Heading
</T>

<T fontWeight={400}>
  Hello
</T>
<T>
  Hello
</T>
```

 
 ## Icons

 For vector icons from @Expo just preload them in App.tsx

 For custom icons, go on Icomoon, create a set with some svg and then at the bottom download font.
 You need the selection.json and the ttf.
 Add them to src/assets/icomoon and then preload them in the App.tsx
 To use them : 

 ```js
const CustomIcon = createIconSetFromIcoMoon(
  require("../../assets/icomoon/selection.json"),
  "IcoMoon",
  "icomoon.ttf"
);
```

```jsx
<CustomIcomoonIcons name="nativebase-logo" size={50} color="red" />
```

## Tests

### Unit test and integration

With jest

Create .test.tsx
 

Here is an example of basic test

```tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { TextInput } from "react-native";

describe("Sandbox page", () => {
  it("change text in <TextInput/> correctly", () => {
    const onChangeText = jest.fn();

    render(<TextInput testID="textInput1" onChangeText={onChangeText} />);

    const textInput = screen.getAllByTestId("textInput1")[0];

    fireEvent.changeText(textInput, "Hello");

    expect(onChangeText).toBeCalledWith("Hello");
  });
});
```