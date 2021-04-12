import { omit } from "lodash";
import { v4 as uuidv4 } from "uuid";

import { ProductData } from "../../types/types";
import { someItemsNotDone } from "./sprintUtils";

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

  const idSprintBacklog = uuidv4();
  const idDoing = uuidv4();
  const idDone = uuidv4();

  const position = Object.keys(productData.sprints).length;
  const newProductData: ProductData = {
    ...productData,
    sprints: {
      ...productData.sprints,
      [id]: {
        data: {
          [idSprintBacklog]: {
            items: {},
            list_title: "Sprint Backlog",
            position: 0,
          },
          [idDoing]: {
            items: {},
            list_title: "Doing",
            position: 1,
          },
          [idDone]: {
            items: {},
            list_title: "Done",
            position: 2,
          },
        },
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
