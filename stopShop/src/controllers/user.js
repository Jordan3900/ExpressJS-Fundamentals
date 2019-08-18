const User = require('mongoose').model('User');
const encryption = require('../utilities/encryption');

module.exports.registerGet = (req, res) => {
    res.render('user/register');
}

module.exports.registerPost = (req, res) => {
    let user = req.body;
    let passCheck = user.password && user.password !== user.confirmedPassword;
    if (passCheck) {
        let error = 'Password do not match.';
        res.render('user/register', {
            error
        });

        return;
    }
    let salt = encryption.generateSalt();
    user.salt = salt;

    if (user.password) {
        let hashedPassword = encryption.generateHashedPassword(salt, user.password);
        user.password = hashedPassword;
    }
User.create(user).then(user => {
    req.logIn(user, (error, user) => {
        if (error) {
            res.render('users/register', {
                error: 'Authentication not working!'
            });
            return;
        }

        res.redirect('/');
    });
}).catch(err => {
    res.render('user/register', {
        error: err.message
    });
});

};

module.exports.loginGet = (req, res) => {
    res.render('user/login');
}

module.exports.loginPost = (req, res) => {
    let userToLogin = req.body;

    User.findOne({username: userToLogin.username}).then(user => {
        if (!user || !user.authenticate(userToLogin.password)) {
            res.render('user/login', {error: 'invalid credentials!'})
        } else {
            req.logIn(user, (error, user) => {
                if (error) {
                    res.render('user/login', {error: 'Authentication not working!'})

                    return;
                }

                res.redirect('/')
            })
        }
    })
}

module.exports.logoutPost = (req, res) => {
    req.logout();
    res.redirect('/');
}

let salt = encryption.generateSalt();
User.salt