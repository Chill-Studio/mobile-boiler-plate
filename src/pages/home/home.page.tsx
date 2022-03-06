import React from "react";
import {
  Center,
  HStack,
  Text,
  Box,
  VStack,
  Divider,
  Flex,
  View,
  Heading,
  Pressable,
} from "native-base";
import { Icon } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { useNavigate } from "react-router-native";
import { ROUTES } from "./../../routes/index";
import { ButtonIcon } from "./../../components/button-icon/button-icon.component";
import { TransitionFade } from "../../components/transition-fade";
import { ContainerPage } from "./../../components/container-page/container-page";

export function HomePage() {
  const navigate = useNavigate();

  const CustomPressable = (pressableProps: {
    onPress: () => void;
    children: JSX.Element;
  }) => (
    <Pressable
      style={{
        flexGrow: 1,
      }}
      onPress={pressableProps.onPress}
    >
      {({ isHovered, isFocused, isPressed }) => {
        return (
          <Box
            bg={isPressed ? "primary.100" : isHovered ? "primary.100" : "white"}
            pt={5}
            pb={5}
            borderRadius={15}
          >
            {pressableProps.children}
          </Box>
        );
      }}
    </Pressable>
  );
  const content = () => (
    <HStack w="100%" justifyContent="space-between" space={5} pr={5} pl={5}>
      <CustomPressable onPress={() => navigate(ROUTES.CAMERA)}>
        <VStack space={3} alignItems="center">
          <Icon color={"teal.400"} as={Entypo} name="camera" size="50" />
          <Text color="teal.500" fontWeight={"bold"}>
            Camera
          </Text>
        </VStack>
      </CustomPressable>

      <CustomPressable onPress={() => navigate(ROUTES.GALLERY_UPLOAD)}>
        <VStack space={3} alignItems="center">
          <Icon color={"teal.400"} as={Entypo} name="upload" size="50" />
          <Text color="teal.500" fontWeight={"bold"}>
            Gallery
          </Text>
        </VStack>
      </CustomPressable>
    </HStack>
  );

  const header = (
    <Box ml={35} mt={25} justifyContent="space-between">
      <Heading color={"white"}>Chill Bill</Heading>
      <Text fontWeight={"semibold"} fontSize={"lg"} color={"white"}>
        Add a photo for your bill
      </Text>
    </Box>
  );
  return (
    <ContainerPage>
      {header}
      <Center flexGrow={1}>{content()}</Center>
    </ContainerPage>
  );
}
// <Center flexGrow={1}>{content()}</Center>;
