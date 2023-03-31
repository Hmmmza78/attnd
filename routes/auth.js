const express = require('express');
const router = express.Router()
const USER = require('../models/user')
const { body, validationResult } = require("express-validator")
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken')




// REGISTER

router.post('/register', [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('password').notEmpty({ min: 6 }),
    body('phoneNumber').notEmpty(),
    body('title').notEmpty(),
    body('jobType').notEmpty(),
    body('isAdmin').notEmpty()
],
    async (req, res) => {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() })
        }

        try {
            let { name, email, password, phoneNumber, title, jobType, isAdmin } = req.body
            const oldData = await USER.findOne(
                { $or: [{ email }, { phoneNumber }] })
            if (oldData) {
                return res.status(400).json({ message: 'user already exists!' })
            }

            password = await bcrypt.hash(password, 15)

            const data = await USER.create({ name, email, password, phoneNumber, title, jobType, isAdmin })

            return res.status(200).json({
                message: 'user successfully registered',
                data
            })

        } catch (error) {
            console.log(error.message);
            return res.status(400).json({
                message: 'provide correct parameters'
            })
        }

    })


// LOGIN

router.post('/login', [
    body('email').isEmail(),
    body('password').notEmpty()
], async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }
    try {
        let { email, password } = req.body;
        // for admin
        // if (email == "admin@lightouse.dev" && password == "admin") {
        //     const token = await JWT.sign(true, process.env.ACCESS_TOKEN_SECRET);
        //     return res.status(200).json({ message: "login successful", data: "admin", token })
        // }
        const oldData = await USER.findOne({ email })
        if (oldData == null) {
            return res.status(400).json({ message: "user does not exists!", data: null })
        }
        const result_password = await bcrypt.compare(password, oldData.password)
        if (!result_password) {
            return res.status(400).json({ status: "error", message: "wrong password!", data: null })
        }
        const token = await JWT.sign(oldData.isAdmin, process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).json({ message: "login successful", data: oldData, token })

    } catch (error) {
        // console.log(error.message);
        return res.status(400).json({ message: "provide correct parameters!", data: null })
    }
})






module.exports = router
