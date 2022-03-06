import { selector } from "recoil";
import { toKebabCase } from "../../utils/string.utils";
import { formSlice } from "./form.slice";

export const formSelector = selector({
  key: "formSelector",
  get: ({ get }) => {
    const formSlice_ = get(formSlice);
    let price = formSlice_.steps[1].value;
    const vendorName = toKebabCase(formSlice_.steps[0].value);
    const date = formSlice_.steps[2].value;
    if (!price.includes(".")) {
      price += ".00";
    }
    return {
      currentStep: formSlice_.steps[formSlice_.stepIndex],
      billName: `${date}_${vendorName}_${price}.png`
        .replace(/[,]/g, ".")
        .replace(/[/]/g, "-"),
    };
  },
});
