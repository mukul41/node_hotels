const express = require('express');
const app = express();
const database = require('./db');
const User = require('./models/user'); // Import the User model
const Dishes =require('./models/menuItems')
const PORT = process.env.PORT;
require('dotenv').config();

const user =require('./models/user')
// Middleware to parse incoming JSON requests
app.use(express.json());

app.get('/', (req,res)=>{
    res.send('Welcome to our Hotel');   
})
//import the routers
const userRoutes = require('./routes/userRoutes');

// //use the routers
app.use('/user', userRoutes)

//import the router
const menuRoutes = require('./routes/menuRoutes')

//use the router
app.use('/menu', menuRoutes);
// Start the server after successful connection to the database
database.connect().then(() => {
    app.listen(PORT, () => {
        console.log(`App is listening at ${PORT}`);
    });
}).catch((error) => {
    console.log("Failed to start server due to database connection error.");
});
