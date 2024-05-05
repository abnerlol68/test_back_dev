const { v4: uuid } = require("uuid");
const restaurantService = require("../services/restaurantService");

const getAllRestaurants = async (_req, res) => {
  try {
    const allRestaurants = await restaurantService.getAllRestaurants();
    res.json({ message: "Restaurants info", data: allRestaurants });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Restaurants not found" });
  }
};

const getOneRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const restaurant = (
      await restaurantService.getOneRestaurant(restaurantId)
    )[0];

    if (!restaurant.length) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json({ message: "Restaurant info", data: restaurant });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

const createNewRestaurant = async (req, res) => {
  try {
    const { body } = req;

    if (
      !body.rating ||
      !body.name ||
      !body.site ||
      !body.email ||
      !body.phone ||
      !body.street ||
      !body.city ||
      !body.state ||
      !body.lat ||
      !body.lng
    ) {
      res.status(400).json({
        message:
          "One of the following keys is missing or is empty in request body: id, rating, name, site, email, phone, street, city, state, lat, lng",
      });
    }

    const restaurantFound = await restaurantService.findPreviousRestaurant(
      body
    );

    if (restaurantFound[0].length) {
      return res.status(500).json({
        message: "Restaurant already exist",
      });
    }

    const { affectedRows } = (
      await restaurantService.createNewRestaurant({
        id: uuid(),
        ...structuredClone(body),
      })
    )[0];

    if (affectedRows !== 1) {
      return res.status(400).json({
        message: "Cannot register new restaurant",
      });
    }

    res.json({
      message: "New restaurant registered",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

const updateOneRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { body } = req;

    const restaurantFound = await restaurantService.getOneRestaurant(
      restaurantId
    );

    if (!restaurantFound.length) {
      return res.status(500).json({
        message: "Restaurant does not exist",
      });
    }

    const { affectedRows } = (
      await restaurantService.updateOneRestaurant(
        restaurantId,
        structuredClone(body)
      )
    )[0];

    if (affectedRows !== 1) {
      return res.status(400).json({
        message: "Cannot register new restaurant",
      });
    }

    res.json({
      message: "Restaurant updated",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

const deleteOneRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const restaurantFound = await restaurantService.getOneRestaurant(
      restaurantId
    );

    if (!restaurantFound.length) {
      return res.status(500).json({
        message: "Restaurant does not exist",
      });
    }

    const { affectedRows } = (
      await restaurantService.deleteOneRestaurant(restaurantId)
    )[0];

    if (affectedRows !== 1) {
      return res.status(400).json({
        message: "Cannot delete restaurant",
      });
    }

    res.json({
      message: "Restaurant deleted",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

module.exports = {
  getAllRestaurants,
  getOneRestaurant,
  createNewRestaurant,
  updateOneRestaurant,
  deleteOneRestaurant,
};
