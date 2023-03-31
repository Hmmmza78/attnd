const express = require('express');
const router = express.Router()
const { body, validationResult } = require('express-validator')
const DESIGNATION = require('../models/designation')



// ADD DESIGNATION


router.post('/add', [
    body('title').notEmpty()
], async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json(error)
    }
    try {
        let { title } = req.body
        const oldData = await DESIGNATION.findOne({ title })
        if (oldData != null) {
            return res.status(400).json({
                status: "error",
                message: "Designation already exists"
            })
        }
        const data = await DESIGNATION.create({ title })
        return res.json({
            status: "success",
            data
        })
    } catch (error) {
        return res.status(400).json({
            status: "error"
        })
    }

})



// UPDATE DESIGNATION


router.post('/edit', async (req, res) => {
    try {
        let { id } = req.body;
        let { title } = req.body
        const oldData = await DESIGNATION.findById(id)
        if (oldData == null) {
            return res.status(400).json({
                status: "error",
                message: "This designation does not exists"
            })
        }
        const data = await DESIGNATION.findByIdAndUpdate(id, { title })
        return res.json({
            status: "success",
            data: await DESIGNATION.findById(id)
        })
    } catch (error) {
        return res.status(400).json({
            status: "error"
        })
    }
})



// DELETE DESIGNATION


router.post('/delete', async (req, res) => {
    try {
        let { id } = req.body;
        const oldData = await DESIGNATION.findById(id)
        if (oldData == null) {
            return res.status(400).json({
                status: "error",
                message: "department does not exists"
            })
        }
        await DESIGNATION.findByIdAndDelete(id)
        return res.status(400).json({
            status: "success",
            message: "record deleted"
        })
    } catch (error) {
        return res.status(400).json({
            status: "error"
        })
    }
})



// GET ONE DESIGNATION


router.get('/getOne', async (req, res) => {
    try {
        let { id } = req.body;
        const data = await DESIGNATION.findById(id)
        return res.json({
            status: "success",
            data
        })
    } catch (error) {
        return res.status(400).json({
            status: "error"
        })
    }
})



// GET ALL DESIGNATION


router.get('/', async (req, res) => {
    try {
        const data = await DESIGNATION.find()
        return res.json({
            status: "success",
            data
        })
    } catch (error) {
        return res.status(400).json({
            status: "error"
        })
    }
})


module.exports = router
