let users = require("../models/userModel.js");

module.exports = function (app, passport) {
    app.get("/api/users", function (req, res) {
        users.find(function (err, data) {
            if (err) {

            } else {
                res.json(data);
            }
        })
    });

    /**
     * Trang đăng nhập
     */
    app.get("/login", function (req, res) {
        // let userLogin = {
        //     username: "tienton",
        //     password: "123456789"
        // }
        // users.findOne({username: "tientoan"}, function (err, user) {
        //     let ps = user.password;
        //     console.log(ps);
        //     if(ps == "12345678"){
        //         res.render("profile");
        //     }
        //     else{
        //         res.render("login");
        //     }
        // })
        res.render("login.ejs", {
            // title: "Đăng nhập thành viên",
            // error: req.flash('Error'),
            // success: req.flash('Thành công')
            message: req.flash('loginMessage')
        });
    })

    /**
     * Xử lí form đăng nhập
     */
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',    //đăng nhập thành công điều hướng đến profile
        failureRedirect: '/login',  //đăng nhập không thành công thì điều hướng quay lại trang login
        failureFlash: true
    }));

    /**
     * Trang đăng kí
     */
    app.get('/signup', function (req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    /**
     * Xử lý form đăng ký
     */
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // đăng ký thành công điều hướng tới trang hiển thị profile
        failureRedirect: '/signup', // đăng ký không thành công thì điều hướng quay lại trang signup
        failureFlash: true
    }));

    /**
     * facebook-auth
     */
    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/login'
        })
    );

    /**
     * google-auth
     */
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile']
    }));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/profile',
            failureRedirect: '/login'
        })
    );


    /**
     * Thông tin user
     */
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user // truyền đối tượng user cho profile.ejs để hiển thị lên view
        });
    });

    /**
     * Đăng xuất
     */
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');  //khi đã đăng xuất không thể vào được các trang secret
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
    res.redirect('/'); // nếu chưa đăng nhâp điều hướng quay lại trang chủ
}