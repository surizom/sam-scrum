import React, { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from "react";
import styled from "styled-components";

interface TextAreaProps {
  readonly editMode: boolean;
  readonly isTitle: boolean;
}
const TextArea = styled.textarea<TextAreaProps>`
  cursor: ${(props) => (props.editMode ? "text" : "pointer")};
  text-align: ${(props) => (props.isTitle ? "center" : "start")};
  color: ${(props) => (props.isTitle ? "#40506C" : "black")};
  font-size: ${(props) => (props.isTitle ? "30px" : "inherit")};
  overflow-y: hidden;
  border: none;
  resize: none;
  border-radius: 3px;
  width: 100%;
  background: transparent;
  &:focus {
    background: white;
    box-shadow: inset 0 0 0 2px #0079bf;
    outline: 0;
  }
`;

type AutoSizeTextAreaProps = {
  isTitle: boolean;
  placeholder: string;
  editMode: boolean;
  onSave: (value: string) => void;
  updateValue: string;
  onBlur: (text: string) => void;
};
const AutoSizeTextArea = ({
  isTitle,
  placeholder,
  editMode,
  onSave,
  updateValue,
  onBlur,
}: AutoSizeTextAreaProps) => {
  const [textAreaValue, setTextAreaValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };
  useEffect(() => {
    setTextAreaValue(updateValue);
  }, [updateValue]);
  useEffect(() => {
    resizeTextArea();
  }, [textAreaValue]);

  useEffect(() => {
    if (editMode && textAreaRef.current) {
      textAreaRef.current.focus();
      textAreaRef.current.select();
    }
  }, [editMode]);
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.target.value);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // enter pressed
    if (e.keyCode === 13 && textAreaRef.current) {
      e.preventDefault();
      onSave(textAreaValue);
      textAreaRef.current.blur();
    }
  };
  return (
    <TextArea
      ref={textAreaRef}
      value={textAreaValue}
      onChange={onChange}
      rows={1}
      onKeyDown={onKeyDown}
      onBlur={() => onBlur(textAreaValue)}
      spellCheck="false"
      editMode={editMode}
      placeholder={placeholder}
      isTitle={isTitle}
    />
  );
};
export default AutoSizeTextArea;
