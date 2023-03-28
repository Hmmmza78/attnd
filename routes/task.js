const express = require('express');
const router = express.Router()
const { body, validationResult } = require('express-validator')
const TASK = require('../models/task')
const {authenticateToken} = require("../middlewares/auth")


// ADD TASK


router.post('/add',authenticateToken, [
    body('name').notEmpty(),
    body('description').notEmpty(),
    body('startDate').notEmpty(),
    body('endDate').notEmpty(),
    body('assignedTo').notEmpty()
], async(req,res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({
            error: error.array()
        })
    }

    try {
        let { name, description, startDate, endDate, assignedTo } = req.body
        const data = await TASK.create({ name, description, startDate, endDate, assignedTo })

        return res.json({
            status: "success",
            data
        })


    } catch (error) {
        return res.status(400).json(error)
    }
})



// UPDATE TASK


router.put('/:id',authenticateToken, async(req,res)=>{
    try {
        let {id} = req.params
        const oldData = await TASK.findById(id)
        if(oldData == null){
            return res.status(400).json({
                status: "error",
                message: "record not found"
            })
        }
        await TASK.findByIdAndUpdate(id, {
            $set: req.body
        })
        return res.json({
            status: "success",
            data: await TASK.findById(id)
        })
    } catch (error) {
        return res.status(400).json(error)
    }
})



// DELETE TASK

router.delete('/:id',authenticateToken, async(req,res)=>{
    try {
        let {id} = req.params
        const oldData = await TASK.findById(id)
        if(oldData == null){
            return res.status(400).json({
                status: "error",
                message: "record not found"
            })
        }
        await TASK.findByIdAndDelete(id)
        return res.json({
            status: "success",
            message: "record deleted successfully"
        })
    } catch (error) {
        return res.status(400).json(error)
    }
})



// GET A TASK

router.get('/:id', async(req,res)=>{
    try {
        let {id} = req.params
        const data = await TASK.findById(id)
        if(data == null){
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



// GET ALL TASKS


router.get('/', async(req,res)=>{
    try {
        let {id} = req.params
        const data = await TASK.find()
        return res.json({
            status: "success",
            data
        })
    } catch (error) {
        return res.status(400).json(error)
    }
})


module.exports = router