let mongoose = require("mongoose");
let Schema = mongoose.Schema;

var todoDailySchema = new Schema({
    userID: String,
    text: String,
    isDone: Boolean
})

var TodoDailys = mongoose.model("todoDaily", todoDailySchema);     //lưu schema vào database

module.exports = TodoDailys;