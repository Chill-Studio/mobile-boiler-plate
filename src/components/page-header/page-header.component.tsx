import React from "react";
import { ButtonBack } from "@components";
import { HStack, Box, Heading } from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";

export function Header(p: {
  title?: string;
  hasBackButton?: boolean;
  onPressBack?: () => void;
  color?: ColorType;
}) {
  return (
    <HStack p={5} display="flex" justifyContent={"center"} alignItems="center">
      <Box left={5} w={50} position={"absolute"}>
        {p.hasBackButton && <ButtonBack onPress={p.onPressBack} />}
      </Box>
      {p.title && (
        <Heading size={"xl"} color={p.color || "teal.400"}>
          {p.title}
        </Heading>
      )}
    </HStack>
  );
}
