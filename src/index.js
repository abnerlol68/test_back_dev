const { PORT } = require("./config.js");
const app = require("./app.js");
const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
  V1SwaggerDocs(app, PORT);
});
