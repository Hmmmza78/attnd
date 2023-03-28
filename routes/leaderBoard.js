const router = require("express").Router();
const User = require('../models/user');
const Attendance = require('../models/attendance');

const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        return null;
    }
}

// router.get("/leaderBoard", async (req, res) => {
//     try {
//         const users = await getAllUsers();
//         if (users == null) {
//             return res.status(404).json({ message: "No users found" });
//         }
//         let data = [];
//         for (const user of users) {
//             data.push(await Attendance.find({ userId: user._id }));
//         }
//         return res.status(200).json({ status: "success", data });
//     } catch (error) {
//         return res.status(400).json({ status: "error", message: "Could not load data" });
//     }
// })



router.get('/leaderBoard', async (req, res) => {
    try {
        // Query the attendance records collection to get the leaderBoard data
        const leaderBoardData = await Attendance.aggregate([
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

        res.status(200).json(leaderBoard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching leaderBoard data' });
    }
});

module.exports = router;
