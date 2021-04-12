/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from "react";
import styled from "styled-components";
import { ProductAction } from "../state/constants";
import { ProductContext } from "../state/productContext";

const Delete = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  font-family: trellicons;
  font-size: 16px;
  line-height: 32px;
  border-radius: 3px;
  height: 32px;
  width: 32px;
  text-align: center;
  &:hover {
    background-color: rgba(9, 30, 66, 0.08);
  }
  visibility: hidden;
`;

const Container = styled.div`
  && {
    cursor: pointer;
  }
  &:hover ${Delete} {
    visibility: visible;
  }
`;

const TextAreaWrapper = styled.div`
  margin: 4px 0;
  width: 100%;
  overflow-y: hidden;
  border: none;
  resize: none;
  border-radius: 4px;
  width: 100%;
  padding: 0;
  font-weight: 600;
  text-align: center;
  font-size: 22px;
  color: #40506c;
  background: transparent;
`;

type ListTileProps = {
  sprintId?: string;
  listId: string;
  title: string;
};

const ListTitle = ({ sprintId, listId, title }: ListTileProps) => {
  const { dispatch } = useContext(ProductContext);

  const deleteClick =
    sprintId === undefined
      ? () => {}
      : () => {
          dispatch({ type: ProductAction.DELETE_LIST, sprintId, listId });
        };

  return (
    <Container>
      <TextAreaWrapper>{title}</TextAreaWrapper>
      <Delete onClick={deleteClick}>&#xE918;</Delete>
    </Container>
  );
};
export default ListTitle;
