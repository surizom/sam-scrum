/* eslint-disable no-restricted-syntax */
import { DraggableLocation } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { omit, cloneDeep } from "lodash";

import { ProjectData, Item, Items, Column } from "../../types/types";

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
  projectData: ProjectData,
  columnId: string
): FindSprintIdReturnType => {
  if (Object.keys(projectData.backlog).includes(columnId)) {
    return {
      type: "BACKLOG",
      items: projectData.backlog[columnId].items,
    };
  }
  for (const sprintId in projectData.sprints) {
    if (Object.prototype.hasOwnProperty.call(projectData.sprints, sprintId)) {
      const sprint = projectData.sprints[sprintId];
      if (Object.keys(sprint.data).includes(columnId)) {
        return {
          type: "SPRINT",
          sprintId,
          items: projectData.sprints[sprintId].data[columnId].items,
        };
      }
    }
  }

  return {
    type: "ERROR",
  };
};

export const reorderItemPosition = (
  projectData: ProjectData,
  source: DraggableLocation,
  destination: DraggableLocation,
  itemId: string
): ProjectData => {
  // moving item within same list
  if (source.droppableId === destination.droppableId) {
    const sprint = findSprintIdByColumnId(projectData, source.droppableId);
    if (sprint.type === "ERROR") {
      throw new Error("ColumnId not found in projectData");
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
    const newProjectData = cloneDeep(projectData);
    if (sprint.type === "SPRINT") {
      newProjectData.sprints[sprint.sprintId].data[source.droppableId].items = newItems;
    } else if (sprint.type === "BACKLOG") {
      newProjectData.backlog[source.droppableId].items = newItems;
    }

    return newProjectData;
  }
  // moving item between different columns
  const sourceSprint = findSprintIdByColumnId(projectData, source.droppableId);
  if (sourceSprint.type === "ERROR") {
    throw new Error("ColumnId not found in projectData");
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

  const destinationSprint = findSprintIdByColumnId(projectData, destination.droppableId);
  if (destinationSprint.type === "ERROR") {
    throw new Error("ColumnId not found in projectData");
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

  const newProjectData = cloneDeep(projectData);

  if (sourceSprint.type === "SPRINT") {
    if (destinationSprint.type === "SPRINT") {
      newProjectData.sprints[sourceSprint.sprintId].data[source.droppableId].items = sourceItems;
      newProjectData.sprints[destinationSprint.sprintId].data[
        destination.droppableId
      ].items = destinationItems;
      newProjectData.sprints[destinationSprint.sprintId].data[destination.droppableId].items[
        itemId
      ] = movingItem;
      delete newProjectData.sprints[sourceSprint.sprintId].data[source.droppableId].items[itemId];
    } else {
      newProjectData.sprints[sourceSprint.sprintId].data[source.droppableId].items = sourceItems;
      newProjectData.backlog[destination.droppableId].items = destinationItems;
      newProjectData.backlog[destination.droppableId].items[itemId] = movingItem;
      delete newProjectData.sprints[sourceSprint.sprintId].data[source.droppableId].items[itemId];
    }
  } else if (sourceSprint.type === "BACKLOG") {
    if (destinationSprint.type === "SPRINT") {
      newProjectData.backlog[source.droppableId].items = sourceItems;
      newProjectData.sprints[destinationSprint.sprintId].data[
        destination.droppableId
      ].items = destinationItems;
      newProjectData.sprints[destinationSprint.sprintId].data[destination.droppableId].items[
        itemId
      ] = movingItem;
      delete newProjectData.backlog[source.droppableId].items[itemId];
    } else {
      newProjectData.backlog[source.droppableId].items = sourceItems;
      newProjectData.backlog[destination.droppableId].items = destinationItems;
      newProjectData.backlog[destination.droppableId].items[itemId] = movingItem;
      delete newProjectData.backlog[source.droppableId].items[itemId];
    }
  }

  return newProjectData;
};

export const addItem = ({
  projectData,
  sprintId,
  listId,
  content,
}: {
  projectData: ProjectData;
  sprintId?: string;
  listId: string;
  content: string;
}): ProjectData => {
  const listItems: Items =
    sprintId === undefined
      ? projectData.backlog[listId].items
      : projectData.sprints[sprintId].data[listId].items;
  const position: number = Object.keys(listItems).length;
  const item: Item = { position, item_content: content };
  const newId = uuidv4();

  const newProjectData = cloneDeep(projectData);
  if (sprintId === undefined) {
    newProjectData.backlog[listId].items[newId] = item;
  } else {
    newProjectData.sprints[sprintId].data[listId].items[newId] = item;
  }
  return newProjectData;
};

export const updateItem = ({
  projectData,
  sprintId,
  listId,
  itemId,
  content,
}: {
  projectData: ProjectData;
  sprintId?: string;
  listId: string;
  itemId: string;
  content: string;
}): ProjectData => {
  const newItemData = cloneDeep(projectData);
  if (sprintId === undefined) {
    newItemData.backlog[listId].items[itemId].item_content = content;
    return newItemData;
  }
  newItemData.sprints[sprintId].data[listId].items[itemId].item_content = content;
  return newItemData;
};

export const addList = (
  projectData: ProjectData,
  sprintId: string,
  listTitle: string
): ProjectData => {
  const position: number = Object.keys(projectData.sprints[sprintId].data).length;
  const list: Column = { position, list_title: listTitle, items: {} };
  const newId = uuidv4();

  const newBoardData = cloneDeep(projectData);
  newBoardData.sprints[sprintId].data[newId] = list;
  return newBoardData;
};

export const updateListTitle = (
  projectData: ProjectData,
  sprintId: string,
  listId: string,
  listTitle: string
) => {
  const newBoardData = cloneDeep(projectData);
  newBoardData.sprints[sprintId].data[listId].list_title = listTitle;
  return newBoardData;
};

export const deleteList = (projectData: ProjectData, sprintId: string, listId: string) =>
  omit(projectData, [`sprints.${sprintId}.data.${listId}`]) as ProjectData;

export const deleteItem = ({
  projectData,
  sprintId,
  listId,
  itemId,
}: {
  projectData: ProjectData;
  sprintId?: string;
  listId: string;
  itemId: string;
}) => {
  // if product backlog
  if (sprintId === undefined) {
    return omit(projectData, [`backlog.${listId}.items.${itemId}`]) as ProjectData;
  }
  return omit(projectData, [`sprints.${sprintId}.data.${listId}.items.${itemId}`]) as ProjectData;
};
