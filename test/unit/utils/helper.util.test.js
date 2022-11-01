const {
  isObjectId,
  getQueryOptions,
} = require("../../../src/utils/helper.util");

test("isObjectId works with numbers", () => {
  expect(isObjectId("737537253")).toBeFalsy();
});

test("isObjectId works with strings", () => {
  expect(isObjectId("douAUEOHTN")).toBeFalsy();
});

test("isObjectId works with strings", () => {
  expect(isObjectId("63418184452c46177771b020")).toBeTruthy();
});

test("getQueryOptions works", () => {
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
