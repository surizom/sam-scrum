/* eslint-disable import/prefer-default-export */
import { ProductData } from "../types/types";

export const catchErrorWithAlert = (
  callback: () => ProductData,
  state: ProductData,
  alertMessage: string
) => {
  try {
    return callback();
  } catch (error) {
    alert(alertMessage);
    return state;
  }
};
