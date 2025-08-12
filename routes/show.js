const express = require("express");
const router = express.Router();

const Show = require("../models/show");

router.get("/", async (req, res) => {
    const genre = req.query.genre;
    const rating = req.query.rating;
    const premiere_year = req.query.premiere_year;

    let filter = {};
    if (genre) {
        filter.genre = genre;
    }
    if (rating) {
        filter.rating = { $gt: rating };
    }
    if (premiere_year) {
        filter.premiere_year = { $gt: premiere_year };
    }

    const shows = await Show.find(filter).sort({ _id: -1 });
    res.send(shows);
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const show = await Show.findById(id);
    res.send(show);
});

router.post("/", async (req, res) => {
    try {
        const title = req.body.title;
        const creator = req.body.creator;
        const premiere_year = req.body.premiere_year;
        const end_year = req.body.end_year;
        const seasons = req.body.seasons;
        const genre = req.body.genre;
        const rating = req.body.rating;

        if (
            !title ||
            !creator ||
            !premiere_year ||
            !seasons ||
            !genre ||
            !rating
        ) {
            return res.status(400).send({
                message: "All fields are required",
            });
        }

        const newShow = new Show({
            title: title,
            creator: creator,
            premiere_year: premiere_year,
            end_year: end_year,
            seasons: seasons,
            genre: genre,
            rating: rating,
        });
        await newShow.save();

        res.status(200).send(newShow);
    } catch (error) {
        res.status(400).send({ message: "Unknown error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const title = req.body.title;
        const creator = req.body.creator;
        const premiere_year = req.body.premiere_year;
        const end_year = req.body.end_year;
        const seasons = req.body.seasons;
        const genre = req.body.genre;
        const rating = req.body.rating;

        if (
            !title ||
            !creator ||
            !premiere_year ||
            !seasons ||
            !genre ||
            !rating
        ) {
            return res.status(400).send({
                message: "All fields are required",
            });
        }

        const updatedShow = await Show.findByIdAndUpdate(
            id,
            {
                title: title,
                creator: creator,
                premiere_year: premiere_year,
                end_year: end_year,
                seasons: seasons,
                genre: genre,
                rating: rating,
            },
            {
                new: true,
            }
        );

        res.status(200).send(updatedShow);
    } catch (error) {
        res.status(400).send({ message: "Unknown Error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedShow = await Show.findByIdAndDelete(id);
        res.status(200).send({
            message: `Show with the id of ${id} has been deleted`,
        });
    } catch (error) {
        res.status(400).send({ message: "Unknown Error" });
    }
});

module.exports = router;
