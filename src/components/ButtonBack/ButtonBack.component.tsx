import React from "react";
import { Icon, IconButton } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useNavigate } from "react-router-native";

interface Props {
  onPress?: () => void;
}
export function ButtonBack(p: Props) {
  const nav = useNavigate();
  return (
    <IconButton
      icon={<Icon as={AntDesign} name="arrowleft" />}
      borderRadius="full"
      _icon={{
        color: "gray.300",
        size: "md",
      }}
      _hover={{
        bg: "primary.600:alpha.20",
      }}
      _pressed={{
        bg: "primary.600:alpha.20",
      }}
      onPress={() => (p.onPress ? p.onPress() : nav(-1))}
    />
  );
}
