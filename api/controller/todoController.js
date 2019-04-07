let Todos = require("../models/todoModel.js");

module.exports = function (app) {
    /**
     * tạo thêm công việc mới
     */
    app.post("/todo", function (req, res) {
        var todo = {
            userID: req.body.userID,
            year: req.body.year,
            month: req.body.month,
            date: req.body.date,
            text: req.body.text,
            isDone: "false"
        }

        Todos.create(todo, function (err, todo) {
            if (err) {
                throw err;
            }
            else {

            }
        })
    })

    /**
     * tìm danh sách công việc theo time
     */
    app.get("/todo", function (req, res) {
        let todo = {

            year: "2019",
            month: "4",
            date: "12"
        }
        Todos.find({
            userID: req.user._id,
            year: "2019",
            month: "4",
            date: "12"
        }, function (err, todo) {
            if (err) {
                throw err;
            }
            else {
                res.json(todo);
            }
        })
    })
}