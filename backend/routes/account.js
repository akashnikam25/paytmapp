const express = require('express')
const router = express.Router()
const { account } = require('../db')
const { authMiddleware } = require('../middleware')
const { default: mongoose } = require('mongoose')

router.get("/balance", authMiddleware, async (req , res)=>{
    const acc = await account.findOne({
        user:req._id
    }) 
    if (acc == null){
        res.status(404).json({
            msg:"User Not found"
        })
        return
    }
    res.status(200).json({
        Balance:acc.balance
    })

})

router.post("/transfer", authMiddleware, async(req, res)=>{
    const session = await mongoose.startSession()

    session.startTransaction();
    const {amt , to } = req.body

    const acc = await account.findOne({user:req._id}).session(session)

    if (acc == null || acc.balance < amt){
        await session.abortTransaction()
        return res.status(400).json({
            msg:"Insufficent balance"
        })
    }

    const toAcc = await account.findOne({user:to}).session(session)

    if (toAcc == null){
       await session.abortTransaction()

       return res.status(400).json({
        msg:"Invalid Account"
       })
    }

    await account.updateOne({user:req._id},{$inc : {balance: -amt}}).session(session);
    await account.updateOne({user:to},{$inc : {balance: amt}}).session(session);

    await session.commitTransaction();
    res.status(200).json({
        msg:"Transfer successful"
    })

})

module.exports = router 