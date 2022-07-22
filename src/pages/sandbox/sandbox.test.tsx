import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { TextInput } from "react-native";

describe("Sandbox page", () => {
  it("change text in <TextInput/> correctly", () => {
    const onChangeText = jest.fn();

    render(<TextInput testID="textInput1" onChangeText={onChangeText} />);

    const textInput = screen.getAllByTestId("textInput1")[0];

    fireEvent.changeText(textInput, "Hello");

    expect(onChangeText).toBeCalledWith("Hello");
  });
});
