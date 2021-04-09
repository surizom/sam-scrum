/* eslint-disable react/jsx-props-no-spreading */
import React, { Dispatch, useContext } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { ProjectActionType, ProjectContext } from "../state/projectContext";
import { ProjectAction } from "../state/constants";
import ProductBackLogColumn from "./ProductBacklogColumn";
import Sprint from "./Sprint";

const ProjectContainer = styled.div`
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
    // For now, we can't move columns
    // dispatch({
    //   type: ProjectAction.REORDER_LIST_POSITION,
    //   initialPosition: source.index,
    //   finalPosition: destination.index,
    // });
    return;
  }

  dispatch({
    type: ProjectAction.REORDER_CARD_POSITION,
    source,
    destination,
    itemId: result.draggableId,
  });
};

const Project = () => {
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

  const sprintIds: string[] = Object.keys(boardData.sprints);
  const backlogIds: string[] = Object.keys(boardData.backlog);

  return (
    <DragDropContext onBeforeDragStart={onBeforeDragStart} onDragEnd={onDragEnd(dispatch)}>
      <Droppable droppableId="board" type="COLUMN" direction="horizontal">
        {(provided) => (
          <ProjectContainer ref={provided.innerRef} {...provided.droppableProps}>
            {backlogIds.map((backlogId) => (
              <ProductBackLogColumn
                key={backlogId}
                listId={backlogId}
                listData={boardData.backlog[backlogId]}
              />
            ))}

            {sprintIds.map((sprintId) => (
              <Sprint sprintId={sprintId} />
            ))}
            {provided.placeholder}
          </ProjectContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default Project;
