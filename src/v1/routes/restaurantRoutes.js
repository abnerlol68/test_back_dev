const express = require("express");
const router = express.Router();

const restaurantController = require("../../controllers/restaurantController");

router
  /**
   * @openapi
   * /restaurant/:
   *   get:
   *     summary: Retrieve a list of all restaurants.
   *     description: Retrieve a list of all restaurants including basic details.
   *     responses:
   *       200:
   *         description: A list of restaurants.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Restaurant'
   *       400:
   *         description: Error in fetching restaurants.
   */
  .get("/", restaurantController.getAllRestaurants)
  /**
   * @openapi
   * /restaurant/{restaurantId}:
   *   get:
   *     summary: Retrieve a single restaurant by ID.
   *     description: Retrieve detailed information of a single restaurant by its unique ID.
   *     parameters:
   *       - in: path
   *         name: restaurantId
   *         required: true
   *         schema:
   *           type: string
   *         description: The restaurant ID.
   *     responses:
   *       200:
   *         description: Detailed information about a restaurant.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                 data:
   *                   $ref: '#/components/schemas/Restaurant'
   *       404:
   *         description: Restaurant not found.
   *       500:
   *         description: Internal server error.
   */
  .get("/:restaurantId", restaurantController.getOneRestaurant)
  /**
   * @openapi
   * /restaurant/:
   *   post:
   *     summary: Create a new restaurant.
   *     description: Adds a new restaurant to the database.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/NewRestaurant'
   *     responses:
   *       200:
   *         description: New restaurant registered successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *       400:
   *         description: Missing required fields or bad input.
   *       500:
   *         description: Internal server error or duplicate restaurant found.
   */
  .post("/", restaurantController.createNewRestaurant)
  /**
   * @openapi
   * /restaurant/{restaurantId}:
   *   patch:
   *     summary: Update an existing restaurant.
   *     description: Updates data for an existing restaurant by ID.
   *     parameters:
   *       - in: path
   *         name: restaurantId
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the restaurant to update.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Restaurant'
   *     responses:
   *       200:
   *         description: Restaurant updated successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *       400:
   *         description: Invalid input or no changes detected.
   *       404:
   *         description: Restaurant not found.
   *       500:
   *         description: Internal server error.
   */
  .patch("/:restaurantId", restaurantController.updateOneRestaurant)
  /**
   * @openapi
   * /restaurant/{restaurantId}:
   *   delete:
   *     summary: Delete a restaurant.
   *     description: Removes a restaurant from the database by ID.
   *     parameters:
   *       - in: path
   *         name: restaurantId
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the restaurant to delete.
   *     responses:
   *       200:
   *         description: Restaurant deleted successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *       404:
   *         description: Restaurant not found.
   *       500:
   *         description: Internal server error or unable to delete restaurant.
   */
  .delete("/:restaurantId", restaurantController.deleteOneRestaurant);

module.exports = router;
