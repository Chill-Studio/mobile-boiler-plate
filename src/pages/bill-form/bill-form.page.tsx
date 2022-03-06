import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { formSlice } from "../../store/form.slice";
import {
  Text,
  Icon,
  Heading,
  FormControl,
  Input,
  InputGroup,
  InputRightAddon,
  VStack,
  Button,
  Center,
  Box,
  PresenceTransition,
  IconButton,
} from "native-base";
import { Entypo } from "@expo/vector-icons";
import { useLocation, useNavigate } from "react-router-native";
import { Header } from "../../components/page-header/page-header.component";
import { formatWithMask, Masks } from "react-native-mask-input";
import { ROUTES } from "./../../routes/index";
import { formSelector } from "../../store/form.selector";
import { TransitionFade } from "../../components/transition-fade";
import { ContainerPage } from "./../../components/container-page/container-page";

const ANIM_DURATION = 150;

export function BillFormPage() {
  const [formState, setFormState] = useRecoilState(formSlice);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const navigate = useNavigate();
  const { currentStep } = useRecoilValue(formSelector);
  const location = useLocation();
  const isEditingFromSummary = (
    location.state as { isEditingFromSummaryPage?: boolean }
  )?.isEditingFromSummaryPage;

  useEffect(() => {
    toggleVisibility(true);
  }, []);

  const updateCurrentStepValue = (value: string) => {
    const updatedSteps = [...formState.steps];
    updatedSteps[formState.stepIndex] = { ...currentStep, value };
    setFormState({ ...formState, steps: updatedSteps });
  };
  const deleteInputContent = () => {
    updateCurrentStepValue("");
  };
  const toggleVisibility = (show: boolean, onDone?: () => void) => {
    setTimeout(() => {
      setIsFormOpen(show);
      setTimeout(() => {
        onDone?.();
      }, ANIM_DURATION);
    }, ANIM_DURATION);
  };
  const handlePressNext = () => {
    if (!isEditingFromSummary) {
      if (formState.stepIndex < formState.steps.length - 1) {
        toggleVisibility(false, () => {
          toggleVisibility(true);
          setFormState({ ...formState, stepIndex: formState.stepIndex + 1 });
        });
      } else {
        navigate(ROUTES.SUMMARY);
      }
    } else {
      // In case you came on this page by clicking on an input in the summary page
      // We re set the step to the last one so if you press back on the summary page we come back to the last
      setFormState({ ...formState, stepIndex: formState.steps.length - 1 });
      navigate(ROUTES.SUMMARY);
    }
  };

  const handleInputChange = (inputValue: string) => {
    let value = formatWithMask({
      mask: currentStep.name === "date" ? Masks.DATE_DDMMYYYY : undefined,
      text:
        currentStep.name === "price"
          ? inputValue.replace(/[^\d.,]/g, "")
          : inputValue,
    }).masked;

    updateCurrentStepValue(value);
  };

  const formSection = () => {
    return (
      <Box>
        <Heading textAlign={"center"}>{currentStep.title}</Heading>
        <InputGroup mt={5} justifyContent="center">
          <Input
            keyboardType={currentStep.keyboardType}
            autoFocus
            bg="white"
            w={{
              base: "100%",
            }}
            size="2xl"
            placeholder={currentStep.placeholder}
            onChangeText={handleInputChange}
            value={currentStep.value}
            InputRightElement={
              <IconButton
                onPress={deleteInputContent}
                icon={<Icon as={Entypo} name={"cross"} />}
                _icon={{
                  color: "gray.400",
                  size: "md",
                }}
              />
            }
          />
          {currentStep.name === "price" && <InputRightAddon children={"€"} />}
        </InputGroup>
      </Box>
    );
  };

  const buttonNext = () => {
    return (
      <Box alignItems={"flex-end"}>
        <Center>
          <Button
            isDisabled={getHasFormError()}
            _text={{ fontSize: "lg", color: "white" }}
            bg={"teal.400"}
            rightIcon={
              <Icon
                as={Entypo}
                name={isEditingFromSummary ? "check" : "arrow-right"}
                color="white"
              />
            }
            onPress={handlePressNext}
          >
            {isEditingFromSummary ? "Apply" : "Next"}
          </Button>
        </Center>
      </Box>
    );
  };

  const handlePressBack = () => {
    setFormState({ ...formState, stepIndex: formState.stepIndex - 1 });
  };

  const getHasFormError = (): boolean => {
    if (currentStep.value === "") {
      return true;
    } else {
      if (currentStep.name === "date") {
        return currentStep.value.length !== 10;
      } else if (currentStep.name === "price") {
        return isNaN(Number.parseInt(currentStep.value));
      }
    }
    return false;
  };

  return (
    <ContainerPage bg="white">
      <Header
        hasBackButton
        onPressBack={formState.stepIndex > 0 ? handlePressBack : undefined}
        title="Fill the bill"
      />
      <PresenceTransition
        visible={isFormOpen}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: ANIM_DURATION,
          },
        }}
      >
        <FormControl p={5} h="100%" alignItems="center">
          <VStack p={5} space={5}>
            {formSection()}
            {buttonNext()}
          </VStack>
        </FormControl>
      </PresenceTransition>
    </ContainerPage>
  );
}
