let mongoose = require("mongoose");
let Schema = mongoose.Schema;

var todoSchema = new Schema({
    userID: String,
    year: String,
    month: String,
    date: String,
    day: String,
    text: String,
    isDone: Boolean
})

var Todos = mongoose.model("todo", todoSchema);     //lưu schema vào database

module.exports = Todos;