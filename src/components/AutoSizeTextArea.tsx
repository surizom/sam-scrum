import React, { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from "react";
import styled from "styled-components";

interface TextAreaProps {
  readonly editMode: boolean;
  readonly isTitle: boolean;
}
const TextArea = styled.textarea<TextAreaProps>`
  cursor: ${(props) => (props.editMode ? "text" : "pointer")};
  height: auto;
  width: 100%;
  overflow-y: hidden;
  border: none;
  resize: none;
  border-radius: 4px;
  width: 100%;
  padding: 0;
  font-weight: ${(props) => (props.isTitle ? "600" : "400")};
  text-align: ${(props) => (props.isTitle ? "center" : "start")};
  font-size: ${(props) => (props.isTitle ? "22px" : "unset")};
  color: ${(props) => (props.isTitle ? "#40506C" : "unset")};
  background: transparent;
`;

type AutoSizeTextAreaProps = {
  placeholder: string;
  editMode: boolean;
  onSave: (value: string) => void;
  updateValue: string;
  onBlur: (text: string) => void;
  isTitle: boolean;
};
const AutoSizeTextArea = ({
  placeholder,
  editMode,
  onSave,
  updateValue,
  onBlur,
  isTitle,
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
      isTitle={isTitle}
      ref={textAreaRef}
      value={textAreaValue}
      onChange={onChange}
      rows={1}
      onKeyDown={onKeyDown}
      onBlur={() => onBlur(textAreaValue)}
      spellCheck="false"
      editMode={editMode}
      placeholder={placeholder}
    />
  );
};
export default AutoSizeTextArea;
