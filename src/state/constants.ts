import { BoardData, Sprint } from "../types/types";

export const INITIAL_SPRINT_DATA: Sprint = {
  goals:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris hendrerit fermentum velit eget hendrerit. Quisque blandit blandit",
  data: {
    "5cac8c9e-f91b-438a-9e18-00cea4667ee3": {
      position: 0,
      list_title: "Doing",
      cards: {
        "52f8d85a-0196-46f0-96f3-5878846851dd": {
          position: 0,
          card_content: "todo item 1",
        },
        "271beef3-8082-4ec2-aa9b-955944aea405": {
          position: 2,
          card_content: "second todo item",
        },
      },
    },
    "860c2140-f2cd-4e9a-8b82-179137e19b1e": {
      position: 1,
      list_title: "Done",
      cards: {
        "63bdd1d2-aa55-4e69-8f98-b345b5b6bdfd": {
          position: 0,
          card_content: "some data here",
        },
        "8c2b284c-babe-48ce-8eed-12d3fed2334a": {
          position: 2,
          card_content: "here is more text",
        },
        "11c54528-b4d5-4142-8069-3f82b91a7a2e": {
          position: 1,
          card_content: "Multi-line card example. Multi-line card example. ",
        },
      },
    },
  },
};

export const INITIAL_BOARD_DATA: BoardData = {
  backlog: {
    position: 0,
    list_title: "Product Backlog",
    cards: {
      "63bdd1d2-aa55-4e69-8f98-b345b5b6bdfd": {
        position: 0,
        card_content: "some data here",
      },
      "8c2b284c-babe-48ce-8eed-12d3fed2334a": {
        position: 2,
        card_content: "here is more text",
      },
      "11c54528-b4d5-4142-8069-3f82b91a7a2e": {
        position: 1,
        card_content: "Multi-line card example. Multi-line card example. ",
      },
    },
  },
  sprints: [INITIAL_SPRINT_DATA],
};

export enum ProjectAction {
  REORDER_LIST_POSITION = "reorderListPosition",
  REORDER_CARD_POSITION = "reorderCardPosition",
  ADD_CARD = "addCard",
  UPDATE_CARD = "updateCard",
  DELETE_CARD = "deleteCard",
  ADD_LIST = "addList",
  DELETE_LIST = "deleteList",
  UPDATE_LIST_TITLE = "updateListTitle",
}
