/* eslint-disable import/prefer-default-export */
import { ProjectData } from "../../types/types";

export const createSprint = ({
  projectData,
  id,
  goal,
  startDate,
  endDate,
}: {
  projectData: ProjectData;
  id: string;
  goal: string;
  startDate: Date;
  endDate: Date;
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
      },
    },
  };
  return newProjectData;
};
