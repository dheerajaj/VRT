// Import required modules and dependencies
const express = require('express'); // Express.js framework
require('./Connection/Connection'); // Import the database connection setup
const userRouter = require('./Routes/Routes');
const cors = require('cors'); // Cross-Origin Resource Sharing middleware
const app = express(); // Create an Express application instance
const swaggerUi = require('swagger-ui-express'); // Swagger UI for API documentation
const swaggerDoc = require('swagger-jsdoc'); // Swagger documentation generator
const cookieParser= require("cookie-parser");
// Swagger API documentation configuration
const options = {
    definition: {
        openapi: '3.0.0', // OpenAPI version
        info: {
            title: 'Virtual Art Gallery',
            description: 'Virtual Art Gallery in express', // Description of your API documentation
        },
        servers: [
            {
                url: 'http://localhost:8000', // Base URL of your API
            },
        ],
    },
    apis: ["./routes/*.js"], // Paths to the API route files that contain Swagger annotations
};

const spec = swaggerDoc(options); // Generate the Swagger documentation based on the provided options

// Express middleware setup
app.use(cors()); // Enable CORS for your API
app.use(express.json()); // Parse incoming JSON data
app.use(cookieParser());
app.use('/api', userRouter); // Mount the user routes at '/api'
app.use("/app-doc", swaggerUi.serve, swaggerUi.setup(spec)); // Serve Swagger UI at '/app-doc' and use the generated Swagger documentation

// Start the Express server on port 8000
app.listen(8000, () => {
    console.log('Server is Running at port 8000');
});
  