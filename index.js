const app = require("express")();
const consign = require("consign");
const db = require("./config/db");
const mongoose = require("mongoose");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Knowledge base Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Marco Silva",
        url: "http://localhost:3000/api-docs/",
        email: "marcoantonio02016@outlook.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./config/routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

require("./config/mongodb");

app.db = db;
app.mongoose = mongoose;

consign()
  .include("./config/passport.js")
  .then("./config/middlewares.js")
  .then("./api/validation.js")
  .then("./api")
  .then("./schedule")
  .then("./config/routes/auth.js")
  .then("./config/routes/user.js")
  .then("./config/routes/category.js")
  .then("./config/routes/article.js")
  .then("./config/routes/stat.js")
  .into(app);

app.listen(3000, () => {
  console.log("Backend listening on port 3000");
});
