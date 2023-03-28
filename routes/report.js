const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const ATTENDANCE = require("../models/attendance");
const USER = require("../models/user");
const COMPANY_SETUP = require("../models/companySetup").findOne({});


const userAttendance = async (userId, year, month) => {
    try {
        const data = await ATTENDANCE.aggregate([
            {
                $match: {
                    user: mongoose.Types.ObjectId(userId),
                    date: { $gte: new Date(`${year}-${month}-01`), $lte: new Date(`${year}-${month}-31`) }
                }
            }
        ]);
        return data;
    } catch (error) {

    }
}

const allUsers = async () => {
    try {
        const data = await USER.find({});
        return data;
    } catch (error) {
        return [];
    }
}

// ATTENDANCE REPORT
router.get("/attendanceReport", async (req, res) => {
    try {
        const { year, month, userId } = req.query;
        const users = await allUsers();
        const data = await userAttendance(userId, year, month);
        return res.json({ status: 'success', data });
    } catch (error) {
        return res.json({ status: 'error', error });
    }
})


module.exports = router
