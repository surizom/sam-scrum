/* eslint-disable react/jsx-props-no-spreading */
import React, { Dispatch, useContext } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import AddList from "./AddList";
import { ProjectActionType, ProjectContext } from "../state/projectContext";
import { ProjectAction } from "../state/constants";
import Sprint from "./Sprint";

const BoardContainer = styled.div`
  white-space: nowrap;
  overflow-x: auto;
  height: 100%;
  display: flex;
  flex-direction: row;
  margin: 16px;
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

  return (
    <DragDropContext onBeforeDragStart={onBeforeDragStart} onDragEnd={onDragEnd(dispatch)}>
      <Droppable droppableId="board" type="COLUMN" direction="horizontal">
        {(provided) => (
          <BoardContainer ref={provided.innerRef} {...provided.droppableProps}>
            {boardData.sprints.map((sprint, index) => (
              <Sprint index={index} sprint={sprint} />
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
