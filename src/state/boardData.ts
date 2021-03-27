import { DraggableLocation } from "react-beautiful-dnd";
import { Subject } from "rxjs";
import uuid from "uuidv4";
import { BoardData, Card, Cards, Column } from "../types/types";

let boardData: BoardData;

export const boardDataSubject = new Subject<BoardData>();

boardDataSubject.subscribe((_boardData: BoardData) => {
  boardData = _boardData;
});

// TODO I should generalise this function (DRY)
export const reorderListPosition = (initialPosition: number, finalPosition: number) => {
  Object.values(boardData).forEach((list: Column) => {
    if (list.position === initialPosition) {
      list.position = finalPosition;
      return;
    }
    if (
      list.position < Math.min(initialPosition, finalPosition) ||
      list.position > Math.max(initialPosition, finalPosition)
    ) {
      return;
    }
    if (initialPosition < finalPosition) {
      list.position -= 1;
      return;
    }
    list.position += 1;
  });

  boardDataSubject.next({ ...boardData });
};

export const reorderCardPosition = (
  source: DraggableLocation,
  destination: DraggableLocation,
  cardId: string
) => {
  // moving card within same list
  if (source.droppableId === destination.droppableId) {
    const { cards } = boardData[source.droppableId];
    Object.values(cards).forEach((card: Card) => {
      if (card.position === source.index) {
        card.position = destination.index;
        return;
      }
      if (
        card.position < Math.min(source.index, destination.index) ||
        card.position > Math.max(source.index, destination.index)
      ) {
        return;
      }
      if (source.index < destination.index) {
        card.position -= 1;
        return;
      }
      card.position += 1;
    });
  }
  // moving card between different lists
  else {
    const sourceCards: Cards = boardData[source.droppableId].cards;
    const destinationCards: Cards = boardData[destination.droppableId].cards;
    const movingCard: Card = boardData[source.droppableId].cards[cardId];
    Object.values(sourceCards).forEach((card: Card) => {
      if (card.position > source.index) {
        card.position -= 1;
      }
    });
    Object.values(destinationCards).forEach((card: Card) => {
      if (card.position >= destination.index) {
        card.position += 1;
      }
    });
    delete boardData[source.droppableId].cards[cardId];
    movingCard.position = destination.index;
    boardData[destination.droppableId].cards[cardId] = movingCard;
  }

  boardDataSubject.next({ ...boardData });
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
