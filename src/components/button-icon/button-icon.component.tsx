import { IconButton } from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";
export const ButtonIcon = (p: {
  icon: JSX.Element;
  onPress: () => void;
  bg?: string;
  iconColor?: ColorType;
}) => {
  return (
    <IconButton
      size={89}
      bg={p.bg || "white"}
      justifyContent="center"
      alignItems="center"
      icon={p.icon}
      borderRadius="full"
      _icon={{
        color: p.iconColor || "teal.400",
        size: "xl",
      }}
      _hover={{
        bg: "primary.600:alpha.20",
      }}
      _pressed={{
        bg: "primary.600:alpha.20",
      }}
      onPress={p.onPress}
    />
  );
};
