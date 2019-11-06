const isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) {
    require('dotenv').config()
}

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const User = require('../../models/user.model')

router.post('/register', (req, res) => {
    let { name, username, email, password, confirm_password } = req.body

    if (password !== confirm_password) {
        return res.status(400).json({
            message: "Password do not match."
        })
    }
    //Check for the unique username
    User.findOne({ username: username })
        .then(user => {
            if (user) {
                return res.status(400).json({
                    message: "Username is already taken."
                })
            } else {
                //check for the unique email
                User.findOne({ email: email })
                    .then(user => {
                        if (user) {
                            return res.status(400).json({
                                message: "Email is already registered."
                            })
                        } else {
                            createUser()
                        }
                    })
            }
        })


    //Register user
    function createUser() {
        let newUser = new User({
            name,
            username,
            email,
            password
        })
        //Hash the password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save().then(user => {
                    return res.status(200).json({
                        success: true,
                        message: "User created successfully"
                    })
                })
            })
        })
    }



})

router.post('/login', (req, res) => {
    const { username, password } = req.body
    User.findOne({ username: username }).then(user => {
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Username is not found"
            })
        }

        //Compare password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    _id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email
                }
                jwt.sign(payload, process.env.SECRET, {
                    expiresIn: 604800
                }, (err, token) => {
                    res.status(200).json({
                        success: true,
                        user: user,
                        token: `Bearer ${token}`,
                        message: 'You are now logged in.'
                    })
                })
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Incorrect password"
                })
            }
        })
    })
})

router.get('/get', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    return res.json({
        user: req.user
    })
})

module.exports = router;