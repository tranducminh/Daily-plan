var express = require("express");
var bodyParser = require("body-parser");    //đọc dữ liệu từ body
var morgan = require("morgan");             //hiện thị tất các api được gọi
var mongoose = require("mongoose");         
var flash = require('connect-flash');
var session = require("express-session");
var passport = require("passport");
var cookieParser = require('cookie-parser');    

var dbConfig = require("./config/dbConnection.js");
var passportConfig = require("./config/passport.js");

var setupController = require("./api/controller/setupController.js");
var userController = require("./api/controller/userController.js");


var app = express();
var port = process.env.PORT || 3000;

/**
 * 
 */
app.use("/assets", express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(session({ 
    secret: '1234567890',
    // cookie: {
    //     maxAge: 1000 * 5 //thời gian cookie còn hiệu lực mili giây
    // }
    // saveUninitialized: true,
    // resave: true 
}));
app.use(passport.initialize()); //Khởi tạo passport-local
app.use(passport.session());
app.use(flash());

/**
 * 
 */
setupController(app);
userController(app, passport);
passportConfig(passport);

//database connection
mongoose.connect(dbConfig.getDbConnectionString());

//Trang chủ
app.get("/", function(req, res){
    
    res.send("successful");
});


app.listen(port, function(){
    console.log("App is listening on port: " + port);
})
