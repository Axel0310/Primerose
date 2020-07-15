module.exports = (req, res, next) => {
    req.session.currentUser = {
      _id: "5f0edd00d95474138812d985",
      profil: "user",
      email: "admin@fake.com",
<<<<<<< HEAD
      shop: "5f0dbded20aa9136ac2bbafe"
=======
      shop: "5f0f06eae0697e3bb1d080eb"
>>>>>>> b17925ebd971a18763ad111e0591839d21ce53cf
    };
    next();
  };
  