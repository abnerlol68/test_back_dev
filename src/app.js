const express = require("express");
const morgan = require("morgan");

const v1Router = require("./v1/routes");
const v1RestaurantRouter = require("./v1/routes/restaurantRoutes");
const v1RestaurantsRouter = require("./v1/routes/restaurantsRoutes");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1", v1Router);
app.use("/api/v1/restaurant", v1RestaurantRouter);
app.use("/api/v1/restaurants", v1RestaurantsRouter);

module.exports = app;
