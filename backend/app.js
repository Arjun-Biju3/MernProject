const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-routes')
const usersRoutes = require('./routes/users-routes')
const HttError = require("./models/http-error")

const app = express();

app.use(bodyParser.json());

app.use('/api/places',placesRoutes); //=>/api/places/..
app.use('/api/users',usersRoutes);


app.use((req, res, next)=>{
const error = new HttError("Could not find this route.",404);
throw error;
});

app.use((error, req, res, next)=>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message:error.message || "An unknown error occured"});
})

mongoose.connect("mongodb+srv://arjunbiju322:N0fz9tM39vjsM3L7@cluster0.gey9y.mongodb.net/placesdb?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    app.listen(5000);
}).catch(err=>{
    console.log(err);
});

