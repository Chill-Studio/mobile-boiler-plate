import { atom } from "recoil";
import dayjs from "dayjs";
import { KeyboardTypeOptions } from "react-native";

export const formSlice = atom<{
  picBase64: string;
  picURL: string;
  stepIndex: number;
  steps: {
    name: "vendorName" | "price" | "date";
    value: string;
    title: string;
    placeholder: string;
    keyboardType: KeyboardTypeOptions | undefined;
    label: string;
    iconName?: string;
  }[];
}>({
  key: "form",
  default: {
    picURL: "",
    picBase64: "",
    stepIndex: 0,
    steps: [
      {
        name: "vendorName",
        label: "Vendor name",
        value: "",
        title: "Vendor name ?",
        placeholder: "Ex: Fnac",
        keyboardType: "default",
        iconName: "store",
      },
      {
        label: "Price",
        name: "price",
        value: "",
        title: "Price ?",
        placeholder: "Ex: 20",
        keyboardType: "numeric",
        iconName: "euro-sign",
      },
      {
        label: "Date",
        name: "date",
        value: dayjs().format("DD/MM/YYYY"),
        title: "Date ?",
        placeholder: "Ex: 15/10/2022",
        keyboardType: "numeric",
        iconName: "calendar-day",
      },
    ],
  },
});
