const express = require('express');
const router = express.Router()
const { body, validationResult } = require('express-validator')
const UPDATE = require('../models/update')
const ATTENDANCE = require('../models/attendance')



// CREATE UPDATE

router.post('/add', [
    body('userId').notEmpty(),
    body('link').notEmpty(),
    body('description').notEmpty()
], async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({
            error: error.array()
        })
    }
    try {
        let { userId, description, link } = req.body
        const day = new Date().getDay()

        const attendanceData = await ATTENDANCE.findOne({ userId, day })

        if (attendanceData == null) {
            return res.status(400).json({
                status: "error",
                message: "You have not checked in yet"
            })
        }


        if (attendanceData.status == "checkedOut") {
            return res.status(400).json({
                status: "error",
                message: "You have already checked out"
            })
        }

        const oldData = await UPDATE.findOne({ userId, description, link })
        if (oldData != null) {
            return res.status(400).json({
                status: "error",
                message: "you can update only once"
            })
        }
        const data = await UPDATE.create({ userId, description, link })
        return res.json({
            message: "update added",
            data
        })

    } catch (error) {
        console.log(error.message);
        return res.status(400).json(error)
    }
})



// GET AN UPDATE

router.get('/getOne', async (req, res) => {
    try {
        let { id } = req.body;
        const data = await UPDATE.findById(id)
        if (data == null) {
            return res.status(400).json({
                status: "error",
                message: "invalid id"
            })
        }
        return res.json({
            status: "success",
            data
        })
    } catch (error) {
        return res.status(400).json(error)
    }
})



// GET ALL UPDATES

router.get('/', async (req, res) => {
    try {
        const data = await UPDATE.find()
        return res.json({
            status: "success",
            data
        })
    } catch (error) {
        return res.status(400).json(error)
    }
})


module.exports = router
