const express = require('express');
const bodyParser = require('body-parser')

const app = express();


let port = 5000;

app.use(bodyParser.urlencoded({extended: false}));

app.post("/user",(req, res, next) => {
    res.send(req.body.username);
});

app.get("/",(req,res,next)=>{
    res.send('<form action="/user" method="Post"><input type="text" name="username"/><button>Click Me</button> </form>');
});


app.listen(port);