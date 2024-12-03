const mongoose = require('mongoose');
require('dotenv').config();
const mongodbUrl = process.env.MONGODB_URL;
function connect() {
    return mongoose.connect(mongodbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connection successful.");
    })
    .catch((error) => {
        console.log("Error in connection.");
        console.error(error);
        process.exit(1); // Exit the process if connection fails
    });
}

module.exports = { connect };
