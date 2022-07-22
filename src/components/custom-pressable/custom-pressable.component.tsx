import React from "react";

import { Box, Pressable, IBoxProps } from "native-base";

export const CustomPressable = (
  p: {
    onPress: () => void;
    children?: JSX.Element;
  } & IBoxProps
) => {
  const { onPress, children, ...boxProps } = p;
  return (
    <Pressable
      style={{
        flexGrow: 1,
      }}
      onPress={p.onPress}
    >
      {({ isHovered, isFocused, isPressed }) => {
        return (
          <Box
            {...boxProps}
            bg={
              isPressed
                ? "primary.100"
                : isHovered
                ? "primary.100"
                : boxProps.bg
            }
            pt={5}
            pb={5}
            borderRadius={15}
          >
            {p.children}
          </Box>
        );
      }}
    </Pressable>
  );
};
