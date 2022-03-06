import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { formSlice } from "../../store/form.slice";
import {
  Flex,
  Box,
  Button,
  Icon,
  useToast,
  FormControl,
  Input,
  Divider,
  Text,
  Stack,
  HStack,
  Heading,
  Spinner,
} from "native-base";
import { useNavigate } from "react-router-native";
import { Header } from "../../components/page-header/page-header.component";
import { FontAwesome5 } from "@expo/vector-icons";
import { Dialog } from "./../../components/dialog/dialog.component";
import { useDisclose } from "native-base";
import { formSelector } from "./../../store/form.selector";
import dayjs from "dayjs";
import { getMonthNames } from "../../utils/date.utils";
import { ROUTES } from "./../../routes/index";
import { useAlert } from "./../../utils/toast.utils";
import { TransitionFade } from "../../components/transition-fade";
import { ContainerPage } from "./../../components/container-page/container-page";

const GITHUB_BASE_URL =
  "https://api.github.com/repos/Chill-Studio/bills/contents/";
const BEARER_TOKEN = "Bearer  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";

export function SummaryPage() {
  const { show } = useAlert();
  const navigate = useNavigate();
  const { billName } = useRecoilValue(formSelector);
  const [formState, setFormState] = useRecoilState(formSlice);
  const [isLoading, setIsLoading] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const resetForm = useResetRecoilState(formSlice);

  const {
    isOpen: isDialogOpen,
    onOpen: openDialog,
    onClose: closeDialog,
  } = useDisclose();

  const uploadBill = async () => {
    let response;
    setIsBtnDisabled(true);
    setIsLoading(true);
    const currentYear = dayjs().year();
    const currentLocalizedMonth = getMonthNames()[dayjs().month()];
    const urlPath = `${currentYear}/achats/${currentLocalizedMonth}/${billName}`;
    const body = {
      message: billName,
      content: formState.picBase64,
    };
    try {
      response = await (
        await fetch(GITHUB_BASE_URL + urlPath, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: BEARER_TOKEN,
          },
          body: JSON.stringify(body),
        })
      ).json();
    } catch (error) {
      console.error(error);
      show("error", "Error during the upload :/");
      setIsBtnDisabled(false);
    }
    show("success", " Bill successfully uploaded");
    setIsLoading(false);
    closeDialog();
    setTimeout(() => {
      resetForm();
      navigate(ROUTES.HOME);
    }, 4000);
  };

  const renderSummary = (
    <Stack
      space={2.5}
      alignSelf="center"
      w={{
        base: "80%",
      }}
    >
      {formState.steps.map((step, index) => {
        return (
          <Box key={step.name}>
            <HStack space={2}>
              <Text pt={1}>
                {step.iconName && (
                  <Icon as={FontAwesome5} size="sm" name={step.iconName} />
                )}
              </Text>
              <Text bold fontSize="xl" mb="4">
                {step.label}
              </Text>
            </HStack>
            <FormControl mb="5">
              <Input
                size={"lg"}
                value={step.value}
                onFocus={() => {
                  setFormState({ ...formState, stepIndex: index });
                  navigate(ROUTES.BILL_FORM, {
                    state: {
                      isEditingFromSummaryPage: true,
                    },
                  });
                }}
              />
            </FormControl>
          </Box>
        );
      })}
    </Stack>
  );

  const spinner = (
    <HStack space={2} justifyContent="center">
      <Spinner accessibilityLabel="Loading upload" />
      <Heading color="teal.400" fontSize="md">
        Loading
      </Heading>
    </HStack>
  );

  const dialog = (
    <Dialog
      isOpen={isDialogOpen}
      title="Confirm upload"
      content={
        <>
          {isLoading ? (
            spinner
          ) : (
            <Text fontSize="lg">
              Upload <Text fontWeight={"bold"}>{billName}</Text> ?
            </Text>
          )}
        </>
      }
      onClose={closeDialog}
      confirmBtnText="Upload"
      onConfirm={uploadBill}
      isBtnDisabled={isBtnDisabled}
      rightIcon={<Icon as={FontAwesome5} name="cloud-upload-alt" />}
      closeOnOverlayClick={!isLoading}
    />
  );
  return (
    <ContainerPage bg="white">
      <Flex justify={"space-between"} h="100%">
        <Header hasBackButton title="Summary" />
        {renderSummary}
        <Button
          borderRadius={"none"}
          _text={{ fontSize: "md" }}
          rightIcon={<Icon as={FontAwesome5} name="cloud-upload-alt" />}
          onPress={openDialog}
          isDisabled={isBtnDisabled}
          bg={"teal.400"}
        >
          Upload bill
        </Button>
        {dialog}
      </Flex>
    </ContainerPage>
  );
}
