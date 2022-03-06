import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { formSlice } from "../../store/form.slice";
import {
  Flex,
  Icon,
  IconButton,
  Image,
  Heading,
  Box,
  Center,
  HStack,
} from "native-base";
import { useNavigate } from "react-router-native";
import * as ImagePicker from "expo-image-picker";
import { ROUTES } from "./../../routes/index";
import { useAlert } from "./../../utils/toast.utils";
export function GalleryUploadPage() {
  const navigate = useNavigate();
  const [formState, setformState] = useRecoilState(formSlice);
  const { show } = useAlert();
  useEffect(() => {
    pickImage();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    result;

    if (!result.cancelled && result.uri && result.base64) {
      setformState({
        ...formState,
        picURL: result.uri,
        picBase64: result.base64,
      });
      navigate(ROUTES.BILL_FORM);
    } else {
      navigate(ROUTES.HOME);
    }
  };

  return <></>;
}
