import express from 'express';
import mongoose from 'mongoose'

import Data from './data.js';
import Videos from './dbModel.js'



//app config
const app = express();
const port = process.env.PORT || 9000;

//middlewares
app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    next()
})

//dbConfig
// const connection_url = <Please add your mongodb secret key here>;
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

//api end points
app.get('/', (req, res) => res.status(200).send('hello world'));

app.get('/v1/posts', (req, res) => res.status(200).send(Data))

app.get('/v2/posts', (req, res) => {
    Videos.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post('/v2/posts', (req, res) => {
    //ADDING DATATO DATABASE
    const dbVideos = req.body
    Videos.create(dbVideos, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    });

})


//listener
app.listen(port, () => console.log(`Listening on localhost:${port}`));


//TozR1rtoWjtUp0CB