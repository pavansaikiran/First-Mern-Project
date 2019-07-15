const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../../middleware/auth')

router.post('/',(req,res) => {
    const { email , password } = req.body
    if(!email||!password) res.status(400).json({ msg : "Please Enter All Fields"})
    else{
        User.findOne({email})
            .then(user => {
                if(!user) res.status(400).json({ msg : "User Doesn't Exist"})

                //Validate password using bcrypt
                bcrypt.compare(password , user.password)
                    .then(flag => {
                        if(!flag) res.status(400).json({ msg : "Invalid Crendentials"})
                        jwt.sign(
                            { id :user._id},
                            config.get('jwtSecret'),
                            { expiresIn: 3600 },
                            (err,token) => {
                                res.json({
                                    token,
                                    user: {
                                        id : user._id,
                                        email : user.email,
                                        name : user.name,
                                        password : user.password
                                    }
                                })
                            }
                        )
                        
                    })
            })
    }
})
router.get('/user',auth,(req,res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
})


module.exports = router