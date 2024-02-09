const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();

const { 
    MONGO_USER, 
    MONGO_PASSWORD, 
    MONGO_IP, 
    MONGO_PORT,
} = require('./config/config');


mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
.then(() => console.log("Succesfully connected to DB"))
.catch((err) => console.log(err));

app.enable("trust proxy")
app.use(cors({}))
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

app.use(express.json());

app.get('/api/v1', (req,res) => {
    res.send("<h2> Hi there huk</h2>")
    console.log("Yeah it is running")
});


app.use("/api/v1/posts", postRouter)
app.use("/api/v1/users", userRouter)
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})