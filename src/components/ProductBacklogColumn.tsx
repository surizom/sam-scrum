/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import styled from "styled-components";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Card from "./Card";
import AddCard from "./AddCard";
import { Column, Cards } from "../types/types";

const ListWrapper = styled.div`
  &:first-child {
    margin-left: 8px;
  }
  width: 272px;
  display: inline-block;
  flex: 0 0 272px;
  margin: 0 4px;
`;
const ListContent = styled.div`
  background-color: #ebecf0;
  border-radius: 3px;
`;

const ListDroppable = styled.div`
  min-height: 50px;
  margin: 0 4px;
  padding: 0 4px;
`;

const TextAreaWrapper = styled.div`
  padding: 10px 8px;
  padding-right: 36px;

  & textarea {
    font-weight: 600;
  }
`;

const sortFn = (data: Cards) => (a: string, b: string) => data[a].position - data[b].position;

type ProductBackLogColumnProps = {
  listId: string;
  listData: Column;
};

const ProductBackLogColumn = ({ listId, listData }: ProductBackLogColumnProps) => {
  const cardIds: string[] = Object.keys(listData.cards).sort(sortFn(listData.cards));

  return (
    <Draggable draggableId={listId} index={listData.position}>
      {(provided) => (
        <ListWrapper ref={provided.innerRef} {...provided.draggableProps}>
          <ListContent>
            <TextAreaWrapper>Product backlog</TextAreaWrapper>

            <Droppable droppableId={listId}>
              {(droppableProvided) => (
                <ListDroppable ref={droppableProvided.innerRef}>
                  {cardIds.map((id) => (
                    <Card key={id} cardId={id} listId={listId} cardData={listData.cards[id]} />
                  ))}
                  {droppableProvided.placeholder}
                </ListDroppable>
              )}
            </Droppable>
            <AddCard listId={listId} />
          </ListContent>
        </ListWrapper>
      )}
    </Draggable>
  );
};
export default ProductBackLogColumn;
