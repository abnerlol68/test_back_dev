const express = require("express");
const router = express.Router();

const {
  getRestaurantDataInArea,
} = require("../../controllers/restaurantController");

router.get("/statistics", getRestaurantDataInArea);

module.exports = router;
