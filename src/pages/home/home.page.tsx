import React from "react";
import { Text, Heading, HStack } from "native-base";
import { ContainerPage } from "../../components/container-page/container-page.component";
import { useTranslation } from "react-i18next";
import { useAtomValue } from "jotai";
import { projectAtom } from "@store/welcome";

export function HomePage() {
  const { t } = useTranslation("common");
  const projectAtom = useAtomValue(projectAtom);
  const header = (
    <>
      <Heading color={"white"}>{t("title")}</Heading>
      <Text fontWeight={"semibold"} fontSize={"lg"} color={"white"}>
        React native boiler plate with
      </Text>
      <HStack>{<Text color={"white"}>{projectAtom.join(" ")}</Text>} </HStack>
    </>
  );
  return <ContainerPage h="100vh">{header}</ContainerPage>;
}
