const { pool } = require("../database/db");

const getAllRestaurants = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM restaurants");
    return rows;
  } catch (err) {
    throw err;
  }
};

const getOneRestaurant = () => {
  return;
};

const createNewRestaurant = () => {
  return;
};

const updateOneRestaurant = () => {
  return;
};

const deleteOneRestaurant = () => {
  return;
};

module.exports = {
  getAllRestaurants,
  getOneRestaurant,
  createNewRestaurant,
  updateOneRestaurant,
  deleteOneRestaurant,
};
