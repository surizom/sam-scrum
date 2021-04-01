import React, { createContext, ReactNode, useReducer } from "react";
import { DraggableLocation } from "react-beautiful-dnd";
import { BoardData } from "../types/types";
import {
  addCard,
  addList,
  deleteCard,
  deleteList,
  reorderCardPosition,
  reorderListPosition,
  updateCard,
  updateListTitle,
} from "./boardDataReducers";
import { INITIAL_BOARD_DATA, ProjectAction } from "./constants";

interface Props {
  children?: ReactNode;
}

interface ProjectContextProps {
  boardData: BoardData;
  dispatch: React.Dispatch<ProjectActionType>;
}

export const INITIAL_CONTEXT_VALUE: ProjectContextProps = {
  boardData: INITIAL_BOARD_DATA,
  dispatch: () => null,
};

export const ProjectContext = createContext<ProjectContextProps>(INITIAL_CONTEXT_VALUE);

export type ProjectActionType =
  | { type: ProjectAction.REORDER_LIST_POSITION; initialPosition: number; finalPosition: number }
  | {
      type: ProjectAction.REORDER_CARD_POSITION;
      source: DraggableLocation;
      destination: DraggableLocation;
      cardId: string;
    }
  | { type: ProjectAction.ADD_CARD; listId: string; content: string }
  | { type: ProjectAction.UPDATE_CARD; listId: string; cardId: string; content: string }
  | { type: ProjectAction.ADD_LIST; listTitle: string }
  | { type: ProjectAction.DELETE_CARD; listId: string; cardId: string }
  | { type: ProjectAction.DELETE_LIST; listId: string }
  | { type: ProjectAction.UPDATE_LIST_TITLE; listId: string; listTitle: string };

export const ProjectProvider: React.FC<Props> = ({ children }) => {
  function reducer(state: BoardData, action: ProjectActionType) {
    switch (action.type) {
      case ProjectAction.REORDER_LIST_POSITION:
        return reorderListPosition(state, action.initialPosition, action.finalPosition);
      case ProjectAction.REORDER_CARD_POSITION:
        return reorderCardPosition(state, action.source, action.destination, action.cardId);
      case ProjectAction.ADD_CARD:
        return addCard(state, action.listId, action.content);
      case ProjectAction.UPDATE_CARD:
        return updateCard(state, action.listId, action.cardId, action.content);
      case ProjectAction.ADD_LIST:
        return addList(state, action.listTitle);
      case ProjectAction.DELETE_LIST:
        return deleteList(state, action.listId);
      case ProjectAction.DELETE_CARD:
        return deleteCard(state, action.listId, action.cardId);
      case ProjectAction.UPDATE_LIST_TITLE:
        return updateListTitle(state, action.listId, action.listTitle);
      default:
        return state;
    }
  }

  const [boardData, dispatch] = useReducer(reducer, INITIAL_CONTEXT_VALUE.boardData);

  return (
    <ProjectContext.Provider value={{ boardData, dispatch }}>{children}</ProjectContext.Provider>
  );
};
