import Joi from "joi";
import Finance from "../models/Finance.js";
import { financeSchema, sendUpdate } from "./cashAdvanceController.js";


export const extractCategoryAndTotalAmount = (expenseLines) => {
  const fixedFields = [
      'Total Amount', 
      'Total Fare', 
      'Premium Amount', 
      'Total Cost', 
      'License Cost', 
      'Subscription Cost',  
      'Premium Cost',
      'Cost', 
      'Tip Amount',
  ];

  const results = [];
  let expenseTotalAmount = 0; 

  expenseLines.forEach(expenseLine => {
      if (expenseLine.lineItemStatus === 'approved') {
          const categoryName = expenseLine['Category Name'] || ''; 
          const keyFound = Object.entries(expenseLine).find(([key]) =>
              fixedFields.some(name => name.trim().toUpperCase() === key.trim().toUpperCase())
          );
          const totalAmount = keyFound ? Number(keyFound[1]) || 0 : 0; 
          expenseTotalAmount += totalAmount; 
          results.push({ categoryName, totalAmount });
      }
  });

  return { results, expenseTotalAmount };
};


export const getReimbursement = async(tenantId, empId)=>{
    try {
      // const {tenantId}= req.params
      console.log("tenantId", tenantId)

      const status = {
        PENDING_SETTLEMENT:"pending settlement",
      }

        const getNonTravelExpenseReports = await Finance.find({
          'reimbursementSchema.tenantId': tenantId,
          'reimbursementSchema.actionedUpon': false
      });

        if(!getNonTravelExpenseReports){
          return {success:true, message: `All are settled` };
        } else{

      console.log("non travel", getNonTravelExpenseReports )
      const nonTravelExpense = getNonTravelExpenseReports.map((report) => {
        // console.log("reports expense", JSON.stringify(report, null, 2)); 
      
        const {
          expenseHeaderId,
          expenseHeaderNumber,
          actionedUpon,
          settlementBy,
          expenseHeaderStatus,
          expenseLines,
          defaultCurrency,
          createdBy,
          expenseAmountStatus,
        } = report.reimbursementSchema;

        const {expenseTotalAmount,results} = extractCategoryAndTotalAmount(expenseLines);
      // console.log("expenseTotalAmount - result",expenseTotalAmount, "results", results)
      // const {totalExpenseAmount} =expenseAmountStatus
        return {
          expenseHeaderId,
          expenseHeaderNumber,
          expenseHeaderStatus,
          expenseTotalAmount:expenseTotalAmount,
          expenseLines:results,
          createdBy,
          defaultCurrency,
          settlementBy,
          actionedUpon
        };
      });
      
      console.log("nonTravelExpense", JSON.stringify(nonTravelExpense, null, 2));
      return nonTravelExpense;
        }
    } catch (error) {
        throw new Error ({error: 'Error in  fetching non travel expense reports', error});
    }
};

const nonTravelSchema = Joi.object({
  expenseHeaderId: Joi.string().required(),
  tenantId: Joi.string().required(),
})

//Expense Header Reports with status as pending Settlement updated to paid(Non Travel Expense Reports).
export const paidNonTravelExpenseReports = async (req, res, next) => {
  try {
    // Validate request parameters and body
    const [params, body] = await Promise.all([
      nonTravelSchema.validateAsync(req.params),
      financeSchema.validateAsync(req.body)
    ]);

    const { tenantId, expenseHeaderId } = params;
    const { getFinance } = body;

    const {name, empId} = getFinance
    console.log("Received Parameters:", { tenantId, expenseHeaderId });
    console.log("Received Body Data: non travel", { getFinance });

    const status = {
      APPROVED:'approved',
      PENDING_SETTLEMENT: 'pending settlement',
      PAID: 'paid',
    };

    const filter = {
      'reimbursementSchema.tenantId': tenantId,
      'reimbursementSchema.expenseHeaderId': expenseHeaderId,
      'reimbursementSchema.expenseHeaderStatus': status.PENDING_SETTLEMENT,
      'reimbursementSchema.actionedUpon': false
    };

    // Use findOneAndUpdate to find and update in one operation
    const updateResult = await Finance.findOne(
      filter,
    );

    if (!updateResult) {
      return res.status(404).json({ message: 'No matching document found for update' });
    }
  
    const {expenseLines,settlementBy, expenseHeaderStatus } = updateResult.reimbursementSchema

    const updatedExpenseLines = expenseLines.map((line) =>{
      const isPendingSettlement = line.lineItemStatus == status.APPROVED
     if(isPendingSettlement){
      return{
        ...line,
        lineItemStatus :status.PAID,
        settlementBy :{name, empId},
        expenseSettledDate: new Date(),
      }
     }
     return line
    })

    console.log("updatedExpenseLines", JSON.stringify(updatedExpenseLines, '', 2))

    updateResult.reimbursementSchema.expenseLines = updatedExpenseLines
    updateResult.reimbursementSchema.settlementBy = {name,empId}
    updateResult.reimbursementSchema.expenseHeaderStatus = status.PAID
    updateResult.reimbursementSchema.actionedUpon = true
    updateResult.reimbursementSchema.expenseSettledDate = new Date()

    const report = await updateResult.save()

    console.log("Update successful:", report);

    const payload={
      tenantId, expenseHeaderId, settlementBy:getFinance,expenseHeaderStatus:status.PAID, expenseSettledDate: new Date()
    }

    const options={
      action:'non-travel-paid',
      comments:'status update to paid for non travel expense report ',
      includeNonTravel:true
    }

    await sendUpdate(payload,options)
    return res.status(200).json({ message: 'Expense Paid successfully', result: updateResult });

  } catch (error) {
    console.error('Error updating non travel expense report status:', error.message);
    next(error);
    // Optionally return a 500 error response
    // return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};











