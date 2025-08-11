const express = require("express");
const mongoose = require("mongoose");

// setup express
const app = express();

// connect to mongodb with mongoose
async function connectToMongoDB() {
    try {
        // wait for MongoDB to connect
        await mongoose.connect("mongodb://localhost:27017/netflix");
        console.log("MongoDB is connected");
    } catch (error) {
        console.log(error);
    }
}
// trigger connection
connectToMongoDB();

// setup route
app.get("/", (req, res) => {
    res.send("Happy coding");
});

const movieSchema = new mongoose.Schema({
    title: String,
    director: String,
    release_year: Number,
    genre: String,
    rating: Number,
});

// create Modal from schema
const Movie = mongoose.model("Movie", movieSchema);

/* 
    Routes for movies
    GET /movies - list all the movies
    GET /movies/68943cf564aa9f8354cef260 - get a specific movie
    POST /movies - add new movie
    PUT /movies/68943cf564aa9f8354cef260 - update movie
    DELETE /movies/68943cf564aa9f8354cef260 - delete movie
*/
app.get("/movies", async (req, res) => {
    const director = req.query.director;
    const genre = req.query.genre;
    const rating = req.query.rating;

    let filter = {};
    if (director) {
        filter.director = director;
    }
    if (genre) {
        filter.genre = genre;
    }
    if (rating) {
        filter.rating = {$gt: rating};
    }

    const movies = await Movie.find(filter);
    res.send(movies);
});
app.get("/movies/:id", async(req, res) => {
    const id = req.params.id;
    const movie = await Movie.findById(id);
    res.send(movie);
})

// start express
app.listen(5123, () => {
    console.log("Server is running at http://localhost:5123");
});
