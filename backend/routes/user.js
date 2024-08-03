const express = require('express');
const router = express.Router();
const { userType, loginUser, updateBody } = require("../types");
const {users, account} = require('../db')
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config')
const { authMiddleware } = require('../middleware')

router.post("/signup",async (req, res)=>{
    const parsePayLoad = userType.safeParse(req.body)
    if (!parsePayLoad.success){
         res.status(411).json({
            msg: "You sent the wrong inputs"
        })
        return
    }
    
    let u = await users.findOne(createPayLoad)
    if (u != null){
        res.status(409).json({
        msg:"UserName is already exist"
      })
      return
    }

    try {
        u = await users.create({
        username:createPayLoad.username,
        firstName:createPayLoad.firstName,
        lastName:createPayLoad.lastName,
        password:createPayLoad.password
    })
    } catch (error) {
       res.status(411).json({
        message: error.message
    })
    return
    }

   try {
    await account.create({
        user:u._id,
        balance: 1 + Math.random() * 10000
    })
   } catch (error) {
     res.status(411).json({
        Message:"account balance is not updated",
        error:error.message
     })
   }

    const token = jwt.sign({ _id: u._id.toString() }, JWT_SECRET, {
    expiresIn: '1h',
    });
    res.status(201).json({
        msg:"user created Successfully",
        authorization:'Bearer ' + token
    })
})

router.post("/signin",async (req, res)=>{
    const parsePayLoad = loginUser.safeParse(req.body)
    if(!parsePayLoad.success){
        res.status(411).json({
            msg:"You sent the wrong inputs"
        })
        return
    }

    const u = await users.findOne(req.body)
    if (u == null){
        res.status(404).json({
        msg:"User Not Found"
      })
      return
    }

   const token = jwt.sign({ _id: u._id.toString() }, JWT_SECRET, { expiresIn: '1h',});
    res.status(200).json({
        msg:"User is signed in",
        authorization:'Bearer ' + token
    })
    

})

router.put("/update",authMiddleware, async (req, res)=>{
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }
     
    if (bodyPayLoad.firstName != ""){
        update.firstName = bodyPayLoad.firstName 
    }
    if (bodyPayLoad.lastName != ""){
        update.lastName = bodyPayLoad.lastName 
    }
    if (bodyPayLoad.password != ""){
        update.password = bodyPayLoad.password 
    }

    if (req._id == ""){
         res.status(411).json({
            msg: "You sent the wrong inputs"
        })
        return
    }
    let u;
    try {
        u = await users.findOneAndUpdate({_id: req._id}, update, {runValidators: true})
    } catch (error) {
       res.status(411).json({
        message: error.message
    })
    return
    }
    if (u == null){
        res.status(404).json({
        msg:"User Not Found"
      })
      return
    }

    res.status(200).json({
        message: "Updated successfully"

    })

    return
    

})

router.get("/bulk",authMiddleware, async (req, res)=>{
     
    const name = req.query.filter

    let u
    if (name === "all"){
        u = await users.find()
    }else{
        try {
        u = await users.find({
            $or:[
                {firstName:name},
                {lastName:name}
            ]
        })
        } catch (error) {
        res.status(411).json({
        message: error.message
        })
        return
    }
    }
    
    if (u.length == 0){
        res.status(404).json({
        message: "Users not Founds"
    })
    return
    }
    let accounHolderName = u.filter(user => user._id.toString() === req._id).map(user=>({
             firstName: user.firstName
        }))
    res.status(200).json({
        userList: u.filter(user => user._id.toString() !== req._id).map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        })),
        accounHolderName
    })

})
 

module.exports = router;

