import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ProjectAction } from "../state/constants";
import { ProjectContext } from "../state/projectContext";
import AutoSizeTextArea from "./AutoSizeTextArea";

const Button = styled.div`
  cursor: pointer;
  padding: 8px;
  &:hover span:last-child {
    text-decoration: underline;
  }
  &:hover {
    background-color: rgba(9, 30, 66, 0.08);
  }
`;

const Wrapper = styled.div`
  padding: 8px;
`;

type AddItemProps = {
  sprintId?: string;
  listId: string;
};

const AddItem = ({ listId, sprintId }: AddItemProps) => {
  const [compose, setCompose] = useState<boolean>(false);

  const { dispatch } = useContext(ProjectContext);

  if (!compose) {
    return (
      <Button onClick={() => setCompose(true)}>
        <span className="trellicons">&#xE901;</span> <span>Add another item</span>
      </Button>
    );
  }

  const onSave = (content: string) => {
    dispatch({ type: ProjectAction.ADD_ITEM, sprintId, listId, content });
    setCompose(false);
  };

  const cancel = () => {
    setCompose(false);
  };

  return (
    <Wrapper>
      <AutoSizeTextArea
        onSave={onSave}
        updateValue=""
        onBlur={cancel}
        editMode
        placeholder="Enter a title for this item…"
      />
    </Wrapper>
  );
};
export default AddItem;
