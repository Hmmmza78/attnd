const express = require('express');
const router = express.Router()
const USER = require('../models/user')
const bcrypt = require('bcrypt');



// UPDATE A USER

router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                req.body.password = await bcrypt.hash(req.body.password, 10)
            } catch (error) {
                console.log(error);
                return res.status(400).json(error)
            }
        }
        try {
            const user = await USER.findByIdAndUpdate(req.params.id, { $set: req.body })
            return res.status(200).json({
                message: "Account updated successfully",
                user
            })
        } catch (error) {
            console.log(error);
            return res.status(400).json(error)
        }
    } else {
        return res.status(400).json("you can only update your account")
    }
})



// DELETE A USER

router.delete('/:id', async (req, res) => {
    try {
        if (req.body.userId === req.params.id || req.body.isAdmin) {
            const oldData = await USER.findById(req.body.userId)
            if (oldData == null) {
                return res.status(400).json("no user found")
            }
            await USER.findByIdAndDelete(oldData)
            return res.status(200).json("Account deleted")
        } else {
            return res.status(400).json("you can only delete your account")
        }
    } catch (error) {
        return res.status(400).json(error)
    }
})



// GET A USER


router.get('/:id', async (req, res) => {
    try {
        const user = await USER.findById(req.body.userId)
        if (user != null) {
            return res.json(user)
        }
    } catch (error) {
        return res.status(400).json(error)
    }
})



// GET ALL USERS


router.get('/', async(req, res)=>{
    try {
        const data = await USER.find()
        return res.json(data)
    } catch (error) {
        return res.status(400).json(error)
    }
})





module.exports = router