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
  VStack,
} from "native-base";
import { ContainerPage } from "../../components/container-page/container-page.component";
import { useTranslation } from "react-i18next";
import { usePost } from "@store";
import { T } from "@components";
//@ts-ignore
import ExpoFastImage from "expo-fast-image";

export function HomePage() {
  const { t } = useTranslation("common");
  const { post, someAsyncAction } = usePost();
  const header = (
    <>
      <T fontSize={"4xl"} fontWeight={900}>
        Here are a custom fonts and preloaded images
      </T>
    </>
  );

  const hookStateDemo = (
    <>
      <VStack space={"md"}>
        <T fontSize="xl" fontWeight={500} color={"white"}>
          A value read from the store : {post.get().title}
        </T>

        <Button
          size="md"
          onPress={() => post.title.set("This was set from the component")}
        >
          Set from component
        </Button>
        <Button size="md" onPress={someAsyncAction}>
          Set from a saga
        </Button>
      </VStack>
    </>
  );
  return (
    <ContainerPage h="full">
      {header}

      <ExpoFastImage
        cacheKey="unique key" // could be a unque id
        style={{ height: 120 }}
        resizeMode="contain"
        uri="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
      />
      {hookStateDemo}
    </ContainerPage>
  );
}

/*<Text fontWeight={"semibold"} fontSize={"lg"} color={"white"}>
        React native boiler plate with
      </Text>
      <HStack>{<Text color={"white"}>{post.get().title}</Text>}</HStack>
      <Button onPress={() => post.title.set("eazeeae")}></Button>
      <Button onPress={someAsyncAction}></Button>
      */
