const express = require("express");
const router = express.Router();

const Movie = require("../models/movie");

router.get("/", async (req, res) => {
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
        filter.rating = { $gt: rating };
    }

    const movies = await Movie.find(filter).sort({ _id: -1 });
    res.send(movies);
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const movie = await Movie.findById(id);
    res.send(movie);
});

router.post("/", async (req, res) => {
    try {
        const title = req.body.title;
        const director = req.body.director;
        const release_year = req.body.release_year;
        const genre = req.body.genre;
        const rating = req.body.rating;

        if (!title || !director || !release_year || !genre || !rating) {
            return res.status(400).send({
                message: "All fields are required",
            });
        }

        const newMovie = new Movie({
            title: title,
            director: director,
            release_year: release_year,
            genre: genre,
            rating: rating,
        });
        await newMovie.save();

        res.status(200).send(newMovie);
    } catch (error) {
        res.status(400).send({ message: "Unknown error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const title = req.body.title;
        const director = req.body.director;
        const release_year = req.body.release_year;
        const genre = req.body.genre;
        const rating = req.body.rating;

        if (!title || !director || !release_year || !genre || !rating) {
            return res.status(400).send({
                message: "All fields are required",
            });
        }

        const updatedMovie = await Movie.findByIdAndUpdate(
            id,
            {
                title: title,
                director: director,
                release_year: release_year,
                genre: genre,
                rating: rating,
            },
            {
                new: true,
            }
        );

        res.status(200).send(updatedMovie);
    } catch (error) {
        res.status(400).send({ message: "Unknown Error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedMovie = await Movie.findByIdAndDelete(id);
        res.status(200).send({
            message: `Movie with the id of ${id} has been deleted`,
        });
    } catch (error) {
        res.status(400).send({ message: "Unknown Error" });
    }
});

module.exports = router;
