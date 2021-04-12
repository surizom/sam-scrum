import React, { createContext, ReactNode, useReducer } from "react";
import { DraggableLocation } from "react-beautiful-dnd";
import { ProductData } from "../types/types";
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
import { INITIAL_PRODUCT_DATA, ProductAction } from "./constants";

interface Props {
  children?: ReactNode;
}

interface ProductContextProps {
  productData: ProductData;
  dispatch: React.Dispatch<ProductActionType>;
}

export const INITIAL_CONTEXT_VALUE: ProductContextProps = {
  productData: INITIAL_PRODUCT_DATA,
  dispatch: () => null,
};

export const ProductContext = createContext<ProductContextProps>(INITIAL_CONTEXT_VALUE);

export type ProductActionType =
  | {
      type: ProductAction.REORDER_ITEM_POSITION;
      source: DraggableLocation;
      destination: DraggableLocation;
      itemId: string;
    }
  | { type: ProductAction.ADD_ITEM; sprintId?: string; listId: string; content: string }
  | {
      type: ProductAction.UPDATE_ITEM;
      sprintId?: string;
      listId: string;
      itemId: string;
      content: string;
    }
  | { type: ProductAction.ADD_LIST; sprintId: string; listTitle: string }
  | { type: ProductAction.DELETE_ITEM; sprintId?: string; listId: string; itemId: string }
  | { type: ProductAction.DELETE_LIST; sprintId: string; listId: string }
  | { type: ProductAction.UPDATE_LIST_TITLE; sprintId: string; listId: string; listTitle: string }
  | {
      type: ProductAction.CREATE_SPRINT;
      sprintId: string;
      goal: string;
      startDate: Date;
      endDate: Date;
    };

export const ProductProvider: React.FC<Props> = ({ children }) => {
  function reducer(state: ProductData, action: ProductActionType) {
    switch (action.type) {
      case ProductAction.REORDER_ITEM_POSITION:
        return reorderItemPosition(state, action.source, action.destination, action.itemId);
      case ProductAction.ADD_ITEM:
        return addItem({
          productData: state,
          sprintId: action.sprintId,
          listId: action.listId,
          content: action.content,
        });
      case ProductAction.UPDATE_ITEM:
        return updateItem({
          productData: state,
          sprintId: action.sprintId,
          listId: action.listId,
          itemId: action.itemId,
          content: action.content,
        });
      case ProductAction.ADD_LIST:
        return addList(state, action.sprintId, action.listTitle);
      case ProductAction.DELETE_LIST:
        return deleteList(state, action.sprintId, action.listId);
      case ProductAction.DELETE_ITEM:
        return deleteItem({
          productData: state,
          sprintId: action.sprintId,
          listId: action.listId,
          itemId: action.itemId,
        });
      case ProductAction.UPDATE_LIST_TITLE:
        return updateListTitle(state, action.sprintId, action.listId, action.listTitle);
      case ProductAction.CREATE_SPRINT:
        return createSprint({
          productData: state,
          id: action.sprintId,
          goal: action.goal,
          startDate: action.startDate,
          endDate: action.endDate,
          isOpen: true,
        });
      default:
        return state;
    }
  }

  const [productData, dispatch] = useReducer(reducer, INITIAL_CONTEXT_VALUE.productData);

  return (
    <ProductContext.Provider value={{ productData, dispatch }}>{children}</ProductContext.Provider>
  );
};
