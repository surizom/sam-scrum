import { v4 as uuidv4 } from "uuid";
import { ProductData } from "../../types/types";
import { INITIAL_PRODUCT_DATA } from "../constants";
import { endSprint, createSprint, deleteSprint } from "./sprintReducers";
import { isSameSprintAndDefaultColumns } from "./sprintUtils";

describe("createSprint", () => {
  test("it should create a sprint if the product is empty", () => {
    const productData: ProductData = {
      backlog: {},
      sprints: {},
      product_title: "My product",
    };

    const id = uuidv4();
    const goal = "my goal";
    const startDate = new Date();
    const endDate = new Date();

    const actualResult = createSprint({ productData, id, goal, startDate, endDate, isOpen: true });

    const expectedResultWithoutColumns: ProductData = {
      ...productData,
      sprints: {
        ...productData.sprints,
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

    expect(
      isSameSprintAndDefaultColumns({
        actual: actualResult,
        expected: expectedResultWithoutColumns,
        sprintId: id,
      })
    ).toBe(true);
  });
  test("it should create a sprint without altering the other objects", () => {
    const productData = INITIAL_PRODUCT_DATA;

    const id = uuidv4();
    const goal = "my goal";
    const startDate = new Date();
    const endDate = new Date();
    const isOpen = true;

    const actualResult = createSprint({ productData, id, goal, startDate, endDate, isOpen });

    const expectedResultWithoutColumns: ProductData = {
      ...productData,
      sprints: {
        ...productData.sprints,
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

    expect(
      isSameSprintAndDefaultColumns({
        actual: actualResult,
        expected: expectedResultWithoutColumns,
        sprintId: id,
      })
    ).toBe(true);
  });

  test("it should throw an error if startDate > endDate", () => {
    const productData = INITIAL_PRODUCT_DATA;

    const id = uuidv4();
    const goal = "my goal";
    const startDate = new Date("2021-04-09T10:00:00Z");
    const endDate = new Date("2021-04-09T09:00:00Z");
    const isOpen = true;

    expect(() => createSprint({ productData, id, goal, startDate, endDate, isOpen })).toThrow(
      "End date must be after start date"
    );
  });
});

describe("deleteSprint", () => {
  test("it should delete a sprint", () => {
    const productData = INITIAL_PRODUCT_DATA;

    const id = "7cd31ac2-acfc-4912-a6ad-98ecdef9fff5";

    const actualResult = deleteSprint({ productData, id });

    const expectedResult: ProductData = {
      ...productData,
      sprints: {},
    };

    expect(actualResult).toStrictEqual(expectedResult);
  });

  describe("endSprint", () => {
    test("it should not end sprint if there are items in state other than done", () => {
      const productData: ProductData = INITIAL_PRODUCT_DATA;

      const id = "7cd31ac2-acfc-4912-a6ad-98ecdef9fff5";

      expect(() => endSprint({ productData, id })).toThrow(
        "All items must be in done state in order to end sprint"
      );
    });

    const PRODUCT_DATA_ALL_DONE: ProductData = {
      product_title: "Main Product",
      sprints: {
        "7cd31ac2-acfc-4912-a6ad-98ecdef9fff5": {
          data: {
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

    test("it should end sprint if all items done", () => {
      const productData: ProductData = PRODUCT_DATA_ALL_DONE;

      const id = "7cd31ac2-acfc-4912-a6ad-98ecdef9fff5";

      const actualResult: ProductData = endSprint({ productData, id });

      const expectedResult: ProductData = {
        ...productData,
        sprints: {
          ...productData.sprints,
          [id]: {
            ...productData.sprints[id],
            isOpen: false,
          },
        },
      };

      expect(actualResult).toStrictEqual(expectedResult);
    });

    test("it should delete columns other than done on sprint end", () => {
      const productData: ProductData = PRODUCT_DATA_ALL_DONE;

      const id = "7cd31ac2-acfc-4912-a6ad-98ecdef9fff5";

      const actualResult: ProductData = endSprint({ productData, id });

      const expectedResult: ProductData = {
        ...productData,
        sprints: {
          ...productData.sprints,
          [id]: {
            ...productData.sprints[id],
            data: {
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
            isOpen: false,
          },
        },
      };

      expect(actualResult).toStrictEqual(expectedResult);
    });
  });
});
