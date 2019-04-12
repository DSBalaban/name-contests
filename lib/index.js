const { nodeEnv } = require("./util");
console.log(`Running in ${nodeEnv} mode...`);

const pg = require("pg");
const pgConfig = require("../config/pg")[nodeEnv];
const pgPool = new pg.Pool(pgConfig);

const app = require("express")();

const ncSchema = require("../schema");
const graphqlHTTP = require("express-graphql");

app.use(
  "/graphql",
  graphqlHTTP({
    schema: ncSchema,
    graphiql: nodeEnv === "development",
    context: { pgPool }
  })
);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
