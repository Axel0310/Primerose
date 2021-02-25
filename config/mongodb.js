const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () => console.log("Mongodb connected :)"));

mongoose.connection.on("error", () => console.log("Mongodb connexion error :("));