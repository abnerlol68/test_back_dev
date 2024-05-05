const express = require("express");
const router = express.Router();

const restaurantController = require("../../controllers/restaurantController");

router
  .get("/", restaurantController.getAllRestaurants)
  .get("/:restaurantId", restaurantController.getOneRestaurant)
  .post("/", restaurantController.createNewRestaurant)
  .patch("/:restaurantId", restaurantController.updateOneRestaurant)
  .delete("/:restaurantId", restaurantController.deleteOneRestaurant)

module.exports = router;
