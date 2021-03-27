/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { Subscription } from "rxjs";
import { BoardData } from "../types/types";
import List from "./List";
import AddList from "./AddList";
import { boardDataSubject, reorderListPosition, reorderCardPosition } from "../state/boardData";

const BoardContainer = styled.div`
  white-space: nowrap;
  overflow-x: auto;
  height: 100%;
  display: flex;
`;

const onDragEnd = (result: DropResult): void => {
  // dropped nowhere
  if (!result.destination) {
    return;
  }
  const { source } = result;
  const { destination } = result;
  // did not move anywhere - can bail early
  if (source.droppableId === destination.droppableId && source.index === destination.index) {
    return;
  }

  if (result.type === "COLUMN") {
    reorderListPosition(source.index, destination.index);
    return;
  }

  reorderCardPosition(source, destination, result.draggableId);
};

const sortFn = (data: BoardData) => (a: string, b: string) => data[a].position - data[b].position;

const Board = () => {
  const [boardData, setBoardData] = useState<BoardData>();
  useEffect(() => {
    const sub: Subscription = boardDataSubject.subscribe((bd) => setBoardData(bd));
    return () => sub.unsubscribe();
  }, []);

  if (!boardData) {
    return <div>loading</div>;
  }

  const onBeforeDragStart = () => {
    if (
      document.activeElement?.tagName.toUpperCase() === "TEXTAREA" &&
      document.activeElement instanceof HTMLElement
    ) {
      document.activeElement.blur();
    }
  };

  const listIds: string[] = Object.keys(boardData).sort(sortFn(boardData));

  return (
    <DragDropContext onBeforeDragStart={onBeforeDragStart} onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type="COLUMN" direction="horizontal">
        {(provided) => (
          <BoardContainer ref={provided.innerRef} {...provided.droppableProps}>
            {listIds.map((id) => (
              <List key={id} listId={id} listData={boardData[id]} />
            ))}
            {provided.placeholder}
            <AddList />
          </BoardContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default Board;
