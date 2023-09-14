const fetch = require("node-fetch");
const mongoose = require("mongoose");
const Movie = require("./models/movie");
const Director = require("./models/director");
const Actor = require("./models/actor");

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

  // Fetch the top 100 rated movies from TMDb API
  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=vote_average.desc&vote_count.gte=100&page=1`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      const movieIds = data.results.map((movie) => movie.id);

      // Fetch and populate data for each movie
      movieIds.forEach((movieId) => {
        // Fetch movie details
        fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`,
          options
        )
          .then((response) => response.json())
          .then((movieData) => {
            // Extract relevant movie data
            const { title, overview, release_date } = movieData;

            // Create a new Movie instance and set its properties
            const movie = new Movie({
              title,
              overview,
              release_date
            });

            // Fetch movie credits (directors and actors)
            fetch(
              `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`,
              options
            )
              .then((response) => response.json())
              .then((creditsData) => {
                // Extract director and actor data
                const directorData = creditsData.crew.filter(
                  (member) => member.job === "Director"
                );
                const actorData = creditsData.cast;

                // Insert Director Data into the database
                Director.insertMany(
                  directorData.map((director) => ({
                    name: director.name
                  }))
                )
                  .then((directors) => {
                    console.log("Inserted director data into the database.");
                    // Associate directors with the movie
                    movie.directors = directors.map((d) => d._id);

                    // Insert Actor Data into the database
                    Actor.insertMany(
                      actorData.map((actor) => ({
                        name: actor.name
                      }))
                    )
                      .then((actors) => {
                        console.log("Inserted actor data into the database.");
                        // Associate actors with the movie
                        movie.actors = actors.map((a) => a._id);

                        // Save the movie to the database with references to actors and directors
                        movie
                          .save()
                          .then(() => {
                            console.log(`Inserted movie: ${movie.title}`);
                          })
                          .catch((error) => {
                            console.error("Error saving movie:", error);
                          });
                      })
                      .catch((error) => {
                        console.error("Error inserting actor data:", error);
                      });
                  })
                  .catch((error) => {
                    console.error("Error inserting director data:", error);
                  });
              })
              .catch((error) => {
                console.error(
                  "Error fetching credits data from the API:",
                  error
                );
              });
          })
          .catch((error) => {
            console.error("Error fetching movie data from the API:", error);
          });
      });

      console.log("Data inserted into the database.");
    })
    .catch((error) => {
      console.error("Error fetching data from the API:", error);
    });
});
