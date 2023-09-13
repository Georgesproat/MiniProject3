const fetch = require("node-fetch");
const mongoose = require("mongoose");
const Movie = require("./models/movie");

const url = "https://api.themoviedb.org/3/discover/movie";
const apiKey = "0af1f375cc6c9924fe0cc1a1a6fb67ef";

const options = {
  method: "GET",
  headers: {
    accept: "application/json"
  }
};

mongoose.connect("mongodb://127.0.0.1/movieDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB!");

  fetch(`${url}?api_key=${apiKey}`, options)
    .then((response) => response.json())
    .then((data) => {
      // Data fetched from the API
      const movies = data.results;

      // Insert fetched data into the MongoDB database
      movies.forEach((movieData) => {
        // Extract relevant data and create a new Movie instance
        const movie = new Movie({
          title: movieData.title,
          overview: movieData.overview,
          release_date: movieData.release_date,
          vote_average: movieData.vote_average
          
        });

        // Save the movie to the database
        movie
          .save()
          .then(() => {
            console.log(`Inserted movie: ${movie.title}`);
          })
          .catch((error) => {
            console.error("Error saving movie:", error);
          });
      });

      console.log("Data inserted into the database.");
    })
    .catch((error) => {
      console.error("Error fetching data from the API:", error);
    });
});
