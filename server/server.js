require('dotenv').config();
const express = require('express');
//cors allows two different domains to interact
const cors = require('cors');
// const morgan = require('morgan');
const db = require('./db');

//an instance of express
const app = express();

//create middleware using third party morgan that auto calls next and will log to the console the api call
// app.use(morgan('dev'))

app.use(cors())
//built in middleware for express that allows us to access req.body, converts the json to standard javascript object
app.use(express.json())


//get all rstaurants
app.get('/api/v1/restaurants', async (req,res) => {
    try{
    const results = await db.query("select * from restaurants")
    console.log(results);
    res.status(200).json({
        status: 'success',
        results: results.rowCount,
        data: {
            restaurants: results.rows
        },
    });
} catch(e){
    console.log(`Error in GET ALL RESTAURANTS ${e}`);
    res.status(404)
}
})

//get individual restaurant
app.get('/api/v1/restaurants/:id', async (req,res) => {
    try{
    const id = req.params.id;
    //do not use back ticks/string interpolation in sql query 
    //makes you vulnerable to sql interjections and attacks
    //the $1 will be replaced with the variable you passed into arr argument
    //you can also specify the column you wnt back instead of * which returns all columns
    const result = await db.query("select * from restaurants where id = $1", [id]);
    const reviews = await db.query("select * from reviews where restaurant_id = $1", [id]);
    console.log(result);
    res.status(200).json({
        status: 'success',
        data: {
            restaurant: result.rows[0],
            reviews: reviews.rows,
        }
    })
} catch(e){
    console.log(`Error in GET INDIV RESTAURANT, ${e}`)
}
})

//add a restaurant
app.post('/api/v1/restaurants', async(req,res) => {
    try{
    //need to include the returning */column to get any data back from insert query
    const result = await db.query("INSERT INTO restaurants (name, city, price_range) values($1, $2, $3) returning *", 
    [req.body.name, req.body.city, req.body.price_range]);
    res.status(201).json({
        status: 'success',
        data: {
            restaurant: result.rows[0],
        },
    })
} catch(e){
console.log(`Error in POST new restaurant ${e}`)
}
})

app.post('/api/v1/restaurants/:id/addReview', async(req,res) => {
    try{
    const id = req.params.id
    const result = await db.query("INSERT INTO reviews (name, rating, review, restaurant_id) values($1, $2, $3, $4) returning *", 
    [req.body.name, req.body.rating, req.body.review, id]);
    res.status(201).json({
        status: 'success',
        data: {
            reviews: result.rows[0]
        },
    })
} catch(e){
console.log(`Error in POST new restaurant ${e}`)
}
})

//update individual restaurant
//To update in Postgres 'update restaurants
app.put('/api/v1/restaurants/:id', async (req,res) => {
    try{
    const id = req.params.id;
    const result = await db.query("UPDATE restaurants SET name = $1, city = $2, price_range = $3 where id = $4 returning *", 
    [req.body.name, req.body.city, req.body.price_range, id])
    res.status(200).json({
        status: 'success',
        data: {
            restaurant: result.rows[0]
        } 
    })
} catch(e){
console.log(`Error updating restaurant ${e}`)
}
})

//delete individual restaurant
app.delete('/api/v1/restaurants/:id', async (req,res) => {
    try{
    const id = req.params.id;
    const result = await db.query("DELETE FROM restaurants where id = $1", [id])
    res.status(204).json({
        status: 'success'
    });
    } catch(e){
        console.log(`Error deleting restaurants ${e}`)
    }
})



//listening on port 4000 which is stored in our environment variable accessed using process.env a global variable
//on runtime in Node.js
//environment variables are stored in a .env file in our server directory
const port = process.env.PORT || 3005;

app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`)
})