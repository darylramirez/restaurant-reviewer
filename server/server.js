require('dotenv').config();
const express = require('express');

const app = express();

app.get('/getRestaurants', (req,res) => {
    res.status(202).json({
        'status': 'success',
        'restaurant': 'McDs'
    })
})

//an instance of express

//listening on port 4000 which is stored in our environment variable accessed using process.env a global variable
//on runtime in Node.js
//environment variables are stored in a .env file in our server directory
const port = process.env.PORT || 3005;

app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`)
})