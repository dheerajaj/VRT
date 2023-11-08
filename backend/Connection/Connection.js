// Import the Mongoose library
const mongoose = require('mongoose');

// Connect to the MongoDB database using Mongoose
mongoose.connect(`mongodb+srv://art:art@art.qcne1x0.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    // If the connection is successful, log a success message
    console.log('connected');
  })
  .catch((err) => {
    // If there's an error during the connection, log the error
    console.log(err);
  });
