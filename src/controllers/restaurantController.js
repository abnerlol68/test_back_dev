const restaurantService = require("../services/restaurantService");

const getAllRestaurants = (req, res) => {
  const allRestaurants = restaurantService.getAllRestaurants();
  res.send("Get all Restaurants");
};

const getOneRestaurant = (req, res) => {
  const restaurant = restaurantService.getOneRestaurant();
  res.send("Get an existing Restaurant");
};

const createNewRestaurant = (req, res) => {
  const createRestaurant = restaurantService.createNewRestaurant();
  res.send("Create a new Restaurant");
};

const updateOneRestaurant = (req, res) => {
  const updateRestaurant = restaurantService.updateOneRestaurant();
  res.send("Update an existing Restaurant");
};

const deleteOneRestaurant = (req, res) => {
  const delateRestaurant = restaurantService.deleteOneRestaurant();
  res.send("Delete an existing Restaurant");
};

module.exports = {
  getAllRestaurants,
  getOneRestaurant,
  createNewRestaurant,
  updateOneRestaurant,
  deleteOneRestaurant,
};