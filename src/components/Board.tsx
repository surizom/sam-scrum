/* eslint-disable react/jsx-props-no-spreading */
import React, { Dispatch, useContext } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { BoardData } from "../types/types";
import List from "./List";
import AddList from "./AddList";
import { ProjectActionType, ProjectContext } from "../state/projectContext";
import { ProjectAction } from "../state/constants";

const BoardContainer = styled.div`
  white-space: nowrap;
  overflow-x: auto;
  height: 100%;
  display: flex;
`;

const onDragEnd = (dispatch: Dispatch<ProjectActionType>) => (result: DropResult): void => {
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
    dispatch({
      type: ProjectAction.REORDER_LIST_POSITION,
      initialPosition: source.index,
      finalPosition: destination.index,
    });
    return;
  }

  dispatch({
    type: ProjectAction.REORDER_CARD_POSITION,
    source,
    destination,
    cardId: result.draggableId,
  });
};

const sortFn = (data: BoardData) => (a: string, b: string) => data[a].position - data[b].position;

const Board = () => {
  const { boardData, dispatch } = useContext(ProjectContext);

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
    <DragDropContext onBeforeDragStart={onBeforeDragStart} onDragEnd={onDragEnd(dispatch)}>
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
