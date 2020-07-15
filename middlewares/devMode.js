module.exports = (req, res, next) => {
    req.session.currentUser = {
      _id: "5f0edd00d95474138812d985",
      profil: "user",
      email: "admin@fake.com",
      shop: "5f0f06eae0697e3bb1d080eb"
    };
    next();
  };
  