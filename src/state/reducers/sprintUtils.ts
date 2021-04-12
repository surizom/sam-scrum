/* eslint-disable import/prefer-default-export */

import { isEqual } from "lodash";
import { Column, ProductData, Sprint } from "../../types/types";

const isColumnNonEmpty = (column: Column) => Object.keys(column.items).length !== 0;

export const someItemsNotDone = (sprint: Sprint) =>
  Object.values(sprint.data)
    .filter((column) => column.list_title !== "Done")
    .some((column) => isColumnNonEmpty(column));

export const isSameSprint = ({
  actual,
  expected,
  sprintId,
}: {
  actual: ProductData;
  expected: ProductData;
  sprintId: string;
}): boolean => {
  const actualResultWithoutColumns: ProductData = {
    ...actual,
    sprints: {
      ...actual.sprints,
      [sprintId]: {
        ...actual.sprints[sprintId],
        data: {},
      },
    },
  };
  const expectedResultWithoutColumns: ProductData = {
    ...expected,
    sprints: {
      ...expected.sprints,
      [sprintId]: {
        ...expected.sprints[sprintId],
        data: {},
      },
    },
  };

  return isEqual(actualResultWithoutColumns, expectedResultWithoutColumns);
};

export const isSameColumns = ({
  actual,
  expected,
}: {
  actual: Column[];
  expected: Column[];
}): boolean => isEqual(actual, expected);
export const isSameSprintAndColumns = ({
  actual,
  expected,
  sprintId,
}: {
  actual: ProductData;
  expected: ProductData;
  sprintId: string;
}): boolean => {
  const actualColumns: Column[] = Object.values(actual.sprints[sprintId].data);
  const expectedColumns: Column[] = Object.values(expected.sprints[sprintId].data);

  return (
    isSameSprint({ actual, expected, sprintId }) &&
    isSameColumns({ actual: actualColumns, expected: expectedColumns })
  );
};

export const isSameSprintAndDefaultColumns = ({
  actual,
  expected,
  sprintId,
}: {
  actual: ProductData;
  expected: ProductData;
  sprintId: string;
}): boolean => {
  const actualColumns: Column[] = Object.values(actual.sprints[sprintId].data);
  const expectedColumns: Column[] = [
    {
      items: {},
      list_title: "Sprint Backlog",
      position: 0,
    },
    {
      items: {},
      list_title: "Doing",
      position: 1,
    },
    {
      items: {},
      list_title: "Done",
      position: 2,
    },
  ];

  return (
    isSameSprint({ actual, expected, sprintId }) &&
    isSameColumns({ actual: actualColumns, expected: expectedColumns })
  );
};
