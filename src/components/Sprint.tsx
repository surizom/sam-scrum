/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from "react";
import styled from "styled-components";
import dayjs from "dayjs";

import { ProductContext } from "../state/productContext";
import { ProductAction } from "../state/constants";
import { Columns } from "../types/types";
import List from "./List";

const SprintWrapper = styled.div<{ isOpen: boolean }>`
  background-color: ${(props) =>
    props.isOpen ? "rgba(255, 255, 255, 0.87)" : "rgba(255, 255, 255, 0.4)"};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  margin: 8px;
`;

const SprintHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  justify-content: space-between;
`;

const SprintHeaderSide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SprintTitle = styled.div`
  font-size: 36px;
  font-weight: 600;
  margin-right: 32px;
`;

const SprintSubtitle = styled.div`
  padding-left: 16px;
  padding-bottom: 16px;
`;

const ListsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
`;

const DeleteSprintButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  padding: 8px;
  background-color: #c24e4e;
  border-radius: 4px;
  border: none;
  color: white;
  outline: 0;
  margin-right: 16px;
`;

const EndSprintButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  padding: 8px;
  background-color: #4e97c2;
  border-radius: 4px;
  border: none;
  color: white;
  outline: 0;
`;

type SprintProps = {
  sprintId: string;
};
const Sprint = ({ sprintId }: SprintProps) => {
  const { productData, dispatch } = useContext(ProductContext);
  const sprint = productData.sprints[sprintId];

  const sortFn = (data: Columns) => (a: string, b: string) => data[a].position - data[b].position;

  const listIds: string[] = Object.keys(productData.sprints[sprintId].data).sort(
    sortFn(productData.sprints[sprintId].data)
  );

  const getDiffDays = (): number => {
    const endDate = dayjs(sprint.endDate);
    const startDate = dayjs(sprint.startDate);

    return endDate.diff(startDate, "day");
  };

  const { isOpen } = sprint;

  const prefix = isOpen ? "" : "[ENDED] ";

  return (
    <SprintWrapper isOpen={isOpen}>
      <SprintHeader>
        <SprintHeaderSide>
          <SprintTitle>
            {prefix} Sprint {sprint.position + 1}
          </SprintTitle>
          {sprint.isOpen && (
            <span>
              {getDiffDays()} days - {sprint.startDate.toDateString()} -{" "}
              {sprint.endDate.toDateString()}
            </span>
          )}
        </SprintHeaderSide>
        <SprintHeaderSide>
          <DeleteSprintButton
            onClick={() => dispatch({ type: ProductAction.DELETE_SPRINT, sprintId })}
          >
            Delete Sprint
          </DeleteSprintButton>

          {sprint.isOpen && (
            <EndSprintButton onClick={() => dispatch({ type: ProductAction.END_SPRINT, sprintId })}>
              End Sprint
            </EndSprintButton>
          )}
        </SprintHeaderSide>
      </SprintHeader>
      <SprintSubtitle>{sprint.goal}</SprintSubtitle>
      <ListsWrapper>
        {listIds.map((listId) => (
          <List
            key={listId}
            sprintId={sprintId}
            listId={listId}
            listData={productData.sprints[sprintId].data[listId]}
          />
        ))}
      </ListsWrapper>
    </SprintWrapper>
  );
};
export default Sprint;
