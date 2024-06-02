import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MyCarsScreen from "./MyCarsScreen";

describe("MyCarsScreen", () => {
  test("renders correctly", () => {
    const { getByText } = render(<MyCarsScreen />);
    expect(getByText("My Cars")).toBeTruthy();
  });

  test("opens modal when add car button is pressed", () => {
    const { getByText, getByTestId } = render(<MyCarsScreen />);
    const addButton = getByText("Add car");
    fireEvent.press(addButton);
    expect(getByTestId("modal")).toBeTruthy();
  });

  test("cancels adding a car when cancel button in modal is pressed", () => {
    const { getByText, getByPlaceholderText } = render(<MyCarsScreen />);
    const addButton = getByText("Add car");
    fireEvent.press(addButton);

    const cancelButton = getByText("Cancel");
    fireEvent.press(cancelButton);

    // Ensure input fields are cleared
    expect(getByPlaceholderText("License Plate").props.value).toBe("");
  });
});
