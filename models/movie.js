const {Schema, model} = require("mongoose");

const movieSchema = new Schema({
    title: { type: String, required: true },
    director: { type: String, required: true },
    release_year: { type: Number, required: true },
    genre: { type: String, required: true },
    rating: { type: Number, required: true },
});

// create Modal from schema
const Movie = model("Movie", movieSchema);

module.exports = Movie;