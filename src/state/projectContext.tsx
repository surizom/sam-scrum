import React, { createContext, ReactNode, useReducer } from "react";
import { DraggableLocation } from "react-beautiful-dnd";
import { ProjectData } from "../types/types";
import {
  addItem,
  addList,
  createSprint,
  deleteItem,
  deleteList,
  reorderItemPosition,
  updateItem,
  updateListTitle,
} from "./reducers/boardDataReducers";
import { INITIAL_PROJECT_DATA, ProjectAction } from "./constants";

interface Props {
  children?: ReactNode;
}

interface ProjectContextProps {
  projectData: ProjectData;
  dispatch: React.Dispatch<ProjectActionType>;
}

export const INITIAL_CONTEXT_VALUE: ProjectContextProps = {
  projectData: INITIAL_PROJECT_DATA,
  dispatch: () => null,
};

export const ProjectContext = createContext<ProjectContextProps>(INITIAL_CONTEXT_VALUE);

export type ProjectActionType =
  | {
      type: ProjectAction.REORDER_ITEM_POSITION;
      source: DraggableLocation;
      destination: DraggableLocation;
      itemId: string;
    }
  | { type: ProjectAction.ADD_ITEM; sprintId?: string; listId: string; content: string }
  | {
      type: ProjectAction.UPDATE_ITEM;
      sprintId?: string;
      listId: string;
      itemId: string;
      content: string;
    }
  | { type: ProjectAction.ADD_LIST; sprintId: string; listTitle: string }
  | { type: ProjectAction.DELETE_ITEM; sprintId?: string; listId: string; itemId: string }
  | { type: ProjectAction.DELETE_LIST; sprintId: string; listId: string }
  | { type: ProjectAction.UPDATE_LIST_TITLE; sprintId: string; listId: string; listTitle: string }
  | {
      type: ProjectAction.CREATE_SPRINT;
      sprintId: string;
      goal: string;
      startDate: Date;
      endDate: Date;
    };

export const ProjectProvider: React.FC<Props> = ({ children }) => {
  function reducer(state: ProjectData, action: ProjectActionType) {
    switch (action.type) {
      case ProjectAction.REORDER_ITEM_POSITION:
        return reorderItemPosition(state, action.source, action.destination, action.itemId);
      case ProjectAction.ADD_ITEM:
        return addItem({
          projectData: state,
          sprintId: action.sprintId,
          listId: action.listId,
          content: action.content,
        });
      case ProjectAction.UPDATE_ITEM:
        return updateItem({
          projectData: state,
          sprintId: action.sprintId,
          listId: action.listId,
          itemId: action.itemId,
          content: action.content,
        });
      case ProjectAction.ADD_LIST:
        return addList(state, action.sprintId, action.listTitle);
      case ProjectAction.DELETE_LIST:
        return deleteList(state, action.sprintId, action.listId);
      case ProjectAction.DELETE_ITEM:
        return deleteItem({
          projectData: state,
          sprintId: action.sprintId,
          listId: action.listId,
          itemId: action.itemId,
        });
      case ProjectAction.UPDATE_LIST_TITLE:
        return updateListTitle(state, action.sprintId, action.listId, action.listTitle);
      case ProjectAction.CREATE_SPRINT:
        return createSprint({
          projectData: state,
          id: action.sprintId,
          goal: action.goal,
          startDate: action.startDate,
          endDate: action.endDate,
        });
      default:
        return state;
    }
  }

  const [projectData, dispatch] = useReducer(reducer, INITIAL_CONTEXT_VALUE.projectData);

  return (
    <ProjectContext.Provider value={{ projectData, dispatch }}>{children}</ProjectContext.Provider>
  );
};
