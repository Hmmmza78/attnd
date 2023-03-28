const express = require('express');
const router = express.Router()
const { body, validationResult } = require('express-validator')
const NOTICE = require('../models/notice')



// ADD NOTICE


router.post('/add', [
    body('title').notEmpty()
], async(req,res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json(error)
    }
    try {
        let {title} = req.body
        const data = await NOTICE.create({title})
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



// UPDATE NOTICE


router.put('/:id', async(req,res)=>{
    try {
        let {id} = req.params
        let {title} = req.body
        const oldData = await NOTICE.findById(id)
        if(oldData == null){
            return res.status(400).json({
                status: "error",
                message: "Notice does not exists"
            })
        }
        const data = await NOTICE.findByIdAndUpdate(id,{title})
        return res.json({
            status: "success",
            data: await NOTICE.findById(id)
        })
    } catch (error) {
        return res.status(400).json({
            status: "error"
        })
    }
})



// DELETE NOTICE


router.delete('/:id', async(req,res)=>{
    try {
        let {id} = req.params
        const oldData = await NOTICE.findById(id)
        if(oldData == null){
            return res.status(400).json({
                status: "error",
                message: "notice does not exists"
            })
        }
        await NOTICE.findByIdAndDelete(id)
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



// GET ONE NOTICE


router.get('/:id', async(req,res)=>{
    try {
        let {id} = req.params
        const data = await NOTICE.findById(id)
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



// GET ALL NOTICES


router.get('/', async(req,res)=>{
    try {
        const data = await NOTICE.find()
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