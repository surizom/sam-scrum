import { v4 as uuidv4 } from "uuid";
import { Column, ProjectData } from "../../types/types";
import { INITIAL_PROJECT_DATA } from "../constants";
import { closeSprint, createSprint } from "./sprintReducers";

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

    const actualResult = createSprint({ projectData, id, goal, startDate, endDate, isOpen: true });

    const actualResultWithoutColumns: ProjectData = {
      ...actualResult,
      sprints: {
        ...actualResult.sprints,
        [id]: {
          ...actualResult.sprints[id],
          data: {},
        },
      },
    };
    const expectedResultWithoutColumns: ProjectData = {
      ...projectData,
      sprints: {
        ...projectData.sprints,
        [id]: {
          data: {},
          goal,
          startDate,
          endDate,
          position: 0,
          isOpen: true,
        },
      },
    };
    expect(actualResultWithoutColumns).toStrictEqual(expectedResultWithoutColumns);

    const actualColumns: Column[] = Object.values(actualResult.sprints[id].data);
    const expectedColumns: Column[] = [
      {
        items: {},
        list_title: "Sprint Backlog",
        position: 0,
      },
      {
        items: {},
        list_title: "Doing",
        position: 1,
      },
      {
        items: {},
        list_title: "Done",
        position: 2,
      },
    ];
    expect(actualColumns).toStrictEqual(expectedColumns);
  });
  test("it should create a sprint without altering the other objects", () => {
    const projectData = INITIAL_PROJECT_DATA;

    const id = uuidv4();
    const goal = "my goal";
    const startDate = new Date();
    const endDate = new Date();
    const isOpen = true;

    const actualResult = createSprint({ projectData, id, goal, startDate, endDate, isOpen });

    const actualResultWithoutColumns: ProjectData = {
      ...actualResult,
      sprints: {
        ...actualResult.sprints,
        [id]: {
          ...actualResult.sprints[id],
          data: {},
        },
      },
    };
    const expectedResultWithoutColumns: ProjectData = {
      ...projectData,
      sprints: {
        ...projectData.sprints,
        [id]: {
          data: {},
          goal,
          startDate,
          endDate,
          position: 1,
          isOpen: true,
        },
      },
    };
    expect(actualResultWithoutColumns).toStrictEqual(expectedResultWithoutColumns);

    const actualColumns: Column[] = Object.values(actualResult.sprints[id].data);
    const expectedColumns: Column[] = [
      {
        items: {},
        list_title: "Sprint Backlog",
        position: 0,
      },
      {
        items: {},
        list_title: "Doing",
        position: 1,
      },
      {
        items: {},
        list_title: "Done",
        position: 2,
      },
    ];
    expect(actualColumns).toStrictEqual(expectedColumns);
  });

  test("it should throw an error if startDate > endDate", () => {
    const projectData = INITIAL_PROJECT_DATA;

    const id = uuidv4();
    const goal = "my goal";
    const startDate = new Date("2021-04-09T10:00:00Z");
    const endDate = new Date("2021-04-09T09:00:00Z");
    const isOpen = true;

    expect(() => createSprint({ projectData, id, goal, startDate, endDate, isOpen })).toThrow(
      "End date must be after start date"
    );
  });
});

describe("closeSprint", () => {
  test("it should close sprint", () => {
    const id = uuidv4();
    const goal = "my goal";
    const startDate = new Date("2021-04-09T10:00:00Z");
    const endDate = new Date("2021-04-09T09:00:00Z");
    const isOpen = true;

    const projectData: ProjectData = {
      backlog: {},
      sprints: {
        [id]: {
          data: {},
          goal,
          startDate,
          endDate,
          position: 0,
          isOpen,
        },
      },
      project_title: "My project",
    };

    const actualResult = closeSprint({ projectData, id });

    const expectedResult: ProjectData = {
      ...projectData,
      sprints: {
        ...projectData.sprints,
        [id]: {
          ...projectData.sprints[id],
          isOpen: false,
        },
      },
    };

    expect(actualResult).toStrictEqual(expectedResult);
  });

  test("it should not close sprint if there are items in state other than done", () => {
    const projectData: ProjectData = INITIAL_PROJECT_DATA;

    const id = "7cd31ac2-acfc-4912-a6ad-98ecdef9fff5";

    expect(() => closeSprint({ projectData, id })).toThrow(
      "All items must be in done state in order to close sprint"
    );
  });
});

const PROJECT_DATA_ALL_DONE: ProjectData = {
  project_title: "Main Project",
  sprints: {
    "7cd31ac2-acfc-4912-a6ad-98ecdef9fff5": {
      data: {
        "5cac8c9e-f91b-438a-9e18-00cea4667ee3": {
          position: 0,
          list_title: "Sprint Backlog",
          items: {},
        },
        "860c2140-f2cd-4e9a-8b82-179477e19b1e": {
          position: 2,
          list_title: "Done",
          items: {
            "63bdd1d2-aa55-4e69-0f98-b345b5b6bdfd": {
              position: 0,
              item_content: "some data here",
            },
            "562b284c-babe-48ce-8e4d-12d3fed2334a": {
              position: 2,
              item_content: "here is more text",
            },
            "22c54528-b4d5-4142-8069-3f82b91a7a2e": {
              position: 1,
              item_content: "Multi-line item example. Multi-line item example. ",
            },
          },
        },
      },
      startDate: new Date(),
      endDate: new Date(),
      position: 0,
      goal: "Sprint Done !",
      isOpen: true,
    },
  },
  backlog: {},
};

test("it should not close sprint if there are items in state other than done", () => {
  const projectData: ProjectData = PROJECT_DATA_ALL_DONE;

  const id = "7cd31ac2-acfc-4912-a6ad-98ecdef9fff5";

  const actualResult: ProjectData = closeSprint({ projectData, id });

  const expectedResult: ProjectData = {
    ...projectData,
    sprints: {
      ...projectData.sprints,
      [id]: {
        ...projectData.sprints[id],
        isOpen: false,
      },
    },
  };

  expect(actualResult).toStrictEqual(expectedResult);
});
