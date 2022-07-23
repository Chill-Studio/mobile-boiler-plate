import React from "react";
import {
  Text,
  Heading,
  HStack,
  Image,
  Button,
  Box,
  Flex,
  Center,
} from "native-base";
import { ContainerPage } from "../../components/container-page/container-page.component";
import { useTranslation } from "react-i18next";
import { usePost } from "@store";
import { T } from "@components";

export function HomePage() {
  const { t } = useTranslation("common");
  const { post, someAsyncAction } = usePost();
  const header = (
    <>
      <T fontSize={"4xl"} fontWeight={900}>
        Hello, here is a preloaded image
      </T>
    </>
  );
  return (
    <Center h="full">
      {header}
      <Image
        h={120}
        w={"100%"}
        source={{
          uri: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        }}
        alt={"Preloaded image"}
      />
    </Center>
  );
}

/*<Text fontWeight={"semibold"} fontSize={"lg"} color={"white"}>
        React native boiler plate with
      </Text>
      <HStack>{<Text color={"white"}>{post.get().title}</Text>}</HStack>
      <Button onPress={() => post.title.set("eazeeae")}></Button>
      <Button onPress={someAsyncAction}></Button>
      */
