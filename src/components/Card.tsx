/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { Card as CardType } from "../types/types";
import AutoSizeTextArea from "./AutoSizeTextArea";
import { ProjectContext } from "../state/projectContext";
import { ProjectAction } from "../state/constants";

// TODO refactor so code shared title and content

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

interface CardDraggableProps {
  readonly editMode: boolean;
}

const CardDraggable = styled.div<CardDraggableProps>`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: ${(props) => (props.editMode ? "none" : "0 2px 4px rgba(2, 2, 2, 0.6)")};
  margin-bottom: 8px;
  position: relative;
  &:hover ${Delete} {
    visibility: visible;
  }
`;

type CardProps = {
  sprintId?: string;
  listId: string;
  cardId: string;
  cardData: CardType;
};
const Card = ({ listId, cardId, cardData, sprintId }: CardProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const { dispatch } = useContext(ProjectContext);

  const onSave = (content: string) => {
    dispatch({ type: ProjectAction.UPDATE_CARD, sprintId, listId, cardId, content });
    setEditMode(false);
  };

  const contentClick = () => {
    setEditMode(true);
  };

  const deleteClick = () => {
    dispatch({ type: ProjectAction.DELETE_CARD, sprintId, listId, cardId });
  };

  return (
    <Draggable
      draggableId={cardId}
      index={cardData.position}
      disableInteractiveElementBlocking={!editMode}
    >
      {(draggableProvided) => (
        <CardDraggable
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          editMode={editMode}
        >
          <TextAreaWrapper onClick={contentClick}>
            <AutoSizeTextArea
              placeholder=""
              onSave={onSave}
              updateValue={cardData.card_content}
              // should i cancel???
              onBlur={onSave}
              editMode={editMode}
            />
          </TextAreaWrapper>

          <Delete onClick={deleteClick}>&#xE918;</Delete>
        </CardDraggable>
      )}
    </Draggable>
  );
};
export default Card;
