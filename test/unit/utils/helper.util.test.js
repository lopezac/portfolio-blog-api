const {
  isObjectId,
  getQueryOptions,
  formatTitle,
} = require("../../../src/utils/helper.util");

describe("formatTitle", () => {
  test("Works with string hyphen separated", () => {
    const title = formatTitle("the-best-ways-to-use-react");
    expect(title).toBe("the best ways to use react");
  });
});

describe("isObjectId", () => {
  test("works with numbers", () => {
    expect(isObjectId("737537253")).toBeFalsy();
  });

  test("works with strings", () => {
    expect(isObjectId("douAUEOHTN")).toBeFalsy();
  });

  test("works with objectId", () => {
    expect(isObjectId("63418184452c46177771b020")).toBeTruthy();
  });
});

describe("getQueryOptions", () => {
  test("works with complex querry", () => {
    const query = {
      sort: "-timestamp,+title",
      page: "2",
      title: "never",
      keyword: "javaScript",
    };
    expect(getQueryOptions(query)).toEqual({
      sort: { timestamp: -1, title: 1 },
      page: 10,
      filter: { title: "never", keyword: "javaScript" },
    });
  });
});
