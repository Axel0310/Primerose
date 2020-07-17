module.exports = (req, res, next) => {
    req.session.currentUser = {
      _id: "5f0f7dea5a48c266b19c8c0d",
      profil: "user",
      email: "admin@fake.com",
      shop: "5f0f06eae0697e3bb1d080eb",
      favoriteShops: [],
      favoriteProducts: [],
      pastOrders: []

    };
    next();
  };
  