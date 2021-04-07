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
  padding-top: 16px;
  padding-bottom: 10px;
  padding-right: 16px;
  padding-left: 16px;
  /* padding-right: 36px; */
`;

interface CardDraggableProps {
  readonly editMode: boolean;
}

const CardDraggable = styled.div<CardDraggableProps>`
  background-color: #fff;
  border-radius: 4px;
  box-shadow: ${(props) => (props.editMode ? "none" : "0px 2px 0px rgba(0, 0, 0, 0.2)")};
  margin-bottom: 8px;
  position: relative;
  &:hover ${Delete} {
    visibility: visible;
  }
`;

type CardProps = {
  listId: string;
  cardId: string;
  cardData: CardType;
};
const Card = ({ listId, cardId, cardData }: CardProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const { dispatch } = useContext(ProjectContext);

  const onSave = (content: string) => {
    dispatch({ type: ProjectAction.UPDATE_CARD, listId, cardId, content });
    setEditMode(false);
  };

  const contentClick = () => {
    setEditMode(true);
  };

  const deleteClick = () => {
    dispatch({ type: ProjectAction.DELETE_CARD, listId, cardId });
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
              isTitle={false}
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
