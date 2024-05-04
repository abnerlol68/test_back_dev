const express = require("express");
const router = express.Router();

const restaurantController = require("../../controllers/restaurantController");

router.get("/", restaurantController.getAllRestaurants);

router.get("/:restaurantId", restaurantController.getOneRestaurant);

router.post("/", restaurantController.createNewRestaurant);

router.patch("/:restaurantId", restaurantController.updateOneRestaurant);

router.delete("/:restaurantId", restaurantController.deleteOneRestaurant);

module.exports = router;
