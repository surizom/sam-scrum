/* eslint-disable import/prefer-default-export */

import { Column, Sprint } from "../../types/types";

const isColumnNonEmpty = (column: Column) => Object.keys(column.items).length !== 0;

export const someItemsNotDone = (sprint: Sprint) =>
  Object.values(sprint.data)
    .filter((column) => column.list_title !== "Done")
    .some((column) => isColumnNonEmpty(column));
