import React, { useState, useRef, Ref } from "react";
import { Text, View } from "react-native";
import { Camera } from "expo-camera";
import { Box, Flex, HStack, Icon, IconButton } from "native-base";
import { Entypo } from "@expo/vector-icons";
import useAsyncEffect from "use-async-effect";
import { useRecoilState } from "recoil";
import { formSlice } from "../../store/form.slice";
import { useNavigate } from "react-router-native";
import { ROUTES } from "./../../routes/index";
import { ButtonBack } from "../../components/button-back";
import { Header } from "../../components/page-header/page-header.component";
import { ContainerPage } from "../../components/container-page";

export function CameraPage() {
  const navigate = useNavigate();
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [formState, setFormState] = useRecoilState(formSlice);
  const [isBtnDisabled, setisBtnDisabled] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean>();
  const cameraRef = useRef<Camera>();

  useAsyncEffect(async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const snap = async () => {
    setisBtnDisabled(true);
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync({ base64: true });
      if (photo.uri && photo.base64) {
        setFormState({
          ...formState,
          picURL: photo.uri,
          picBase64: photo.base64,
        });
        navigate(ROUTES.PICTURE_PREVIEW);
      }
    }
  };
  const buttonTakePic = (
    <IconButton
      isDisabled={isBtnDisabled}
      mb={10}
      size={100}
      bg={"white"}
      justifyContent="center"
      alignItems="center"
      icon={
        <Icon
          as={Entypo}
          name={isBtnDisabled ? "dots-three-horizontal" : "camera"}
        />
      }
      {...{}}
      borderRadius="full"
      _icon={{
        color: "teal.400",
        size: "xl",
      }}
      onPress={isBtnDisabled ? undefined : snap}
    />
  );

  return (
    <Camera
      flashMode={Camera.Constants.FlashMode.auto}
      onCameraReady={() => setIsCameraReady(true)}
      style={{ flex: 1 }}
      type={Camera.Constants.Type.back}
      ref={cameraRef as Ref<Camera>}
    >
      <ContainerPage bg="transparent">
        <Box pt={5}>
          <Header hasBackButton />
        </Box>
        {isCameraReady && (
          <Flex justifyContent="flex-end" alignItems={"center"} h="100%">
            <Box mb={24}>{buttonTakePic}</Box>
          </Flex>
        )}
      </ContainerPage>
    </Camera>
  );
}
