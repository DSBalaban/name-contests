const mapKeys = require("lodash/mapKeys");
const camelCase = require("lodash/camelCase");
const groupBy = require("lodash/groupBy");

const camelizeObj = o => mapKeys(o, (v, k) => camelCase(k));
const camelizeArrayOfObj = a => a.map(camelizeObj);

// This is due to the number of rows potentially being less than that of the input
// Dataloader will complain, since the mapping it creates will be ruined
const orderedFor = (rows, collection, field, singleObject) => {
  // return the rows ordered for the collection
  // process the rows to make sure the output has the same length as the input
  const data = camelizeArrayOfObj(rows);
  const inGroupsOfField = groupBy(data, field);
  return collection.map(element => {
    const elementArray = inGroupsOfField[element];

    if (elementArray) {
      return singleObject ? elementArray[0] : elementArray;
    }

    return singleObject ? {} : [];
  });
};

module.exports = {
  nodeEnv: process.env.NODE_ENV || "development",
  camelizeObj,
  camelizeArrayOfObj,
  orderedFor
};
