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

const getRestaurantDataInArea = async (req, res) => {
  try {
    const { latitude, longitude, radius } = req.query;

    const getDistance = (centralPoint, otherPoint) => {
      const toRadians = (n) => n * (Math.PI / 180);
      const distance = (a, b) => (Math.PI / 180) * (a - b);
      const EARTH_RADIUS_IN_KM = 6371;

      const disLat = distance(otherPoint[0], centralPoint[0]);
      const disLon = distance(otherPoint[1], centralPoint[1]);

      const a =
        Math.pow(Math.sin(disLat / 2), 2) +
        Math.pow(Math.sin(disLon / 2), 2) *
          Math.cos(toRadians(centralPoint[0])) *
          Math.cos(toRadians(otherPoint[0]));

      return 2 * EARTH_RADIUS_IN_KM * Math.asin(Math.sqrt(a));
    };

    const coorsAndRatings = await restaurantService.getCoorsAndRatings();

    const ratings = coorsAndRatings
      .filter(({ lat, lng }) => {
        return getDistance([latitude, longitude], [lat, lng]) <= radius;
      })
      .map(({ rating }) => rating);

    const ratingsAvg = ratings.reduce((a, c) => a + c, 0) / ratings.length;
    const ratingsStd =
      ratings.map((rat) => (rat - ratingsAvg) ** 2).reduce((a, c) => a + c, 0) /
      ratings.length;

    res.json({
      message: "Restaurants info in area",
      data: {
        count: ratings.length,
        avg: ratingsAvg,
        std: ratingsStd,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to establish area" });
  }
};

module.exports = {
  getAllRestaurants,
  getOneRestaurant,
  createNewRestaurant,
  updateOneRestaurant,
  deleteOneRestaurant,
  getRestaurantDataInArea,
};
