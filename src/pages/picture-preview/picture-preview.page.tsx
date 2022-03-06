import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { formSlice } from "../../store/form.slice";
import { Flex, Icon, Image, Box } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { useNavigate } from "react-router-native";
import { ROUTES } from "./../../routes/index";
import { Header } from "../../components/page-header/page-header.component";
import { ButtonIcon } from "../../components/button-icon";
import * as MediaLibrary from "expo-media-library";
import useAsyncEffect from "use-async-effect";
import { useAlert } from "./../../utils/toast.utils";
import { ContainerPage } from "../../components/container-page";

export function PicturePreviewPage() {
  const formState = useRecoilValue(formSlice);
  const navigate = useNavigate();
  const { show } = useAlert();
  const [permissionGranted, setPermissionGranted] = useState(false);
  useAsyncEffect(async () => {
    const permission = await MediaLibrary.requestPermissionsAsync(false);
    setPermissionGranted(
      permission.status === MediaLibrary.PermissionStatus.GRANTED
    );
  }, []);

  const handleValidation = async () => {
    if (permissionGranted) {
      await MediaLibrary.saveToLibraryAsync(formState.picURL);
      // show("info", "Image saved on device");
    } else {
      //show("info", "Image not saved on device");
    }
    navigate(ROUTES.BILL_FORM);
  };

  const photo = (
    <Image
      h="100%"
      w="100%"
      alt="todo"
      source={{
        uri: formState.picURL,
      }}
    />
  );
  const buttonCheck = (
    <ButtonIcon
      icon={<Icon as={Entypo} name="check" />}
      onPress={handleValidation}
    />
  );

  return (
    <ContainerPage bg="white">
      <Flex h={"100%"}>
        <Header hasBackButton title="Picture preview" />
        <Flex>
          <Flex>
            {photo}
            <Box
              safeArea
              h={"100%"}
              w="100%"
              justifyContent={"flex-end"}
              alignItems="flex-end"
              position={"absolute"}
              zIndex={100}
            >
              <Box pr={"14%"} pb={"40%"}>
                {buttonCheck}
              </Box>
            </Box>
          </Flex>
        </Flex>
        <Box flex={1} position={"absolute"} bg={"amber.100"}></Box>
      </Flex>
    </ContainerPage>
  );
}
