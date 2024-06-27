const http = require('http');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const app = require('./app');
const connectDB = require('./config/DB'); 


// Connect to database
connectDB();


mongoose.connection.once('open', () => {

    console.log('Connected to MongoDB');

    const server = http.createServer(app);

    // Start listening for requests after successful MongoDB connection
    server.listen(PORT, () => {
        console.log(`Server is running and listening for requests on ${PORT}`);
    });
});

mongoose.connection.on('error', (err) => {
    console.error('Failed to connect to MongoDB', err);
});