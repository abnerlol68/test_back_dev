const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Test BackEnd Dev", version: "1.0.0" },
  },
  apis: [
    "src/v1/routes/restaurantRoutes.js",
    "src/v1/routes/restaurantsRoutes.js",
  ],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api/v1/docs.json", (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};

module.exports = { swaggerDocs };
