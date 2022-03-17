const express = require('express');
const bodyParser = require('body-parser');

const HttpError = require('./models/HttpError');
const QuestionsRoutes = require("./routes/questionsRoutes");
const AuthenticationRoutes = require("./routes/AuthenticationRoutes");

let port = 8080;

const app = express();

app.use(bodyParser.json());

//allow cors
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH');

    next();
});

app.use('/basicauth',AuthenticationRoutes);
app.use('/questions',QuestionsRoutes); //adding path param to use() is not mandatory
//if added -> the request will only be directed to questionRoutes if it STARTS with "question" (doesn't have to be an exact match)



app.use((req,res,next)=>{ //default error route- will reach if no other route sends back response
    throw new HttpError('Error 404: Page Not Found',404);
});

app.use((error,req,res,next) => {
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || "An unknown error has occured"});
});



app.listen(port);