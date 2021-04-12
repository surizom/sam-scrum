/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { Item as ItemType } from "../types/types";
import AutoSizeTextArea from "./AutoSizeTextArea";
import { ProductContext } from "../state/productContext";
import { ProductAction } from "../state/constants";

const Delete = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 16px;
  line-height: 23px;
  font-family: trellicons;
  border-radius: 3px;
  height: 23px;
  width: 23px;
  text-align: center;
  &:hover {
    background-color: rgba(9, 30, 66, 0.08);
  }
  visibility: hidden;
  cursor: pointer;
`;

const TextAreaWrapper = styled.div`
  width: 100%;
`;

interface ItemDraggableProps {
  readonly editMode: boolean;
}

const ItemDraggable = styled.div<ItemDraggableProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 12px;
  padding-bottom: 8px;
  padding-left: 14px;
  padding-right: 14px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: ${(props) => (props.editMode ? "none" : "0px 2px 0px rgba(0, 0, 0, 0.2)")};
  margin-bottom: 8px;
  &:hover ${Delete} {
    visibility: visible;
  }
`;

type ItemProps = {
  sprintId?: string;
  listId: string;
  itemId: string;
  itemData: ItemType;
};
const Item = ({ listId, itemId, itemData, sprintId }: ItemProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const { dispatch } = useContext(ProductContext);

  const onSave = (content: string) => {
    dispatch({ type: ProductAction.UPDATE_ITEM, sprintId, listId, itemId, content });
    setEditMode(false);
  };

  const contentClick = () => {
    setEditMode(true);
  };

  const deleteClick = () => {
    dispatch({ type: ProductAction.DELETE_ITEM, sprintId, listId, itemId });
  };

  return (
    <Draggable
      draggableId={itemId}
      index={itemData.position}
      disableInteractiveElementBlocking={!editMode}
    >
      {(draggableProvided) => (
        <ItemDraggable
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          editMode={editMode}
        >
          <TextAreaWrapper onClick={contentClick}>
            <AutoSizeTextArea
              isTitle={false}
              placeholder=""
              onSave={onSave}
              updateValue={itemData.item_content}
              // should i cancel???
              onBlur={onSave}
              editMode={editMode}
            />
          </TextAreaWrapper>

          <Delete onClick={deleteClick}>&#xE918;</Delete>
        </ItemDraggable>
      )}
    </Draggable>
  );
};
export default Item;
