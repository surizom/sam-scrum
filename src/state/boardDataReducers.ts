/* eslint-disable no-restricted-syntax */
import { DraggableLocation } from "react-beautiful-dnd";
import uuid from "uuidv4";
import { omit, cloneDeep } from "lodash";

import { BoardData, Card, Cards, Column } from "../types/types";

const moveCardWithinSameList = ({
  sourceIndex,
  destinationIndex,
  card,
}: {
  sourceIndex: number;
  destinationIndex: number;
  card: Card;
}): Card => {
  if (card.position === sourceIndex) {
    return {
      ...card,
      position: destinationIndex,
    };
  }
  if (
    card.position < Math.min(sourceIndex, destinationIndex) ||
    card.position > Math.max(sourceIndex, destinationIndex)
  ) {
    return card;
  }
  if (sourceIndex < destinationIndex) {
    return {
      ...card,
      position: card.position - 1,
    };
  }
  return {
    ...card,
    position: card.position + 1,
  };
};

type FindSprintIdReturnType =
  | {
      type: "SPRINT";
      sprintId: string;
      cards: Cards;
    }
  | {
      type: "BACKLOG";
      cards: Cards;
    }
  | {
      type: "ERROR";
    };

const findSprintIdByColumnId = (boardData: BoardData, columnId: string): FindSprintIdReturnType => {
  if (Object.keys(boardData.backlog).includes(columnId)) {
    return {
      type: "BACKLOG",
      cards: boardData.backlog[columnId].cards,
    };
  }
  for (const sprintId in boardData.sprints) {
    if (Object.prototype.hasOwnProperty.call(boardData.sprints, sprintId)) {
      const sprint = boardData.sprints[sprintId];
      if (Object.keys(sprint.data).includes(columnId)) {
        return {
          type: "SPRINT",
          sprintId,
          cards: boardData.sprints[sprintId].data[columnId].cards,
        };
      }
    }
  }

  return {
    type: "ERROR",
  };
};

export const reorderCardPosition = (
  boardData: BoardData,
  source: DraggableLocation,
  destination: DraggableLocation,
  cardId: string
): BoardData => {
  // moving card within same list
  if (source.droppableId === destination.droppableId) {
    const sprint = findSprintIdByColumnId(boardData, source.droppableId);
    if (sprint.type === "ERROR") {
      throw new Error("ColumnId not found in boardData");
    }
    const { cards } = sprint;

    const newCards = Object.fromEntries(
      Object.entries(cards).map(([key, value]) => [
        key,
        moveCardWithinSameList({
          card: value,
          sourceIndex: source.index,
          destinationIndex: destination.index,
        }),
      ])
    );
    const newBoardData = cloneDeep(boardData);
    if (sprint.type === "SPRINT") {
      newBoardData.sprints[sprint.sprintId].data[source.droppableId].cards = newCards;
    } else if (sprint.type === "BACKLOG") {
      newBoardData.backlog[source.droppableId].cards = newCards;
    }

    return newBoardData;
  }
  // moving card between different columns
  const sourceSprint = findSprintIdByColumnId(boardData, source.droppableId);
  if (sourceSprint.type === "ERROR") {
    throw new Error("ColumnId not found in boardData");
  }
  const sourceCards = Object.fromEntries(
    Object.entries(sourceSprint.cards).map(([key, value]) => [
      key,
      {
        ...value,
        position: value.position > source.index ? value.position - 1 : value.position,
      },
    ])
  );

  const destinationSprint = findSprintIdByColumnId(boardData, destination.droppableId);
  if (destinationSprint.type === "ERROR") {
    throw new Error("ColumnId not found in boardData");
  }
  const destinationCards = Object.fromEntries(
    Object.entries(destinationSprint.cards).map(([key, value]) => [
      key,
      {
        ...value,
        position: value.position >= destination.index ? value.position + 1 : value.position,
      },
    ])
  );

  const movingCard: Card = {
    ...sourceCards[cardId],
    position: destination.index,
  };

  const newBoardData = cloneDeep(boardData);

  if (sourceSprint.type === "SPRINT") {
    if (destinationSprint.type === "SPRINT") {
      newBoardData.sprints[sourceSprint.sprintId].data[source.droppableId].cards = sourceCards;
      newBoardData.sprints[destinationSprint.sprintId].data[
        destination.droppableId
      ].cards = destinationCards;
      newBoardData.sprints[destinationSprint.sprintId].data[destination.droppableId].cards[
        cardId
      ] = movingCard;
      delete newBoardData.sprints[sourceSprint.sprintId].data[source.droppableId].cards[cardId];
    } else {
      newBoardData.sprints[sourceSprint.sprintId].data[source.droppableId].cards = sourceCards;
      newBoardData.backlog[destination.droppableId].cards = destinationCards;
      newBoardData.backlog[destination.droppableId].cards[cardId] = movingCard;
      delete newBoardData.sprints[sourceSprint.sprintId].data[source.droppableId].cards[cardId];
    }
  } else if (sourceSprint.type === "BACKLOG") {
    if (destinationSprint.type === "SPRINT") {
      newBoardData.backlog[source.droppableId].cards = sourceCards;
      newBoardData.sprints[destinationSprint.sprintId].data[
        destination.droppableId
      ].cards = destinationCards;
      newBoardData.sprints[destinationSprint.sprintId].data[destination.droppableId].cards[
        cardId
      ] = movingCard;
      delete newBoardData.backlog[source.droppableId].cards[cardId];
    } else {
      newBoardData.backlog[source.droppableId].cards = sourceCards;
      newBoardData.backlog[destination.droppableId].cards = destinationCards;
      newBoardData.backlog[destination.droppableId].cards[cardId] = movingCard;
      delete newBoardData.backlog[source.droppableId].cards[cardId];
    }
  }

  return newBoardData;
};

export const addCard = ({
  boardData,
  sprintId,
  listId,
  content,
}: {
  boardData: BoardData;
  sprintId?: string;
  listId: string;
  content: string;
}): BoardData => {
  const listCards: Cards =
    sprintId === undefined
      ? boardData.backlog[listId].cards
      : boardData.sprints[sprintId].data[listId].cards;
  const position: number = Object.keys(listCards).length;
  const card: Card = { position, card_content: content };
  const newId = uuid();

  const newBoardData = cloneDeep(boardData);
  if (sprintId === undefined) {
    newBoardData.backlog[listId].cards[newId] = card;
  } else {
    newBoardData.sprints[sprintId].data[listId].cards[newId] = card;
  }
  return newBoardData;
};

export const updateCard = ({
  boardData,
  sprintId,
  listId,
  cardId,
  content,
}: {
  boardData: BoardData;
  sprintId?: string;
  listId: string;
  cardId: string;
  content: string;
}): BoardData => {
  const newBoardData = cloneDeep(boardData);
  if (sprintId === undefined) {
    newBoardData.backlog[listId].cards[cardId].card_content = content;
    return newBoardData;
  }
  newBoardData.sprints[sprintId].data[listId].cards[cardId].card_content = content;
  return newBoardData;
};

export const addList = (boardData: BoardData, sprintId: string, listTitle: string): BoardData => {
  const position: number = Object.keys(boardData.sprints[sprintId].data).length;
  const list: Column = { position, list_title: listTitle, cards: {} };
  const newId = uuid();

  const newBoardData = cloneDeep(boardData);
  newBoardData.sprints[sprintId].data[newId] = list;
  return newBoardData;
};

export const updateListTitle = (
  boardData: BoardData,
  sprintId: string,
  listId: string,
  listTitle: string
) => {
  const newBoardData = cloneDeep(boardData);
  newBoardData.sprints[sprintId].data[listId].list_title = listTitle;
  return newBoardData;
};

export const deleteList = (boardData: BoardData, sprintId: string, listId: string) =>
  omit(boardData, [`sprints.${sprintId}.data.${listId}`]) as BoardData;

export const deleteCard = ({
  boardData,
  sprintId,
  listId,
  cardId,
}: {
  boardData: BoardData;
  sprintId?: string;
  listId: string;
  cardId: string;
}) => {
  // if product backlog
  if (sprintId === undefined) {
    return omit(boardData, [`backlog.${listId}.cards.${cardId}`]) as BoardData;
  }
  return omit(boardData, [`sprints.${sprintId}.data.${listId}.cards.${cardId}`]) as BoardData;
};
