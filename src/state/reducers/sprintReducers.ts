/* eslint-disable import/prefer-default-export */
import { omit } from "lodash";
import { ProjectData } from "../../types/types";
import { someItemsNotDone } from "./closeSprintUtils";

export const createSprint = ({
  projectData,
  id,
  goal,
  startDate,
  endDate,
  isOpen,
}: {
  projectData: ProjectData;
  id: string;
  goal: string;
  startDate: Date;
  endDate: Date;
  isOpen: boolean;
}) => {
  if (startDate > endDate) {
    throw new Error("End date must be after start date");
  }
  const position = Object.keys(projectData.sprints).length;
  const newProjectData: ProjectData = {
    ...projectData,
    sprints: {
      ...projectData.sprints,
      [id]: {
        data: {},
        goal,
        startDate,
        endDate,
        position,
        isOpen,
      },
    },
  };
  return newProjectData;
};

export const closeSprint = ({ projectData, id }: { projectData: ProjectData; id: string }) => {
  if (someItemsNotDone(projectData.sprints[id])) {
    throw new Error("All items must be in done state in order to close sprint");
  }
  const newProjectData: ProjectData = {
    ...projectData,
    sprints: {
      ...projectData.sprints,
      [id]: {
        ...projectData.sprints[id],
        isOpen: false,
      },
    },
  };
  return newProjectData;
};

export const deleteSprint = ({ projectData, id }: { projectData: ProjectData; id: string }) => {
  const newProjectData: ProjectData = {
    ...projectData,
    sprints: omit(projectData.sprints, [id]),
  };
  return newProjectData;
};
