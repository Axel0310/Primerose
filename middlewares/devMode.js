module.exports = (req, res, next) => {
    req.session.currentUser = {
      _id: "5f102bf6b4a8a565af3a8ac8",
      profil: "user",
      email: "admin@fake.com",
      shop: "5f0f06eae0697e3bb1d080eb",
      favoriteShops: [],
      favoriteProducts: [],
      pastOrders: []

    };
    next();
  };
  