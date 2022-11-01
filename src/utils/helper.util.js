const mongoose = require("mongoose");

function isObjectId(string) {
  return mongoose.isObjectIdOrHexString(string);
}

function getFilterQuery(query) {
  const filterOptions = {};
  for (const param in query) {
    if (["sort", "page"].includes(param)) continue;
    filterOptions[param] = query[param];
  }
  return filterOptions;
}

function getSortQuery(query = "+timestamp") {
  const sortOptions = {};
  const sortQuery = query.split(",");
  for (const option of sortQuery) {
    // There is a bug, '+' character appears as ' ' for some reason.
    // Later study it and become article idea.
    // 1 means ascendent and -1 descendent
    const sortOrder = [" ", "+"].includes(option[0]) ? 1 : -1;
    const sortName = option.slice(1);
    sortOptions[sortName] = sortOrder;
  }
  return sortOptions;
}

function getPageQuery(page = 1) {
  return (page - 1) * 10;
}

function getQueryOptions(query) {
  const filter = getFilterQuery(query);
  const sort = getSortQuery(query["sort"]);
  const page = getPageQuery(query["page"]);
  return { filter, sort, page };
}

module.exports = {
  isObjectId,
  getQueryOptions,
};
