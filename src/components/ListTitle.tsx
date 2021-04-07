/* eslint-disable react/jsx-props-no-spreading */
import React, { HTMLAttributes, useContext, useState } from "react";
import styled from "styled-components";
import AutoSizeTextArea from "./AutoSizeTextArea";
import { ProjectAction } from "../state/constants";
import { ProjectContext } from "../state/projectContext";

const Delete = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  font-family: trellicons;
  border-radius: 3px;
  height: 32px;
  width: 32px;
  line-height: 32px;
  text-align: center;
  &:hover {
    background-color: rgba(9, 30, 66, 0.08);
  }
  visibility: hidden;
`;

const Container = styled.div`
  position: relative;
  && {
    justify-content: center;
    cursor: pointer;
  }
  &:hover ${Delete} {
    visibility: visible;
  }
`;

const TextAreaWrapper = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 30px;

  padding-top: 16px;
  padding-left: 12px;
  padding-right: 12px;
  padding-bottom: 12px;

  & textarea {
    font-weight: 700;
  }
`;

// Repeat my editcard form logic, stuff abstracting to DRY

type ListTileProps = {
  setDragBlocking: (dragBlocking: boolean) => void;
  dragHandleProps: HTMLAttributes<HTMLDivElement> | undefined;
  listId: string;
  title: string;
};

const ListTitle = ({ setDragBlocking, dragHandleProps, listId, title }: ListTileProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [updateValue, setUpdateValue] = useState<string>(title);

  const { dispatch } = useContext(ProjectContext);

  const onSave = (_title: string) => {
    if (_title.trim() === "") {
      // this is hack, prevent user accidently deleting title
      setUpdateValue("");
      setTimeout(() => setUpdateValue(title), 0);
    } else {
      dispatch({ type: ProjectAction.UPDATE_LIST_TITLE, listId, listTitle: _title });
    }

    setDragBlocking(false);
    setEditMode(false);
  };

  const titleClick = () => {
    setDragBlocking(true);
    setEditMode(true);
  };

  const deleteClick = () => {
    dispatch({ type: ProjectAction.DELETE_LIST, listId });
  };

  return (
    <Container {...dragHandleProps}>
      <TextAreaWrapper onClick={titleClick}>
        <AutoSizeTextArea
          isTitle
          placeholder=""
          onSave={onSave}
          updateValue={updateValue}
          onBlur={onSave}
          editMode={editMode}
        />
      </TextAreaWrapper>

      <Delete onClick={deleteClick}>&#xE918;</Delete>
    </Container>
  );
};
export default ListTitle;
