const express = require('express');
const router = express.Router()
const { body, validationResult } = require('express-validator')
const ATTENDANCE = require('../models/attendance')


// CHECK IN API
router.post('/checkIn', [
    body('userId').notEmpty(),
    body('checkInLat').notEmpty(),
    body('checkInLon').notEmpty()
], async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({
            error: error.array()
        })
    }
    try {
        let { userId, checkInLat, checkInLon } = req.body
        const day = new Date().getDay()
        console.log(day);

        const checkInTime = Date.now()


        const oldData = await ATTENDANCE.findOne({ userId, day })

        if (oldData != null) {
            res.status(400).json({
                status: "error",
                message: "You've already checked in today"
            })
        }

        const data = await ATTENDANCE.create({ userId, checkInTime, checkInLat, checkInLon, day })

        res.json({
            message: "checked in successfull",
            data
        })


    } catch (error) {
        return res.status(400).json(error)
    }
})

// CHECK OUT API
router.post('/checkOut', [
    body('userId').notEmpty(),
    body('checkOutLat').notEmpty(),
    body('checkOutLon').notEmpty()
], async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({
            error: error.array()
        })
    }
    try {
        let { userId, checkOutLat, checkOutLon } = req.body
        const day = new Date().getDay()
        console.log(day);

        const checkOutTime = Date.now()


        const oldData = await ATTENDANCE.findOne({ userId, day })

        if (oldData == null) {
            return res.status(400).json({
                status: "error",
                message: "You've not checked in today"
            })
        }
        if (oldData.status == "checkedOut") {
            return res.status(400).json({
                status: "error",
                message: "You've already checked out today"
            })
        }

        const data = await ATTENDANCE.findOneAndUpdate({ userId, day }, { checkOutTime, checkOutLat, checkOutLon, status: "checkedOut" })

        res.json({
            message: "checked out successfull",
            data
        })


    } catch (error) {
        console.log(error.message);
        return res.status(400).json(error)
    }
})

router.get('/leaderBoard', async (req, res) => {
    try {
        // Query the attendance records collection to get the leaderBoard data
        const leaderBoardData = await ATTENDANCE.aggregate([
            {
                $group: {
                    _id: '$user',
                    totalAttendance: { $sum: 1 },
                    lastAttendance: { $max: '$date' }
                }
            },
            { $sort: { totalAttendance: -1, lastAttendance: -1 } }
        ]);

        // Format the data into a JSON response
        const leaderBoard = leaderBoardData.map((entry, index) => {
            return {
                rank: index + 1,
                user: entry._id,
                totalAttendance: entry.totalAttendance,
                lastAttendance: entry.lastAttendance
            };
        });

        res.status(200).json({ status: "success", data: leaderBoard });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching leaderBoard data' });
    }
});

// GET ALL API
router.get('/', async (req, res) => {
    try {

        const data = await ATTENDANCE.find()
        return res.json(data)
    } catch (error) {
        return res.status(400).json(error)
    }
})

// GET API
router.get('/:id', async (req, res) => {
    try {
        let { userId } = req.body
        const oldData = await ATTENDANCE.findOne({ userId })
        if (oldData == null) {
            return res.status(400).json({
                message: "No record found"
            })
        }
        return res.json({ status: "success", data: oldData })
    } catch (error) {
        return res.status(400).json(error)
    }
})


module.exports = router
