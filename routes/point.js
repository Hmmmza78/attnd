const express = require('express');
const router = express.Router()
const { body, validationResult } = require("express-validator")
const POINT = require('../models/point')


// ADD POINTS

router.post('/add', [
    body('title').notEmpty(),
    body('userId').notEmpty(),
    body('taskId').notEmpty(),
], async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({
            error: error.array()
        })
    }
    try {
        let { title, userId, taskId } = req.body
        const data = await POINT.create({
            title, userId, taskId
        })
        return res.json({
            status: "success",
            data
        })
    } catch (error) {
        return res.status(400).json(error)
    }
})




// UPDATE POINT

router.post('/edit', async (req, res) => {
    try {
        let { id } = req.body;
        const oldData = await POINT.findById(id)
        if (oldData == null) {
            return res.status(400).json({
                status: "error",
                message: "no record found"
            })
        }
        await POINT.findByIdAndUpdate(id, {
            $set: req.body
        })
        return res.json({
            status: "success",
            data: await POINT.findById(id)
        })

    } catch (error) {
        return res.status(400).json(error)
    }
})


// DELETE POINT

router.post('/delete', async (req, res) => {
    try {
        let { id } = req.body;
        const oldData = await POINT.findById(id)
        if (oldData == null) {
            return res.status(400).json({
                status: "error",
                message: "no record found"
            })
        }
        await POINT.findByIdAndDelete(id)
        return res.json({
            status: "success",
            message: "record deleted successfully"
        })
    } catch (error) {
        return res.status(400).json(error)
    }
})



// GET A POINT

router.get('/getOne', async (req, res) => {
    try {
        let { id } = req.body;
        const data = await POINT.findById(id)
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



// GET ALL POINTS

router.get('/', async (req, res) => {
    try {
        const data = await POINT.find()
        return res.json({
            status: "success",
            data
        })
    } catch (error) {
        return res.status(400).json(error)
    }
})





module.exports = router


