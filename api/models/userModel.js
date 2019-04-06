let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt-nodejs');

let userSchema = new Schema({
    local: {
        fullname: String,
        email: String,
        username: String,
        password: String,
        photoURL:{
            type: String
        },
        locale: String

    },
    facebook: {
        id: String,
        token: String,
        displayname: String,
        email: String,
        firstname: String,
        lastname: String,
        fullname: String,
        middlename: String,
        photoURL: {
            type: String,
            //default: "",
        }
    },
    google: {
        id: String,
        token: String,
        displayname: String,
        firstname: String,
        lastname: String,
        fullname: String,
        photoURL: String,
        locale: String
    }
})

/**
 * Tạo mã hóa mật khẩu
 */
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

/**
 * Kiểm tra mật khẩu có trùng khớp
 */
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
}

let users = mongoose.model("user", userSchema);     //lưu schema vào database

module.exports = users;