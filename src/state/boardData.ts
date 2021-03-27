import { DraggableLocation } from "react-beautiful-dnd";
import { Subject } from "rxjs";
import uuid from "uuidv4";
import { omit } from "lodash";

import { BoardData, Card, Cards, Column } from "../types/types";

let boardData: BoardData;

export const boardDataSubject = new Subject<BoardData>();

boardDataSubject.subscribe((_boardData: BoardData) => {
  boardData = _boardData;
});

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
export const reorderListPosition = (initialPosition: number, finalPosition: number) => {
  const newBoardData = Object.fromEntries(
    Object.entries(boardData).map(([key, value]) => [
      key,
      reorderUniqueListPosition({ list: value, initialPosition, finalPosition }),
    ])
  );

  boardDataSubject.next(newBoardData);
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
  source: DraggableLocation,
  destination: DraggableLocation,
  cardId: string
) => {
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
    boardDataSubject.next(newBoardData);
  }
  // moving card between different lists
  else {
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

    boardDataSubject.next(newBoardData);
  }
};

export const addCard = (listId: string, content: string) => {
  const listCards: Cards = boardData[listId].cards;
  const position: number = Object.keys(listCards).length;
  const card: Card = { position, card_content: content };
  boardData[listId].cards[uuid()] = card;

  // refactor to only update changed list for optimisation???
  boardDataSubject.next({ ...boardData });
};

export const updateCard = (listId: string, cardId: string, content: string) => {
  boardData[listId].cards[cardId].card_content = content;
  boardDataSubject.next({ ...boardData });
};

export const addList = (listTitle: string) => {
  const position: number = Object.keys(boardData).length;
  const list: Column = { position, list_title: listTitle, cards: {} };
  boardData[uuid()] = list;
  boardDataSubject.next({ ...boardData });
};

export const updateListTitle = (listId: string, listTitle: string) => {
  boardData[listId].list_title = listTitle;
  boardDataSubject.next({ ...boardData });
};

export const deleteList = (listId: string) => {
  delete boardData[listId];
  boardDataSubject.next({ ...boardData });
};

export const deleteCard = (listId: string, cardId: string) => {
  delete boardData[listId].cards[cardId];
  boardDataSubject.next({ ...boardData });
};
