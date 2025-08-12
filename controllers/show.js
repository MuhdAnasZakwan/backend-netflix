const Show = require("../models/show");

async function getShows(genre, rating, premiere_year) {
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

    return await Show.find(filter).sort({ _id: -1 });
}

async function getShow(id) {
    return await Show.findById(id);
}

async function addShow(title, creator, premiere_year, end_year, seasons, genre, rating) {
    const newShow = new Show({
        title: title,
        creator: creator,
        premiere_year: premiere_year,
        end_year: end_year,
        seasons: seasons,
        genre: genre,
        rating: rating,
    });
    return await newShow.save();
}

async function updateShow(id, title, creator, premiere_year, end_year, seasons, genre, rating) {
    return await Show.findByIdAndUpdate(
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
}

async function deleteShow(id) {
    return await Show.findByIdAndDelete(id);
}

module.exports = { getShows, getShow, addShow, updateShow, deleteShow };
