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
        return [];
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
// router.get("/attendanceReport", async (req, res) => {
//     try {
//         const { year, month, userId } = req.query;
//         const users = await allUsers();
//         const data = users.map(async (user) => {
//             return await userAttendance(user._id, year, month);
//         });
//         const reducedData = data.map(async (user) => {
//             return user.reduce((acc, curr) => {
//                 return acc + curr;
//             }, 0);
//         })
//         return res.json({ status: 'success', data });
//     } catch (error) {
//         return res.json({ status: 'error', error });
//     }
// })

// ATTENDANCE REPORT
router.get("/attendanceReport", async (req, res) => {
    try {
        const { year, month } = req.query;
        console.log(req.query);

        // const startDate = new Date(year, month, 1);
        // const endDate = new Date(year, month + 1, 1);
        const day = new Date().toISOString().slice(0, 10)
        console.log(await ATTENDANCE.find({ day: { $lte: "2023-03-31" } }));


        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const data = await ATTENDANCE.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate)
                    }
                }
            },
            {
                $group: {
                    _id: '$userId',
                    totalAttendance: { $sum: 1 },
                    lastAttendance: { $last: '$createdAt' }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $project: {
                    userId: '$_id',
                    totalAttendance: 1,
                    lastAttendance: 1,
                    user: {
                        name: 1,
                        email: 1
                    }
                }
            }
        ]);
        return res.json({ status: 'success', data });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error', error });
    }
})


module.exports = router
