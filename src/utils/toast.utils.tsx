import { HStack, useToast, Text, Icon, Box } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";

export function useAlert() {
  const toast = useToast();

  const show = (type: "info" | "success" | "error", msg: string) => {
    toast.show({
      placement: "top",
      render: () => {
        return (
          <Box
            bg={
              type === "info"
                ? "info.100"
                : type === "error"
                ? "error.100"
                : "success.100"
            }
            px={5}
          >
            <HStack space={2} rounded="md">
              <Icon
                as={FontAwesome5}
                name={
                  type === "info"
                    ? "info"
                    : type === "error"
                    ? "skull-crossbones"
                    : "check"
                }
                size={6}
              />

              <Text fontWeight={"semibold"} fontSize={"lg"}>
                {msg}
              </Text>
            </HStack>
          </Box>
        );
      },
    });
  };

  return {
    show,
  };
}
