import { ProjectData } from "../types/types";

export const INITIAL_PROJECT_DATA: ProjectData = {
  sprints: {
    "7cd31ac2-acfc-4912-a6ad-98ecdef9fff5": {
      data: {
        "5cac8c9e-f91b-438a-9e18-00cea4667ee3": {
          position: 0,
          list_title: "todo",
          items: {
            "52f8d85a-0196-46f0-96f3-5878846851dd": {
              position: 0,
              item_content: "todo item 1",
            },
            "271beef3-8082-4ec2-aa9b-955944aea405": {
              position: 2,
              item_content: "second todo item",
            },
          },
        },
        "860c2140-f2cd-4e9a-8b82-179137e19b1e": {
          position: 1,
          list_title: "done",
          items: {
            "63bdd1d2-aa55-4e69-8f98-b345b5b6bdfd": {
              position: 0,
              item_content: "some data here",
            },
            "8c2b284c-babe-48ce-8eed-12d3fed2334a": {
              position: 2,
              item_content: "here is more text",
            },
            "11c54528-b4d5-4142-8069-3f82b91a7a2e": {
              position: 1,
              item_content: "Multi-line item example. Multi-line item example. ",
            },
          },
        },
      },
      startDate: new Date(),
      endDate: new Date(),
      goal: "My first sprint !",
    },
  },
  backlog: {
    "77c73546-1d0a-4144-a2bb-2247e07a6deb": {
      list_title: "Product Backlog",
      position: 0,
      items: {
        "55d8a49b-6a2a-4d8d-9f9d-369f975ea4d2": {
          position: 0,
          item_content: "backlog 1",
        },
        "f73d0a10-f5ad-4dcf-b6aa-facc0de6f26d": {
          position: 1,
          item_content: "backlog 2",
        },
      },
    },
  },
};

export enum ProjectAction {
  REORDER_ITEM_POSITION = "reorderItemPosition",
  ADD_ITEM = "addItem",
  UPDATE_ITEM = "updateItem",
  DELETE_ITEM = "deleteItem",
  ADD_LIST = "addList",
  DELETE_LIST = "deleteList",
  UPDATE_LIST_TITLE = "updateListTitle",
}
