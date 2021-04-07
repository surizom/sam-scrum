/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { Sprint as SprintType, SprintData } from "../types/types";
import List from "./List";
import AddList from "./AddList";

const SprintContainer = styled.div`
  background: rgba(255, 255, 255, 0.87);
  border-radius: 15px;
`;
const SprintTitle = styled.div`
  font-size: 48px;
  font-weight: 500;
`;
const SprintGoals = styled.div``;

const BoardContainer = styled.div`
  white-space: nowrap;
  overflow-x: auto;
  height: 100%;
  display: flex;
  margin: 16px;
`;

const sortFn = (data: SprintData) => (a: string, b: string) => data[a].position - data[b].position;

type Props = {
  index: number;
  sprint: SprintType;
};

const Sprint: React.FC<Props> = ({ index, sprint }) => {
  if (!sprint) {
    return <div>loading</div>;
  }

  const listIds: string[] = Object.keys(sprint.data).sort(sortFn(sprint.data));

  return (
    <Droppable droppableId={`sprint-${index}`} type="SPRINT" direction="horizontal">
      {(provided) => (
        <SprintContainer>
          <SprintTitle>{`Sprint ${index + 1}}`}</SprintTitle>
          <SprintGoals>{sprint.goals}</SprintGoals>
          <BoardContainer ref={provided.innerRef} {...provided.droppableProps}>
            {listIds.map((id) => (
              <List key={id} listId={id} listData={sprint.data[id]} />
            ))}
            {provided.placeholder}
            <AddList />
          </BoardContainer>
        </SprintContainer>
      )}
    </Droppable>
  );
};
export default Sprint;
