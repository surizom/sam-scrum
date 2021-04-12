/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Column, Items } from "../types/types";
import AddItem from "./AddItem";
import Item from "./Item";
import ListTitle from "./ListTitle";

const ListWrapper = styled.div`
  position: relative;
  width: 270px;
  margin: 0 8px;
  background-color: #e3e4e6;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding-top: 8px;
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 2px;
`;

const ListDroppable = styled.div`
  min-height: 50px;
`;

const sortFn = (data: Items) => (a: string, b: string) => data[a].position - data[b].position;

type ListProps = {
  listId: string;
  listData: Column;
  sprintId?: string;
};

const List = ({ listId, listData, sprintId }: ListProps) => {
  const itemIds: string[] = Object.keys(listData.items).sort(sortFn(listData.items));

  return (
    <ListWrapper>
      <ListTitle sprintId={sprintId} listId={listId} title={listData.list_title} />

      <Droppable droppableId={listId}>
        {(droppableProvided) => (
          <ListDroppable ref={droppableProvided.innerRef}>
            {itemIds.map((id) => (
              <Item
                key={id}
                sprintId={sprintId}
                itemId={id}
                listId={listId}
                itemData={listData.items[id]}
              />
            ))}
            {droppableProvided.placeholder}
          </ListDroppable>
        )}
      </Droppable>
      {!sprintId ? <AddItem sprintId={sprintId} listId={listId} /> : null}
    </ListWrapper>
  );
};
export default List;
