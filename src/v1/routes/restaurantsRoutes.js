const express = require("express");
const router = express.Router();

const {
  getRestaurantDataInArea,
} = require("../../controllers/restaurantController");

/**
 * @openapi
 * /restaurants/statistics:
 *   get:
 *     summary: Retrieve restaurant statistics within a specified area.
 *     description: Provides statistical data like average rating and standard deviation of ratings for restaurants within a specified radius from a central geolocation point.
 *     parameters:
 *       - in: query
 *         name: latitude
 *         schema:
 *           type: number
 *           format: double
 *         required: true
 *         description: Latitude of the central point.
 *       - in: query
 *         name: longitude
 *         schema:
 *           type: number
 *           format: double
 *         required: true
 *         description: Longitude of the central point.
 *       - in: query
 *         name: radius
 *         schema:
 *           type: number
 *           format: double
 *         required: true
 *         description: The radius around the central point in kilometers within which to calculate restaurant statistics.
 *     responses:
 *       200:
 *         description: Successfully retrieved statistics of restaurants.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: integer
 *                       description: Number of restaurants considered in the statistics.
 *                     avg:
 *                       type: number
 *                       format: double
 *                       description: Average rating of restaurants within the specified area.
 *                     std:
 *                       type: number
 *                       format: double
 *                       description: Standard deviation of the restaurant ratings within the specified area.
 *       500:
 *         description: Unable to process the request due to server error or bad input parameters.
 */
router.get("/statistics", getRestaurantDataInArea);

module.exports = router;
