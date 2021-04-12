import React, { ChangeEvent, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

Modal.setAppElement("#root");

const AddSprintTitle = styled.div`
  font-size: 18px;
  margin-bottom: 8px;
`;
const AddSprintFormLabel = styled.div`
  margin: 8px 0;
`;
const AddSprintFormTextArea = styled.textarea`
  width: 100%;
  resize: none;
  padding: 8px;
`;
const AddSprintFormFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 8px 0;
`;
const AddSprintFormButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  background-color: #4e97c2;
  border-radius: 4px;
  border: none;
  color: white;
  outline: 0;
  padding: 8px;
  text-align: end;
`;

type AddSprintModalProps = {
  isOpen: boolean;
  onAddSprint: (goal: string, startDate: Date, endDate: Date) => void;
  onClose: () => void;
};

const AddSprintModal = ({ isOpen, onClose, onAddSprint }: AddSprintModalProps) => {
  const [goalsValue, setGoalsValue] = useState("");
  const [startDateValue, setStartDateValue] = useState("");
  const [endDateValue, setEndDateValue] = useState("");

  const validate = () => {
    const startDateDayjs = dayjs(startDateValue, "DD/MM/YYYY");
    const endDateDayjs = dayjs(endDateValue, "DD/MM/YYYY");

    if (!startDateDayjs.isValid() || !endDateDayjs.isValid()) {
      // eslint-disable-next-line no-alert
      alert("Date formats are wrong");
      return;
    }

    if (startDateDayjs.isAfter(endDateDayjs)) {
      // eslint-disable-next-line no-alert
      alert("Start date cannot be after end date");
      return;
    }
    onAddSprint(goalsValue, startDateDayjs.toDate(), endDateDayjs.toDate());
  };

  return (
    <Modal
      shouldCloseOnOverlayClick
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          width: "500px",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#026aa7",
          color: "white",
          borderRadius: "8px",
          backdropFilter: "grayscale(30%)",
        },
      }}
      contentLabel="New Sprint Modal"
    >
      <AddSprintTitle>New Sprint</AddSprintTitle>
      <AddSprintFormLabel>Goals</AddSprintFormLabel>
      <AddSprintFormTextArea
        rows={3}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setGoalsValue(e.target.value)}
      >
        {goalsValue}
      </AddSprintFormTextArea>
      <AddSprintFormLabel>Start Date</AddSprintFormLabel>
      <AddSprintFormTextArea
        rows={1}
        placeholder="jj/mm/aaaa"
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setStartDateValue(e.target.value)}
      >
        {startDateValue}
      </AddSprintFormTextArea>
      <AddSprintFormLabel>End Date</AddSprintFormLabel>
      <AddSprintFormTextArea
        rows={1}
        placeholder="jj/mm/aaaa"
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setEndDateValue(e.target.value)}
      >
        {endDateValue}
      </AddSprintFormTextArea>
      <AddSprintFormFooter>
        <AddSprintFormButton onClick={validate}>Add Sprint</AddSprintFormButton>
      </AddSprintFormFooter>
    </Modal>
  );
};

export default AddSprintModal;
