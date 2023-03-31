module.exports = function (app) {
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
    const noticeRouter = require('./routes/notice')

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
    app.use('/notice', noticeRouter)

}
