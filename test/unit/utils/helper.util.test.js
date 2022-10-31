const {
  formatTitle,
  isObjectId,
  getQueryOptions,
} = require("../../../src/utils/helper.util");

test("formatTitle works", () => {
  const title = formatTitle("The best Ways to use REACT");
  expect(title).toBe("the-best-ways-to-use-react");
});

test("isObjectId works with numbers", () => {});

test("isObjectId works with strings", () => {});

test("getQueryOptions works", () => {});
