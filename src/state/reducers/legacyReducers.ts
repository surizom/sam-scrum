/* eslint-disable no-restricted-syntax */
import { DraggableLocation } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { omit, cloneDeep } from "lodash";

import { ProductData, Item, Items, Column } from "../../types/types";

const moveItemWithinSameList = ({
  sourceIndex,
  destinationIndex,
  item,
}: {
  sourceIndex: number;
  destinationIndex: number;
  item: Item;
}): Item => {
  if (item.position === sourceIndex) {
    return {
      ...item,
      position: destinationIndex,
    };
  }
  if (
    item.position < Math.min(sourceIndex, destinationIndex) ||
    item.position > Math.max(sourceIndex, destinationIndex)
  ) {
    return item;
  }
  if (sourceIndex < destinationIndex) {
    return {
      ...item,
      position: item.position - 1,
    };
  }
  return {
    ...item,
    position: item.position + 1,
  };
};

type FindSprintIdReturnType =
  | {
      type: "SPRINT";
      sprintId: string;
      items: Items;
    }
  | {
      type: "BACKLOG";
      items: Items;
    }
  | {
      type: "ERROR";
    };

const findSprintIdByColumnId = (
  productData: ProductData,
  columnId: string
): FindSprintIdReturnType => {
  if (Object.keys(productData.backlog).includes(columnId)) {
    return {
      type: "BACKLOG",
      items: productData.backlog[columnId].items,
    };
  }
  for (const sprintId in productData.sprints) {
    if (Object.prototype.hasOwnProperty.call(productData.sprints, sprintId)) {
      const sprint = productData.sprints[sprintId];
      if (Object.keys(sprint.data).includes(columnId)) {
        return {
          type: "SPRINT",
          sprintId,
          items: productData.sprints[sprintId].data[columnId].items,
        };
      }
    }
  }

  return {
    type: "ERROR",
  };
};

export const reorderItemPosition = (
  productData: ProductData,
  source: DraggableLocation,
  destination: DraggableLocation,
  itemId: string
): ProductData => {
  // moving item within same list
  if (source.droppableId === destination.droppableId) {
    const sprint = findSprintIdByColumnId(productData, source.droppableId);
    if (sprint.type === "ERROR") {
      throw new Error("ColumnId not found in productData");
    }
    const { items } = sprint;

    const newItems = Object.fromEntries(
      Object.entries(items).map(([key, value]) => [
        key,
        moveItemWithinSameList({
          item: value,
          sourceIndex: source.index,
          destinationIndex: destination.index,
        }),
      ])
    );
    const newProductData = cloneDeep(productData);
    if (sprint.type === "SPRINT") {
      newProductData.sprints[sprint.sprintId].data[source.droppableId].items = newItems;
    } else if (sprint.type === "BACKLOG") {
      newProductData.backlog[source.droppableId].items = newItems;
    }

    return newProductData;
  }
  // moving item between different columns
  const sourceSprint = findSprintIdByColumnId(productData, source.droppableId);
  if (sourceSprint.type === "ERROR") {
    throw new Error("ColumnId not found in productData");
  }
  const sourceItems = Object.fromEntries(
    Object.entries(sourceSprint.items).map(([key, value]) => [
      key,
      {
        ...value,
        position: value.position > source.index ? value.position - 1 : value.position,
      },
    ])
  );

  const destinationSprint = findSprintIdByColumnId(productData, destination.droppableId);
  if (destinationSprint.type === "ERROR") {
    throw new Error("ColumnId not found in productData");
  }
  const destinationItems = Object.fromEntries(
    Object.entries(destinationSprint.items).map(([key, value]) => [
      key,
      {
        ...value,
        position: value.position >= destination.index ? value.position + 1 : value.position,
      },
    ])
  );

  const movingItem: Item = {
    ...sourceItems[itemId],
    position: destination.index,
  };

  const newProductData = cloneDeep(productData);

  if (sourceSprint.type === "SPRINT") {
    if (destinationSprint.type === "SPRINT") {
      newProductData.sprints[sourceSprint.sprintId].data[source.droppableId].items = sourceItems;
      newProductData.sprints[destinationSprint.sprintId].data[
        destination.droppableId
      ].items = destinationItems;
      newProductData.sprints[destinationSprint.sprintId].data[destination.droppableId].items[
        itemId
      ] = movingItem;
      delete newProductData.sprints[sourceSprint.sprintId].data[source.droppableId].items[itemId];
    } else {
      newProductData.sprints[sourceSprint.sprintId].data[source.droppableId].items = sourceItems;
      newProductData.backlog[destination.droppableId].items = destinationItems;
      newProductData.backlog[destination.droppableId].items[itemId] = movingItem;
      delete newProductData.sprints[sourceSprint.sprintId].data[source.droppableId].items[itemId];
    }
  } else if (sourceSprint.type === "BACKLOG") {
    if (destinationSprint.type === "SPRINT") {
      newProductData.backlog[source.droppableId].items = sourceItems;
      newProductData.sprints[destinationSprint.sprintId].data[
        destination.droppableId
      ].items = destinationItems;
      newProductData.sprints[destinationSprint.sprintId].data[destination.droppableId].items[
        itemId
      ] = movingItem;
      delete newProductData.backlog[source.droppableId].items[itemId];
    } else {
      newProductData.backlog[source.droppableId].items = sourceItems;
      newProductData.backlog[destination.droppableId].items = destinationItems;
      newProductData.backlog[destination.droppableId].items[itemId] = movingItem;
      delete newProductData.backlog[source.droppableId].items[itemId];
    }
  }

  return newProductData;
};

export const addItem = ({
  productData,
  sprintId,
  listId,
  content,
}: {
  productData: ProductData;
  sprintId?: string;
  listId: string;
  content: string;
}): ProductData => {
  const listItems: Items =
    sprintId === undefined
      ? productData.backlog[listId].items
      : productData.sprints[sprintId].data[listId].items;
  const position: number = Object.keys(listItems).length;
  const item: Item = { position, item_content: content };
  const newId = uuidv4();

  const newProductData = cloneDeep(productData);
  if (sprintId === undefined) {
    newProductData.backlog[listId].items[newId] = item;
  } else {
    newProductData.sprints[sprintId].data[listId].items[newId] = item;
  }
  return newProductData;
};

export const updateItem = ({
  productData,
  sprintId,
  listId,
  itemId,
  content,
}: {
  productData: ProductData;
  sprintId?: string;
  listId: string;
  itemId: string;
  content: string;
}): ProductData => {
  const newItemData = cloneDeep(productData);
  if (sprintId === undefined) {
    newItemData.backlog[listId].items[itemId].item_content = content;
    return newItemData;
  }
  newItemData.sprints[sprintId].data[listId].items[itemId].item_content = content;
  return newItemData;
};

export const addList = (
  productData: ProductData,
  sprintId: string,
  listId: string,
  listTitle: string
): ProductData => {
  const position: number = Object.keys(productData.sprints[sprintId].data).length;
  const list: Column = { position, list_title: listTitle, items: {} };

  const newBoardData = cloneDeep(productData);
  newBoardData.sprints[sprintId].data[listId] = list;
  return newBoardData;
};

export const updateListTitle = (
  productData: ProductData,
  sprintId: string,
  listId: string,
  listTitle: string
) => {
  const newBoardData = cloneDeep(productData);
  newBoardData.sprints[sprintId].data[listId].list_title = listTitle;
  return newBoardData;
};

export const deleteList = (productData: ProductData, sprintId: string, listId: string) =>
  omit(productData, [`sprints.${sprintId}.data.${listId}`]) as ProductData;

export const deleteItem = ({
  productData,
  sprintId,
  listId,
  itemId,
}: {
  productData: ProductData;
  sprintId?: string;
  listId: string;
  itemId: string;
}) => {
  // if product backlog
  if (sprintId === undefined) {
    return omit(productData, [`backlog.${listId}.items.${itemId}`]) as ProductData;
  }
  return omit(productData, [`sprints.${sprintId}.data.${listId}.items.${itemId}`]) as ProductData;
};
