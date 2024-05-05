const { pool } = require("../database/db");

const getAllRestaurants = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM restaurants");
    return rows;
  } catch (err) {
    throw err;
  }
};

const getOneRestaurant = async (restaurantId) => {
  try {
    const [rows] = await pool.query("SELECT * FROM restaurants WHERE id = ?", [
      restaurantId,
    ]);
    return [rows];
  } catch (err) {
    throw err;
  }
};

const findPreviousRestaurant = async (restaurant) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM restaurants WHERE rating = ? AND name = ? AND site = ? AND email = ? AND phone = ? AND street = ? AND city = ? AND state = ? AND lat = ? AND lng = ?",
      Object.values(restaurant)
    );
    return [rows];
  } catch (err) {
    throw err;
  }
};

const createNewRestaurant = async (restaurant) => {
  try {
    const req = await pool.query(
      "INSERT INTO restaurants VALUES (?,?,?,?,?,?,?,?,?,?,?)",
      Object.values(restaurant)
    );
    return req;
  } catch (err) {
    throw err;
  }
};

const updateOneRestaurant = async (restaurantId, restaurant) => {
  try {
    const req = await pool.query(
      `UPDATE restaurants SET 
      rating = IFNULL(?, rating),
      name = IFNULL(?, name),
      site = IFNULL(?, site),
      email = IFNULL(?, email),
      phone = IFNULL(?, phone),
      street = IFNULL(?, street),
      city = IFNULL(?, city),
      state = IFNULL(?, state),
      lat = IFNULL(?, lat),
      lng = IFNULL(?, lng)
      WHERE id = ?`,
      [...Object.values(restaurant), restaurantId]
    );
    return req;
  } catch (err) {
    throw err;
  }
};

const deleteOneRestaurant = async (restaurantId) => {
  try {
    const req = await pool.query("DELETE FROM restaurants WHERE id = ?", [
      restaurantId,
    ]);
    return req;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllRestaurants,
  getOneRestaurant,
  findPreviousRestaurant,
  createNewRestaurant,
  updateOneRestaurant,
  deleteOneRestaurant,
};
