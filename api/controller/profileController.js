let dateChange = require("./date.json");

module.exports = function (app) {
    /**
     * Thông tin user
     */
    app.get('/profile', isLoggedIn, function (req, res) {
        let time = new Date();
        
        res.render('profile.ejs', {
            user: req.user, // truyền đối tượng user cho profile.ejs để hiển thị lên view
            time: time,
            dateChange: dateChange
        });
    });
}
/**
 * kiểm tra đăng nhập hay chưa
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login'); // nếu chưa đăng nhâp điều hướng quay lại trang chủ
}