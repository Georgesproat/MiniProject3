let dbConnect = require("./dbConnect");
const fetch = require("node-fetch");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongoDBURI = "mongodb://127.0.0.1/movieDB";
const movieRoutes = require("./routes/movieRoutes");

mongoose.connect(mongoDBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB!");

  app.use("/api/movies", movieRoutes);

  const PORT = process.env.PORT || 8080;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});
