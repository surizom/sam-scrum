import { v4 as uuidv4 } from "uuid";

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

  const idSprintBacklog = uuidv4();
  const idDoing = uuidv4();
  const idDone = uuidv4();

  const position = Object.keys(projectData.sprints).length;
  const newProjectData: ProjectData = {
    ...projectData,
    sprints: {
      ...projectData.sprints,
      [id]: {
        data: {
          [idSprintBacklog]: {
            items: {},
            list_title: "Sprint Backlog",
            position: 0,
          },
          [idDoing]: {
            items: {},
            list_title: "Doing",
            position: 1,
          },
          [idDone]: {
            items: {},
            list_title: "Done",
            position: 2,
          },
        },
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
