var user = require("../models/userModel.js");

module.exports = function(app){

    app.get("/api/setupUsers", function(req, res){
        var users = [
            {
                fullname: "Trần Đức Minh",
                email: "123456789@gmail.com",
                username: "ducminh",
                password: "123456789"
            }
        ];
        user.create(users, function(err, results){
            res.send(results);
        })
    })
    
}