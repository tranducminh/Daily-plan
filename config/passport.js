
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;

var User = require('../api/models/userModel.js');
var configAuth = require('./config.json');


module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    /**
     * 
     */
    passport.use('local-login', new LocalStrategy({
        // giá trị mặc định 
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // chuyển lại toàn bộ request cho hàm callback
    },
        function (req, username, password, done) {

            //Tìm kiếm username trong db
            User.findOne({ 'local.username': username }, function (err, user) {
                if (err)
                    return done(err);

                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.'));

                //đúng username, sai password
                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Password wrong'));

                //successful
                return done(null, user);
            });

        }
    ));


    /**
     * 
     */
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, username, password, done) {
            process.nextTick(function () {   //nextTick: thực hiện lời gọi hàm callback ngay lập tức
                User.findOne({ 'local.username': username }, function (err, user) {
                    if (err)
                        return done(err);

                    //username đã tồn tại
                    if (user) {
                        //alert("user đã tồn tại");
                        return done(null, false, req.flash('signupMessage', 'username  đã tồn tại .'));
                    }

                    else {
                        //lấy các thông tin từ form đăng ký
                        var newUser = new User();
                        newUser.local.username = username;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.local.email = req.body.email;
                        newUser.local.fullname = req.body.fullname;

                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }

                });

            });

        }
    ));

    /**
     * Google authenticate
     */
    passport.use(new GoogleStrategy({
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL,
    },
    function (accessToken, refreshToken, profile, done) {
        process.nextTick(function(){
            User.findOne({"google.id": profile.id}, function(err, user){
                //Nếu lỗi
                if(err){
                    return done(err);
                }

                //Nếu tài khoản đã tồn tại thì cho phép đăng nhập
                if(user){
                    return done(null, user);
                }

                //id chưa được đăng ký thì tạo tài khoản mới
                else{
                    let  newUser = new User();
                    console.log(profile);
                    newUser.google.id = profile.id;
                    newUser.google.token = accessToken;
                    newUser.google.displayname = profile.displayName;
                    newUser.google.firstname = profile.name.givenName;
                    newUser.google.lastname = profile.name.familyName;
                    newUser.google.fullname = profile.name.givenName + " " +  profile.name.familyName ;
                    newUser.google.photoURL = profile.photos[0].value;
                    newUser.google.locale = profile._json.locale;
                    
                    newUser.save(function(err){
                        if(err){
                            throw(err);
                        }
                        else{
                            return done(null, newUser);
                        }
                    })
                }
            })
        })
    }
    ));

    /**
     * Facebook authenticate
     */
    passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields:["id", "displayName", "emails", "photos", "first_name", "last_name", "middle_name"]
    },
    function (accessToken, refreshToken, profile, done) {
        process.nextTick(function(){
            User.findOne({"facebook.id": profile.id}, function(err, user){
                //Nếu lỗi
                if(err){
                    return done(err);
                }

                //Nếu tài khoản đã tồn tại thì cho phép đăng nhập
                if(user){
                    return done(null, user);
                }

                //id chưa được đăng ký thì tạo tài khoản mới
                else{
                    let  newUser = new User();

                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = accessToken;
                    newUser.facebook.displayname = profile.displayName;
                    newUser.facebook.firstname = profile.givenName;
                    newUser.facebook.lastname = profile.familyName;
                    newUser.facebook.fullname = profile.givenName + " " +  profile.familyName ;
                    newUser.facebook.email = profile.emails[0].value;
                    newUser.facebook.middlename = profile.middleName;
                    newUser.facebook.photoURL = profile.photos[0].value;
                    
                    newUser.save(function(err){
                        if(err){
                            throw(err);
                        }
                        else{
                            return done(null, newUser);
                        }
                    })
                }
            })
        })
    }
    ));

};


