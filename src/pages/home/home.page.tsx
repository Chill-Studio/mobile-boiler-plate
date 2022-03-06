import React from "react";
import { Text, Heading } from "native-base";
import { useNavigate } from "react-router-native";
import { ContainerPage } from "../../components/container-page/container-page.component";

export function HomePage() {
  const navigate = useNavigate();

  const header = (
    <>
      <Heading color={"white"}>Mobile boiler plate</Heading>
      <Text fontWeight={"semibold"} fontSize={"lg"} color={"white"}>
        React native boiler plate with expo and Typescript
      </Text>
    </>
  );
  return <ContainerPage>{header}</ContainerPage>;
}
