// function test(params) {
//     try {
//         if (!params) throw new Error
//         console.log(params);
//     } catch (error) {
//         console.log("Hi");
//     }
// }

// test();
// test("with params")
// console.log("Hello world!");


const month = 2; // March

const startDate = new Date(2023, month, 1); // set start date to March 1, 2023
const endDate = new Date(2023, month + 1, 1); // set end date to April 1, 2023

AttendanceRecord.aggregate([
    {
        $match: {
            createdAt: {
                $gte: new Date(startOfMonth),
                $lte: new Date(endOfMonth)
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
], (err, results) => {
    if (err) {
        console.error(err);
    } else {
        console.log(results);
    }
});

