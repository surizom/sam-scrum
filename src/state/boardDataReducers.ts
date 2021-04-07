import { DraggableLocation } from "react-beautiful-dnd";
import uuid from "uuidv4";
import { omit } from "lodash";

import { BoardData, SprintData, Card, Cards, Column } from "../types/types";

const reorderUniqueListPosition = ({
  initialPosition,
  finalPosition,
  list,
}: {
  initialPosition: number;
  finalPosition: number;
  list: Column;
}): Column => {
  if (list.position === initialPosition) {
    return {
      ...list,
      position: finalPosition,
    };
  }
  if (
    list.position < Math.min(initialPosition, finalPosition) ||
    list.position > Math.max(initialPosition, finalPosition)
  ) {
    return {
      ...list,
    };
  }
  if (initialPosition < finalPosition) {
    return {
      ...list,
      position: list.position - 1,
    };
  }
  return {
    ...list,
    position: list.position + 1,
  };
};

// TODO I should generalise this function (DRY)
export const reorderListPosition = (
  boardData: BoardData,
  initialPosition: number,
  finalPosition: number
): BoardData => {
  const newBacklog = reorderUniqueListPosition({
    list: boardData.backlog,
    initialPosition,
    finalPosition,
  });
  const newSprints = boardData.sprints.map((sprint, index) => {});
  const newBoardData = {
    backlog: reorderUniqueListPosition({ list: value, initialPosition, finalPosition }),
    ...Object.fromEntries(
      Object.entries(boardData).map(([key, value]) => [
        key,
        reorderUniqueListPosition({ list: value, initialPosition, finalPosition }),
      ])
    ),
  };

  return newBoardData;
};

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

export const reorderCardPosition = (
  boardData: BoardData,
  source: DraggableLocation,
  destination: DraggableLocation,
  cardId: string
): BoardData => {
  // moving card within same list
  if (source.droppableId === destination.droppableId) {
    const { cards } = boardData[source.droppableId];
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
    const newBoardData = {
      ...boardData,
      [source.droppableId]: {
        ...boardData[source.droppableId],
        cards: newCards,
      },
    };
    return newBoardData;
  }
  // moving card between different lists
  const sourceCards: Cards = Object.fromEntries(
    Object.entries(boardData[source.droppableId].cards).map(([key, value]) => [
      key,
      {
        ...value,
        position: value.position > source.index ? value.position - 1 : value.position,
      },
    ])
  );
  const destinationCards: Cards = Object.fromEntries(
    Object.entries(boardData[destination.droppableId].cards).map(([key, value]) => [
      key,
      {
        ...value,
        position: value.position >= destination.index ? value.position + 1 : value.position,
      },
    ])
  );
  const movingCard: Card = {
    ...boardData[source.droppableId].cards[cardId],
    position: destination.index,
  };

  const newBoardData = omit(
    {
      ...boardData,
      [source.droppableId]: {
        ...boardData[source.droppableId],
        cards: sourceCards,
      },
      [destination.droppableId]: {
        ...boardData[destination.droppableId],
        cards: {
          ...destinationCards,
          [cardId]: movingCard,
        },
      },
    },
    [`${source.droppableId}.cards.${cardId}`]
  );

  return newBoardData;
};

export const addCard = (boardData: BoardData, listId: string, content: string): BoardData => {
  const listCards: Cards = boardData[listId].cards;
  const position: number = Object.keys(listCards).length;
  const card: Card = { position, card_content: content };
  const newId = uuid();
  return {
    ...boardData,
    [listId]: {
      ...boardData[listId],
      cards: {
        ...boardData[listId].cards,
        [newId]: card,
      },
    },
  };
};

export const updateCard = (
  boardData: BoardData,
  listId: string,
  cardId: string,
  content: string
): BoardData => ({
  ...boardData,
  [listId]: {
    ...boardData[listId],
    cards: {
      ...boardData[listId].cards,
      [cardId]: {
        ...boardData[listId].cards[cardId],
        card_content: content,
      },
    },
  },
});

export const addList = (boardData: BoardData, listTitle: string): BoardData => {
  const position: number = Object.keys(boardData).length;
  const list: Column = { position, list_title: listTitle, cards: {} };
  const newId = uuid();
  const newBoardData = {
    ...boardData,
    [newId]: list,
  };
  return newBoardData;
};

export const updateListTitle = (boardData: BoardData, listId: string, listTitle: string) => {
  const updatedList = { ...boardData[listId], listTitle };
  return { ...boardData, [listId]: updatedList };
};

export const deleteList = (boardData: BoardData, listId: string) => omit(boardData, [listId]);

export const deleteCard = (boardData: BoardData, listId: string, cardId: string) =>
  omit(boardData, [`${listId}.cards.${cardId}`]);
