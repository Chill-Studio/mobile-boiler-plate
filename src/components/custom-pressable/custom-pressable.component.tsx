import { Box, Pressable } from "native-base";

export const CustomPressable = (p: {
  onPress: () => void;
  children: JSX.Element;
}) => (
  <Pressable
    style={{
      flexGrow: 1,
    }}
    onPress={p.onPress}
  >
    {({ isHovered, isFocused, isPressed }) => {
      return (
        <Box
          bg={isPressed ? "primary.100" : isHovered ? "primary.100" : "white"}
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
