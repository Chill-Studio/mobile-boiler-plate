import React from "react";
import { Text, Heading, HStack, Image, Button } from "native-base";
import { ContainerPage } from "../../components/container-page/container-page.component";
import { useTranslation } from "react-i18next";
import { usePost } from "@store";

export function HomePage() {
  const { t } = useTranslation("common");
  const { post, someAsyncAction } = usePost();
  const header = (
    <>
      <Heading color={"white"}>{t("title")}</Heading>
      <Text fontWeight={"semibold"} fontSize={"lg"} color={"white"}>
        React native boiler plate with
      </Text>
      <HStack>{<Text color={"white"}>{post.get().title}</Text>}</HStack>
      <Button onPress={() => post.title.set("eazeeae")}></Button>
      <Button onPress={someAsyncAction}></Button>
    </>
  );

  return <ContainerPage h="full">{header}</ContainerPage>;
}
