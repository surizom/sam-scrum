/* eslint-disable import/prefer-default-export */
import { omit } from "lodash";
import { ProductData } from "../../types/types";
import { someItemsNotDone } from "./closeSprintUtils";

export const createSprint = ({
  productData,
  id,
  goal,
  startDate,
  endDate,
  isOpen,
}: {
  productData: ProductData;
  id: string;
  goal: string;
  startDate: Date;
  endDate: Date;
  isOpen: boolean;
}) => {
  if (startDate > endDate) {
    throw new Error("End date must be after start date");
  }
  const position = Object.keys(productData.sprints).length;
  const newProductData: ProductData = {
    ...productData,
    sprints: {
      ...productData.sprints,
      [id]: {
        data: {},
        goal,
        startDate,
        endDate,
        position,
        isOpen,
      },
    },
  };
  return newProductData;
};

export const closeSprint = ({ productData, id }: { productData: ProductData; id: string }) => {
  if (someItemsNotDone(productData.sprints[id])) {
    throw new Error("All items must be in done state in order to close sprint");
  }
  const newProductData: ProductData = {
    ...productData,
    sprints: {
      ...productData.sprints,
      [id]: {
        ...productData.sprints[id],
        isOpen: false,
      },
    },
  };
  return newProductData;
};

export const deleteSprint = ({ productData, id }: { productData: ProductData; id: string }) => {
  const newProductData: ProductData = {
    ...productData,
    sprints: omit(productData.sprints, [id]),
  };
  return newProductData;
};
