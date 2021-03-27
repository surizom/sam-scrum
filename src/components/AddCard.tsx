import React, { useState } from "react";
import styled from "styled-components";
import { addCard } from "../state/boardData";
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

type AddCardProps = {
  listId: string;
};

const AddCard = ({ listId }: AddCardProps) => {
  const [compose, setCompose] = useState<boolean>(false);

  if (!compose) {
    return (
      <Button onClick={() => setCompose(true)}>
        <span className="trellicons">&#xE901;</span> <span>Add another card</span>
      </Button>
    );
  }

  const onSave = (content: string) => {
    addCard(listId, content);
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
        placeholder="Enter a title for this card…"
      />
    </Wrapper>
  );
};
export default AddCard;
