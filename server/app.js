const express = require('express');
const app = express();
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const errorMiddleware = require('./middleware/error');



// middleware 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


app.use('/api', userRoute);
app.use(errorMiddleware);





module.exports = app; 