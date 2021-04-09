/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from "react";
import { ProjectContext } from "../state/projectContext";
import { Columns } from "../types/types";
import AddList from "./AddList";
import List from "./List";

type SprintProps = {
  sprintId: string;
};
const Sprint = ({ sprintId }: SprintProps) => {
  const { projectData } = useContext(ProjectContext);

  const sortFn = (data: Columns) => (a: string, b: string) => data[a].position - data[b].position;

  const listIds: string[] = Object.keys(projectData.sprints[sprintId].data).sort(
    sortFn(projectData.sprints[sprintId].data)
  );
  return (
    <>
      {listIds.map((listId) => (
        <List
          key={listId}
          sprintId={sprintId}
          listId={listId}
          listData={projectData.sprints[sprintId].data[listId]}
        />
      ))}
      <AddList sprintId={sprintId} />
    </>
  );
};
export default Sprint;
