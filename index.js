var express = require('express');
var app = express();
mongoose = require("mongoose");
bodyParser = require("body-parser");
let path=require('path');
//Serves resources from public folder
app.use(express.static(path.join(__dirname,'public'))); 

//setting up viewing engine
app.set('view engine', 'ejs');
const secure = require('./security/secure');
//Initialization of body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//database connetion
mongoose.connect(secure.db, error => {
    if (error) console.log("error is " + error);
    else console.log("connected");
});

app.use("/", require("./routes/index"));
app.use("/",require('./routes/login'));
app.use('/',require('./routes/registration'));
app.use('/',require('./routes/logout'));
app.use('/',require('./routes/doctor'))
//connection to server
app.listen(secure.port, error => {
    if (error) console.log("error is " + error);
    else console.log("listening to port " + secure.port);

});
