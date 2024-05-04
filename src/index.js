// In src/index.js
const express = require("express");
// *** REMOVE ***
const v1Router = require("./v1/routes");
// *** ADD ***
const v1RestaurantRouter = require("./v1/routes/restaurantRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

// *** REMOVE ***
app.use("/api/v1", v1Router);

// *** ADD ***
app.use("/api/v1/restaurant", v1RestaurantRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});