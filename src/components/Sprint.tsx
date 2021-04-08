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
  const { boardData } = useContext(ProjectContext);

  const sortFn = (data: Columns) => (a: string, b: string) => data[a].position - data[b].position;

  const listIds: string[] = Object.keys(boardData.sprints[sprintId].data).sort(
    sortFn(boardData.sprints[sprintId].data)
  );
  return (
    <>
      {listIds.map((listId) => (
        <List
          key={listId}
          sprintId={sprintId}
          listId={listId}
          listData={boardData.sprints[sprintId].data[listId]}
        />
      ))}
      <AddList sprintId={sprintId} />
    </>
  );
};
export default Sprint;
