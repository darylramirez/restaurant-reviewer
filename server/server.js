require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const db = require('./db');

//an instance of express
const app = express();

//create middleware using third party morgan that auto calls next and will log to the console the api call
// app.use(morgan('dev'))

//built in middleware for express that allows us to access req.body, converts the json to standard javascript object
app.use(express.json())


//get all rstaurants
app.get('/api/v1/restaurants', async (req,res) => {
    const results = await db.query("select * from restaurants")
    console.log(results);
    res.status(200).json();
})

//get individual restaurant
app.get('/api/v1/restaurants/:id', (req,res) => {
    const id = req.params.id;
    console.log(id)
    res.status(200).json({
        status: 'success',
        data: {
            restaurant: "taco bell"
        }
    })
})

//add a restaurant
app.post('/api/v1/restaurants', (req,res) => {
    console.log(req.body)
    res.status(201).json({
        status: 'success',
        data: {
            restaurant: "taco bell"
        } 
    })
})

//update individual restaurant
app.put('/api/v1/restaurants/:id', (req,res) => {
    const id = req.params.id;
    console.log(`Updating this restaurant:${id}`);
    console.log(req.body);
    res.status(200).json({
        status: 'success',
        data: {
            restaurant: "taco bell"
        } 
    })
})

//delete individual restaurant
app.delete('/api/v1/restaurants/:id', (req,res) => {
    const id = req.params.id;
    console.log(`Deleting this restaurant:${id}`);
    res.status(204).json();
})



//listening on port 4000 which is stored in our environment variable accessed using process.env a global variable
//on runtime in Node.js
//environment variables are stored in a .env file in our server directory
const port = process.env.PORT || 3005;

app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`)
})