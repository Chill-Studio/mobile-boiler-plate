import React from "react";
import { Text, useDisclose } from "native-base";
import { CustomPressable, ContainerPage } from "@components";

export function SandboxPage() {
  const { isOpen, onToggle } = useDisclose();

  return (
    <ContainerPage h="full">
      <Text fontWeight={"semibold"} fontSize={"lg"} color={"white"}>
        Sandbox
      </Text>
      <CustomPressable
        h={100}
        backgroundColor="red.500"
        onPress={() => alert("Clicked")}
      ></CustomPressable>
    </ContainerPage>
  );
}
