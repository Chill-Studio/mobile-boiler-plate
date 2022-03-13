import React from "react";
import { Text, Heading } from "native-base";
import { ContainerPage } from "../../components/container-page/container-page.component";
import { useTranslation } from "react-i18next";

export function HomePage() {
  const { t } = useTranslation("common");
  const header = (
    <>
      <Heading color={"white"}>{t("title")}</Heading>
      <Text fontWeight={"semibold"} fontSize={"lg"} color={"white"}>
        React native boiler plate with expo and Typescript
      </Text>
    </>
  );
  return <ContainerPage>{header}</ContainerPage>;
}
