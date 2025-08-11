const express = require("express");
const mongoose = require("mongoose");

const app = express();

async function connectToMongoDB() {
    try {
        // wait for MongoDB to connect
        await mongoose.connect("mongodb://localhost:27017/netflix");
        console.log("MongoDB is connected");
    } catch (error) {
        console.log(error);
    }
}
connectToMongoDB();

app.get("/", (req, res) => {
    res.send("Happy coding");
});

const showSchema = new mongoose.Schema({
    title: String,
    creator: String,
    premiere_year: Number,
    end_year: Number,
    seasons: Number,
    genre: String,
    rating: Number,
});

const Show = mongoose.model("Show", showSchema);

app.get("/shows", async (req, res) => {
    const genre = req.query.genre;
    const rating = req.query.rating;
    const premiere_year = req.query.premiere_year

    let filter = {};
    if (genre) {
        filter.genre = genre;
    }
    if (rating) {
        filter.rating = {$gt: rating};
    }
    if (premiere_year) {
        filter.premiere_year = {$gt: premiere_year};
    }

    const shows = await Show.find(filter);
    res.send(shows);
});
app.get("/shows/:id", async(req, res) => {
    const id = req.params.id;
    const show = await Show.findById(id);
    res.send(show);
})

// start express
app.listen(5123, () => {
    console.log("Server is running at http://localhost:5123");
});