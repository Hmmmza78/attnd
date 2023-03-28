const dotenv = require('dotenv').config();
const express = require('express');
const app = express()
const mongoose = require('mongoose');



const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const attendanceRouter = require('./routes/attendance')
const updateRouter = require('./routes/update')
const taskRouter = require('./routes/task')
const pointRouter = require('./routes/point')
const leaderBoardRouter = require('./routes/leaderBoard')
const reportRouter = require('./routes/report')
const departmentRouter = require('./routes/department')
const designationRouter = require('./routes/designation')





// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded())


// routers
app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/attendance', attendanceRouter)
app.use('/update', updateRouter)
app.use('/task', taskRouter)
app.use('/point', pointRouter)
app.use('/leaderBoard', leaderBoardRouter)
app.use('/report', reportRouter)
app.use('/department', departmentRouter)
app.use('/designation', designationRouter)




// MONGOOSE CONNECTION
const connect = async () => {
    try {
        await mongoose.connect(process.env.DBURL)
        console.log('db connected');
    } catch (error) {
        console.log(error);
        console.log('db not connected');
    }
}


connect()


// SERVER STARTED
const PORT = process.env.PORT
app.listen(PORT, () => { console.log('server started') })

