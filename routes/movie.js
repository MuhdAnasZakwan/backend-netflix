const express = require("express");
const router = express.Router();
const {
    getMovies,
    getMovie,
    addMovie,
    updateMovie,
    deleteMovie,
} = require("../controllers/movie");

router.get("/", async (req, res) => {
    const director = req.query.director;
    const genre = req.query.genre;
    const rating = req.query.rating;
    const movies = await getMovies(genre, rating, director);

    res.status(200).send(movies);
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const movie = await getMovie(id);

    res.status(200).send(movie);
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

        res.status(200).send(
            await addMovie(title, director, release_year, genre, rating)
        );
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

        res.status(200).send(
            await updateMovie(id, title, director, release_year, genre, rating)
        );
    } catch (error) {
        res.status(400).send({ message: "Unknown Error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await deleteMovie(id);
        res.status(200).send({
            message: `Movie with the id of ${id} has been deleted`,
        });
    } catch (error) {
        res.status(400).send({ message: "Unknown Error" });
    }
});

module.exports = router;
