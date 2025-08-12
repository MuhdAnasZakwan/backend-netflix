const express = require("express");
const mongoose = require("mongoose");

// setup express
const app = express();

// JSON handling
app.use(express.json());

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

const movieRouter = require("./routes/movie");
app.use("/movies", movieRouter);

const showRouter = require("./routes/show");
app.use("/shows", showRouter);

// start express
app.listen(5123, () => {
    console.log("Server is running at http://localhost:5123");
});
