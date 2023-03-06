import { ContainerPage } from "@components";
import { Text } from "native-base";

export function SandboxPage() {
  return (
    <ContainerPage h="full">
      <Text fontWeight={"semibold"} fontSize={"lg"} color={"white"}>
        Sandbox
      </Text>
    </ContainerPage>
  );
}
