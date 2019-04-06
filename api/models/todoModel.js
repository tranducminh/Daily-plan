let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let todoSchema = new Schema({
    userID: String,
    year: String,
    month: String,
    date: String,
    day: String,
    text: String,
    isDone: Boolean
})

let todos = mongoose.model("todo", todoSchema);     //lưu schema vào database

module.exports = todos;