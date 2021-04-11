import { v4 as uuidv4 } from "uuid";
import { ProjectData } from "../../types/types";
import { INITIAL_PROJECT_DATA } from "../constants";
import { createSprint } from "./sprintReducers";

describe("createSprint", () => {
  test("it should create a sprint if the project is empty", () => {
    const projectData: ProjectData = {
      backlog: {},
      sprints: {},
      project_title: "My project",
    };

    const id = uuidv4();
    const goal = "my goal";
    const startDate = new Date();
    const endDate = new Date();

    const actualResult = createSprint({ projectData, id, goal, startDate, endDate });

    const expectedResult: ProjectData = {
      ...projectData,
      sprints: {
        ...projectData.sprints,
        [id]: {
          data: {},
          goal,
          startDate,
          endDate,
          position: 0,
        },
      },
    };

    expect(actualResult).toStrictEqual(expectedResult);
  });
  test("it should create a sprint without altering the other objects", () => {
    const projectData = INITIAL_PROJECT_DATA;

    const id = uuidv4();
    const goal = "my goal";
    const startDate = new Date();
    const endDate = new Date();

    const actualResult = createSprint({ projectData, id, goal, startDate, endDate });

    const expectedResult: ProjectData = {
      ...projectData,
      sprints: {
        ...projectData.sprints,
        [id]: {
          data: {},
          goal,
          startDate,
          endDate,
          position: 1,
        },
      },
    };

    expect(actualResult).toStrictEqual(expectedResult);
  });

  test("it should throw an error if startDate > endDate", () => {
    const projectData = INITIAL_PROJECT_DATA;

    const id = uuidv4();
    const goal = "my goal";
    const startDate = new Date("2021-04-09T10:00:00Z");
    const endDate = new Date("2021-04-09T09:00:00Z");

    expect(() => createSprint({ projectData, id, goal, startDate, endDate })).toThrow(
      "End date must be after start date"
    );
  });
});
