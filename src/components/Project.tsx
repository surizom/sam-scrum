/* eslint-disable react/jsx-props-no-spreading */
import React, { Dispatch, useContext } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { ProjectActionType, ProjectContext } from "../state/projectContext";
import { ProjectAction } from "../state/constants";
import ProductBackLog from "./ProductBacklog";
import Sprint from "./Sprint";
import { Sprints } from "../types/types";

const ProjectContainer = styled.div`
  flex: 1;
  overflow-x: auto;
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

const ProjectHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  padding: 8px;
`;

const ProjectTitle = styled.div`
  font-weight: 700;
  font-size: 30px;
  color: white;
  margin-right: 16px;
`;

const ProjectContent = styled.div`
  flex: 1;
  overflow-x: auto;
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;

const AddSprintButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  background-color: #4e97c2;
  border-radius: 4px;
  border: none;
  color: white;
  outline: 0;
`;

const AddSprintPlusIcon = styled.div`
  color: white;
  font-size: 22px;
  margin-right: 12px;
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
    type: ProjectAction.REORDER_ITEM_POSITION,
    source,
    destination,
    itemId: result.draggableId,
  });
};

const Project = () => {
  const { projectData, dispatch } = useContext(ProjectContext);

  if (!projectData) {
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

  const sortFn = (data: Sprints) => (a: string, b: string) => data[a].position - data[b].position;

  const sprintIds: string[] = Object.keys(projectData.sprints).sort(sortFn(projectData.sprints));
  const backlogIds: string[] = Object.keys(projectData.backlog);

  return (
    <DragDropContext onBeforeDragStart={onBeforeDragStart} onDragEnd={onDragEnd(dispatch)}>
      <Droppable droppableId="board" type="COLUMN" direction="horizontal">
        {(provided) => (
          <ProjectContainer ref={provided.innerRef} {...provided.droppableProps}>
            <ProjectHeader>
              <ProjectTitle>{projectData.project_title}</ProjectTitle>
              <AddSprintButton>
                <AddSprintPlusIcon>+</AddSprintPlusIcon>
                Add Sprint
              </AddSprintButton>
            </ProjectHeader>
            <ProjectContent>
              {backlogIds.map((backlogId) => (
                <ProductBackLog
                  key={backlogId}
                  listId={backlogId}
                  listData={projectData.backlog[backlogId]}
                />
              ))}

              {sprintIds.map((sprintId) => (
                <Sprint key={sprintId} sprintId={sprintId} />
              ))}
              {provided.placeholder}
            </ProjectContent>
          </ProjectContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default Project;
