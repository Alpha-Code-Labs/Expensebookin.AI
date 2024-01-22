const express = require("express");
const router = express.Router();
const travelExpense = require("../models/travelExpense");

router.get("/find" , async(req , res)=>{ 
    try {
        const singletravelExpenseData = await travelExpense.find();
        res.status(200).json(singletravelExpenseData)
    } catch (error) {
        res.status(500).json(error);
    }
});
router.put("/settlement" , async(req , res)=>{
    // console.log("LINE AT 15" , req.body);
    const id = req.body._id;
    // console.log("LINE AT 15" , id);

    try {
    const singletravelExpenseDataUpdate = await travelExpense.findByIdAndUpdate(
        id,
           {$set: {settlementFlag: true}} , // Update only the cashAdvanceStatus field
           { new: true } 
      );
  
      if (!singletravelExpenseDataUpdate) {
        return res.status(404).json({ message: `Element not found` });
      }
      res.status(200).json(singletravelExpenseDataUpdate);
    } catch (error) {
      console.log("LINE AT 30" , error.message);
      res.status(500).json(error);
    }
});

router.put("/unSettlement" , async(req , res)=>{
    console.log("LINE AT 37" , req.body);
    const id = req.body._id;
    console.log("LINE AT 39" , id);

    try {
    const singletravelExpenseDataUpdateAgain = await travelExpense.findByIdAndUpdate(
        id,
           {$set: {settlementFlag: false}} , // Update only the cashAdvanceStatus field
           { new: true } 
      );
  
      if (!singletravelExpenseDataUpdateAgain) {
        return res.status(404).json({ message: `Element not found` });
      }
      res.status(200).json(singletravelExpenseDataUpdateAgain);
    } catch (error) {
      console.log("LINE AT 53" , error.message);
      res.status(500).json(error);
    }
});

module.exports = router;