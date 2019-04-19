

let users = require("../models/userModel.js");
let Todos = require("../models/todoModel.js");

module.exports = function (app, passport) {


    app.get("/todos", function (req, res) {
        let userID = req.user._id;
        Todos.find({ userID: userID }, function (err, data) {
            if (err) {
                console.log("error api /todos")
            } else {
                res.json(data);
            }
        });
    });

    app.get("/todos/notDone", function (req, res) {
        let userID = req.user._id;
        Todos.find({ userID: userID, isDone: false }, function (err, data) {
            if (err) {
                console.log("error api /todos/notDone")
            }
            else {
                res.json(data);
            }
        })
    })


    app.put("/todo", function (req, res) {
        if (!req.body._id) {
            return res.status(500).send("ID is required!");
        }
        else {
            Todos.update({
                _id: req.body._id
            },
                {
                    text: req.body.text,
                    isDone: req.body.isDone
                },
                function (err, todo) {
                    if (err) {
                        res.status(500).json(err);
                    }
                    else {

                    }
                }
            )
        }
    })

    app.put("/todos", function (req, res) {
        let todosUpdate = req.body;
        for (i = 0; i < todosUpdate.length; i++) {
            Todos.update({
                _id: todosUpdate[i]._id
            },
                {
                    text: todosUpdate[i].text,
                    isDone: todosUpdate[i].isDone
                },
                function (err, todo) {
                    if (err) {
                        res.status(500).json(err);
                    }
                    else {

                    }
                }
            )
        }
        
    })

    app.post("/todo", function (req, res) {
        var newTodoSchema = {
            userID: req.body.userID,
            year: req.body.year,
            month: req.body.month,
            date: req.body.date,
            text: req.body.text,
            isDone: false
        };
        // console.log(req.body);

        Todos.create(newTodoSchema, function (err, todo) {
            if (err) {
                throw err;
            }
            else {
                console.log(todo);
            }
        })
    })

    app.delete("/todos", function (req, res) {
        let todosDelete = req.body;
        console.log(req.body);
        for (i = 0; i < todosDelete.length; i++) {
            console.log(todosDelete[i].isDone);
            if (todosDelete[i].isDone == true) {
                Todos.remove({
                    _id: todosDelete[i]._id
                },
                    function (err, todo) {
                        if (err) {
                            res.status(500).json(err);
                        }
                        else {

                        }
                    }
                )
            }

        }
    })

    app.delete("/todo/:id", function (req, res) {
        if(!req.params.id){
            return res.status(500).send("ID is required")
        }
        else{
            Todos.remove({
                _id: req.params.id
            },
            function (err, todo) {
                if(err){
                    res.status(500).json(err);
                }
                else{
                    res.json(todo);
                }
            }
            )
        }
    })
    /**
     * Trang đăng nhập
     */
    app.get("/login", function (req, res) {
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
     * Đăng xuất
     */
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/login');  //khi đã đăng xuất không thể vào được các trang secret
    });

}

