/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import styled from "styled-components";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Item from "./Item";
import AddItem from "./AddItem";
import ListTitle from "./ListTitle";
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

const sortFn = (data: Cards) => (a: string, b: string) => data[a].position - data[b].position;

type ListProps = {
  listId: string;
  listData: Column;
  sprintId: string;
};

const List = ({ listId, listData, sprintId }: ListProps) => {
  const cardIds: string[] = Object.keys(listData.cards).sort(sortFn(listData.cards));

  const [dragBlocking, setDragBlocking] = useState<boolean>(false);

  return (
    <Draggable
      disableInteractiveElementBlocking={!dragBlocking}
      draggableId={listId}
      index={listData.position}
    >
      {(provided) => (
        <ListWrapper ref={provided.innerRef} {...provided.draggableProps}>
          <ListContent>
            <ListTitle
              sprintId={sprintId}
              dragHandleProps={provided.dragHandleProps}
              listId={listId}
              title={listData.list_title}
              setDragBlocking={setDragBlocking}
            />

            <Droppable droppableId={listId}>
              {(droppableProvided) => (
                <ListDroppable ref={droppableProvided.innerRef}>
                  {cardIds.map((id) => (
                    <Item
                      key={id}
                      sprintId={sprintId}
                      itemId={id}
                      listId={listId}
                      itemData={listData.cards[id]}
                    />
                  ))}
                  {droppableProvided.placeholder}
                </ListDroppable>
              )}
            </Droppable>
            <AddItem sprintId={sprintId} listId={listId} />
          </ListContent>
        </ListWrapper>
      )}
    </Draggable>
  );
};
export default List;
