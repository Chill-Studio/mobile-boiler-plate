import React from "react";
import { Text, Heading, HStack } from "native-base";
import { ContainerPage } from "../../components/container-page/container-page.component";
import { useTranslation } from "react-i18next";
import { useAtomValue } from "jotai";
import { projectAtom as projectAtom_ } from "../../store/welcome/welcome.atom";

export function HomePage() {
  const { t } = useTranslation("common");
  const projectAtom = useAtomValue(projectAtom_);
  const header = (
    <>
      <Heading color={"white"}>{t("title")}</Heading>
      <Text fontWeight={"semibold"} fontSize={"lg"} color={"white"}>
        React native boiler plate with
      </Text>
      <HStack>
        {
          <Text color={"white"}>
            {projectAtom.project.technologies.join(" ")}
          </Text>
        }
      </HStack>
    </>
  );
  return <ContainerPage h="full">{header}</ContainerPage>;
}
