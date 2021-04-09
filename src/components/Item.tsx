/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { Item as ItemType } from "../types/types";
import AutoSizeTextArea from "./AutoSizeTextArea";
import { ProjectContext } from "../state/projectContext";
import { ProjectAction } from "../state/constants";

const Delete = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  font-family: trellicons;
  border-radius: 3px;
  height: 23px;
  width: 23px;
  line-height: 23px;
  text-align: center;
  &:hover {
    background-color: rgba(9, 30, 66, 0.08);
  }
  visibility: hidden;
  cursor: pointer;
`;

const TextAreaWrapper = styled.div`
  padding-top: 6px;
  padding-bottom: 2px;
  /* padding-right: 36px; */
`;

interface ItemDraggableProps {
  readonly editMode: boolean;
}

const ItemDraggable = styled.div<ItemDraggableProps>`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: ${(props) => (props.editMode ? "none" : "0 2px 4px rgba(2, 2, 2, 0.6)")};
  margin-bottom: 8px;
  position: relative;
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

  const { dispatch } = useContext(ProjectContext);

  const onSave = (content: string) => {
    dispatch({ type: ProjectAction.UPDATE_ITEM, sprintId, listId, itemId, content });
    setEditMode(false);
  };

  const contentClick = () => {
    setEditMode(true);
  };

  const deleteClick = () => {
    dispatch({ type: ProjectAction.DELETE_ITEM, sprintId, listId, itemId });
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
