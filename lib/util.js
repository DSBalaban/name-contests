const mapKeys = require("lodash/mapKeys");
const camelCase = require("lodash/camelCase");

const camelizeObj = o => mapKeys(o, (v, k) => camelCase(k));
const camelizeArrayOfObj = a => a.map(camelizeObj);

module.exports = {
  nodeEnv: process.env.NODE_ENV || "development",
  camelizeObj,
  camelizeArrayOfObj
};
