import HRCompany from '../model/hr_company_structure.js'
import { updateAccountLinesAndExpenseCategories } from '../routines/updateAccountLInesAndExenseCategories.js'
import { expenseCategories } from '../data/expenseCategories.js'


const handleUpload = async (req, res) => {
  // Handle the uploaded file
  //console.log(req, 'req.file')
  res.json({ message: 'File uploaded successfully!', fileName: req.file.filename});
}

const updateTenantCompanyInfo = async (req, res) => {
  try{
    const {tenantId} = req.params
    const {companyInfo} = req.body

    //validate companyInfo
    console.log(companyInfo)
    const {defaultCurrency, companyName, companyHQ, businessCategory, teamSize, companyEmail} = companyInfo
    //see if tenant exists
    const tenant = await HRCompany.findOne({tenantId})
    if(!tenant) return res.status(404).json({message: 'Tenant not found'})

    //update tenant companyInfo
    tenant.companyDetails = {defaultCurrency, companyName, companySize:teamSize, companyHeadquarters: companyHQ, industry:businessCategory, companyEmail:companyEmail, companyLogo: ""}
    await tenant.save()

    return res.status(200).json({message: 'Company Information updated'})
    
  }catch(e){
    console.log(e)
    return res.status(500).json({message: 'Internal Server Error'})
  }
}

const getTenantCompanyInfo = async (req, res) => {
  try {
      // Get the tenantId from params
      const { tenantId } = req.params;
  
      // Find the HRCompany document by its tenantId
      const companyDetails = await HRCompany.findOne({ tenantId }, {companyDetails:1});
      if(!companyDetails) return res.status(404).json({message: 'Tenant not found'})
  
      res.status(200).json(companyDetails); // Respond with the HRCompany data
  } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

const updateExistingHrCompanyInfo = async (req, res) => {
    try {
        // Get the tenantId from the request body
        const { tenantId } = req.body;
    
        // Find the HRCompany document by its tenantId and update it with the data from the request body
        const updatedHRCompany = await HRCompany.findOneAndUpdate({ tenantId: tenantId }, req.body, { new: true });
    
        res.status(200).json(updatedHRCompany); // Respond with the updated HRCompany data
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getTenantHRMaster = async (req, res) => {
    try {
        // Get the tenantId from params
        const { tenantId } = req.params;
    
        // Find the HRCompany document by its tenantId
        const hrCompany = await HRCompany.findOne({ tenantId: tenantId });
    
        res.status(200).json(hrCompany); // Respond with the HRCompany data
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getTenantEmployees = async (req, res) => {
    try {
        // Get the tenantId from params
        const { tenantId } = req.params;
    
        // Find the HRCompany document by its tenantId
        const hrCompany = await HRCompany.findOne({ tenantId: tenantId });
    
        res.status(200).json(hrCompany.employees); // Respond with the employees data
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateTenantEmployeeDetails = async (req, res) => {
    try {
        // Get the tenantId from params
        const { tenantId } = req.params;
        const { employeeDetails } = req.body;
        console.log(employeeDetails, 'employeeDetails')
        // Get current employees array from the HRCompany document
        let employees = await HRCompany.findOne({ tenantId: tenantId }, {employees:1});

        //update the employees object with the new employeeDetails
        employees.employeeDetails = employeeDetails

        // Find the HRCompany document by its tenantId and update it with the data from the request body
        const updatedHRCompany = await HRCompany.findOneAndUpdate({ tenantId: tenantId }, {$set: employees}, { new: true });
    
        res.status(200).json(updatedHRCompany); // Respond with the updated HRCompany data
    } catch (error) {
        console.log(error, 'error')
        res.status(500).json({ error: 'Internal Server Error'});

    }
}

const getTenantEmployee = async (req, res) => {
    try {
        // Get the tenantId from params
        const { tenantId, employeeId } = req.params;
    
        // Find the HRCompany document by its tenantId
        const hrCompany = await HRCompany.findOne({ tenantId: tenantId });
    
        // Find the employee with the given employeeId
        const employee = hrCompany.employees.find((employee) => employee.employeeDetails.employeeId === employeeId);
    
        res.status(200).json(employee); // Respond with the employee data
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getTenantOrgHeaders = async (req, res) => {
    try {
        // Get the tenantId from params
        const { tenantId } = req.params;
    
        // Find the HRCompany document by its tenantId
        const hrCompany = await HRCompany.findOne({ tenantId: tenantId }, {orgHeaders:1});
        res.status(200).json(hrCompany); // Respond with the HRCompany data after removing the employees array
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getTenantFlags = async (req, res) => {
    try {
        // Get the tenantId from params
        const { tenantId } = req.params;
    
        // Find the HRCompany document by its tenantId
        const hrCompany = await HRCompany.findOne({ tenantId: tenantId }, {flags:1});
        
        if(!hrCompany){
          res.status(404).json('tenant not found')
          return
        }

        res.status(200).json({flags:hrCompany.flags}); 
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getTenantGroupHeaders = async (req, res) => {
    try {
        // Get the tenantId from params
        const { tenantId } = req.params;
    
        // Find the HRCompany document by its tenantId
        const hrCompany = await HRCompany.findOne({ tenantId: tenantId }, {groupHeaders:1});
        res.status(200).json(hrCompany); // Respond with the HRCompany data after removing the employees array
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateTenantOrgHeaders = async (req, res) => {
    try {
        // Get the tenantId from params
        const { tenantId } = req.params;
        const { orgHeaders } = req.body;
        console.log(orgHeaders, 'orgHeaders')

        const hrCompany = await HRCompany.findOne({ tenantId: tenantId });
        hrCompany.orgHeaders = orgHeaders
        // Find the HRCompany document by its tenantId and update it with the data from the request body
        const updatedHRCompany = await HRCompany.findOneAndUpdate({ tenantId: tenantId }, hrCompany, { new: true });
        console.log(updatedHRCompany, 'updatedHRCompany')
        
        //send updates to other microservices
        //const update_res = await sendUpdatedReplica({orgHeaders})
        //update needed to handle update_res

        res.status(200).json(updatedHRCompany); // Respond with the updated HRCompany data
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


const updateTenantTravelAllocationFlags = async (req, res) => {
  try{
    const {tenantId} = req.params
    const {travelAllocationFlags} = req.body

    if(!tenantId || !travelAllocationFlags) return res.status(400).json({message: 'Bad request. Missing required fields'})

    //check tenant
    const tenant = await HRCompany.findOne({tenantId}, {tenantId:1, travelAllocationFlags:1})
    if(!tenant) return res.status(404).json({message: 'Tenant not found'})


    //default travel allocations and travel categories
    let travel_allocations, travel_expenseCategories

    if(travelAllocationFlags.level1){
        travel_allocations = {
          allocation: [],
          expenseAllocation: [],
          allocation_accountLine: null,
          expenseAllocation_accountLine: null,
        }
        travel_expenseCategories = expenseCategories
    }

    else if(travelAllocationFlags.level2){
      travel_allocations = {
        international:{
            allocation: [],
            expenseAllocation: [],
            allocation_accountLine: null,
            expenseAllocation_accountLine: null,
        },
        domestic:{
            allocation: [],
            expenseAllocation: [],
            allocation_accountLine: null,
            expenseAllocation_accountLine: null,
        },
        local:{
            allocation: [],
            expenseAllocation: [],
            allocation_accountLine: null,
            expenseAllocation_accountLine: null,
        }
      }

      travel_expenseCategories = [
        {international: expenseCategories},
        {domestic: expenseCategories},
        {local: expenseCategories}
      ]
    }

    else if(travelAllocationFlags.level3){
      travel_allocations = {
        international: expenseCategories.map(category=>{
            if(category.hasOwnProperty('class')){
                return {
                    categoryName: category.categoryName,
                    allocation: [],
                    expenseAllocation: [],
                    allocationAccountLine: null,
                    expenseAllcationAccountLine: null,
                    fields:category.fields, 
                    class:category.class,
                }
            }
            else {
                return {
                    categoryName: category.categoryName,
                    allocation: [],
                    expenseAllocation: [],
                    allocationAccountLine: null,
                    expenseAllcationAccountLine: null,
                    fields:category.fields, 
                }
            }
        }),
    
        domestic: expenseCategories.map(category=>{
            if(category.hasOwnProperty('class')){
                return {
                    categoryName: category.categoryName,
                    allocation: [],
                    expenseAllocation: [],
                    allocationAccountLine: null,
                    expenseAllcationAccountLine: null,
                    fields:category.fields, 
                    class:category.class,
                }
            }
            else {
                return {
                    categoryName: category.categoryName,
                    allocation: [],
                    expenseAllocation: [],
                    allocationAccountLine: null,
                    expenseAllcationAccountLine: null,
                    fields:category.fields, 
                }
            }
        }),
    
        local: expenseCategories.map(category=>{
            if(category.hasOwnProperty('class')){
                return {
                    categoryName: category.categoryName,
                    allocation: [],
                    expenseAllocation: [],
                    allocationAccountLine: null,
                    expenseAllcationAccountLine: null,
                    fields:category.fields, 
                    class:category.class,
                }
            }
            else {
                return {
                    categoryName: category.categoryName,
                    allocation: [],
                    expenseAllocation: [],
                    allocationAccountLine: null,
                    expenseAllcationAccountLine: null,
                    fields:category.fields, 
                }
            }
        }),
      }

      travel_expenseCategories =  Object.keys(travel_allocations).map(traveltype=>{
        return ({[traveltype]: travel_allocations[traveltype].map(cat=>{
            if(cat.hasOwnProperty('class')) return({categoryName:cat.categoryName, fields:cat.fields, class:cat.class})
            else return({categoryName:cat.categoryName, fields:cat.fields, class:cat.class})
        })
    })      
    })
    } 

    //check if the last submitted flags are same as current submitted flags if not update flags and reset everything
    if(JSON.stringify(tenant.travelAllocationFlags) != JSON.stringify(travelAllocationFlags)){
      await HRCompany.findOneAndUpdate({tenantId}, {$set:{travelAllocationFlags, travelAllocations:travel_allocations, travelExpenseCategories:travel_expenseCategories, policies:{...tenant.policies, travelPolicies:{}} }})
      return res.status(200).json({message: 'Tenant travelAllocationFlags updated'})
    }else{
      return res.status(200).json({message: 'Travel Allocation Flags up to date'})
    }

  }catch(e){
    console.log(e)
    return res.status(500).json({message: 'Internal Server Error'})
  }
}

const getTenantTravelAllocationFlags = async (req, res) =>{
  try{
    const {tenantId} = req.params

    if(!tenantId) return res.status(400).json({message: 'Bad request. Missing required fields'})

    //check tenant
    const tenant = await HRCompany.findOne({tenantId}, {travelAllocationFlags:1})
    if(!tenant) return res.status(404).json({message: 'Tenant not found'})

    return res.status(200).json({travelAllocationFlags: tenant?.travelAllocationFlags??{}})
  }catch(e){
    console.log(e)
    return res.status(500).json({message: 'Internal Server Error'})
  }
}

const updateTenantTravelExpenseCategories = async (req, res) => {
  try{
    const {tenantId} = req.params
    const {travelExpenseCategories} = req.body

    if(!tenantId || !travelExpenseCategories) return res.status(400).json({message: 'Bad request. Missing required fields'})

    //check tenant
    const tenant = await HRCompany.findOne({tenantId})
    if(!tenant) return res.status(404).json({message: 'Tenant not found'})

    //update tenant state
    //await HRCompany.findOneAndUpdate({tenantId}, {$set:{travelExpenseCategories}})
    tenant.travelExpenseCategories = travelExpenseCategories
  
    await tenant.save()
    return res.status(200).json({message: 'Tenant travelExpenseCategories updated'})

  }catch(e){
    console.log(e)
    return res.status(500).json({message: 'Internal Server Error'})
  }
}

const getTenantTravelExpenseCategories = async (req, res) => {
  try{
    const {tenantId} = req.params

    if(!tenantId) return res.status(400).json({message: 'Bad request. Missing required fields'})

    //check tenant
    const tenant = await HRCompany.findOne({tenantId})
    if(!tenant) return res.status(404).json({message: 'Tenant not found'})

    return res.status(200).json({travelExpenseCategories: tenant?.travelExpenseCategories??{}})

  }catch(e){
    console.log(e)
    return res.status(500).json({message: 'Internal Server Error'})
  }
}

const updateTenantReimbursementExpenseCategories = async (req, res) => {
  try{
    const {tenantId} = req.params
    const {reimbursementExpenseCategories} = req.body

    if(!tenantId || !reimbursementExpenseCategories) return res.status(400).json({message: 'Bad request. Missing required fields'})

    //check tenant
    const tenant = await HRCompany.findOne({tenantId}, {tenantId})
    if(!tenant) return res.status(404).json({message: 'Tenant not found'})

    //update tenant reimbursementExpenseCategories
    tenant.reimbursementExpenseCategories = reimbursementExpenseCategories

    // const tmpPolicies =  reimbursementExpenseCategories.map(category=>{
    //       return({
    //         [category.categoryName] : {
    //           limit: {amount:null, currency:{}, violationMessage: ''}
    //         }
    //       })
    //     })

    // //group name is 'All'
    // const nonTravelPolicies = [{ 'All' : {...tmpPolicies} }]
    // tenant.policies.nonTravelPolicies = nonTravelPolicies
    
    //save updated tenant
    tenant.save()
    return res.status(200).json({message: 'Tenant reimbursementExpenseCategories updated'})

  }catch(e){
    console.log(e)
    return res.status(500).json({message: 'Internal Server Error'})
  }
}

const getTenantReimbursementExpenseCategories = async (req, res) => {
  try{
    const {tenantId} = req.params

    if(!tenantId) return res.status(400).json({message: 'Bad request. Missing required fields'})

    //check tenant
    const tenant = await HRCompany.findOne({tenantId}, {reimbursementExpenseCategories:1})
    if(!tenant) return res.status(404).json({message: 'Tenant not found'})

    return res.status(200).json({reimbursementExpenseCategories: tenant?.reimbursementExpenseCategories??{}})

  }catch(e){
    console.log(e)
    return res.status(500).json({message: 'Internal Server Error'})
  }
}


const updateTenantTravelAllocations = async (req, res) => {
  try{
    const {tenantId} = req.params
    const {travelAllocations} = req.body

    if(!tenantId || !travelAllocations) return res.status(400).json({message: 'Bad request. Missing required fields'})

    //check tenant
    const tenant = await HRCompany.findOne({tenantId}, {tenantId})
    if(!tenant) return res.status(404).json({message: 'Tenant not found'})

    //update tenant state
    await HRCompany.findOneAndUpdate({tenantId}, {$set:{travelAllocations}})

    return res.status(200).json({message: 'Tenant travelAllocations updated'})

  }catch(e){
    console.log(e)
    return res.status(500).json({message: 'Internal Server Error'})
  }
}

const getTenantTravelAllocations = async (req, res) => {
  try{
    const {tenantId} = req.params
    if(!tenantId) return res.status(400).json({message: 'Bad request. Missing required fields'})

    //check tenant
    const tenant = await HRCompany.findOne({tenantId}, {travelAllocations:1})
    if(!tenant) return res.status(404).json({message: 'Tenant not found'})


    return res.status(200).json({travelAllocations: tenant?.travelAllocations??{}})

  }catch(e){
    console.log(e)
    return res.status(500).json({message: 'Internal Server Error'})
  }
}

const updateTenantReimbursementAllocations = async (req, res) => {
  try{
    const {tenantId} = req.params
    const {reimbursementAllocations} = req.body

    if(!tenantId || !reimbursementAllocations) return res.status(400).json({message: 'Bad request. Missing required fields'})

    //check tenant
    const tenant = await HRCompany.findOne({tenantId}, {tenantId:1})
    if(!tenant) return res.status(404).json({message: 'Tenant not found'})

    //update tenant state
    await HRCompany.findOneAndUpdate({tenantId}, {$set:{reimbursementAllocations}})

    return res.status(200).json({message: 'Tenant reimbursementAllocations updated'})

  }catch(e){
    console.log(e)
    return res.status(500).json({message: 'Internal Server Error'})
  }
}

const getTenantReimbursementAllocations = async (req, res) => {
  try{
    const {tenantId} = req.params


    if(!tenantId) return res.status(400).json({message: 'Bad request. Missing required fields'})

    //check tenant
    const tenant = await HRCompany.findOne({tenantId}, {reimbursementAllocations:1})
    if(!tenant) return res.status(404).json({message: 'Tenant not found'})


    return res.status(200).json({reimbursementAllocations: tenant?.reimbursementAllocations??{}})

  }catch(e){
    console.log(e)
    return res.status(500).json({message: 'Internal Server Error'})
  }
}


const updateTravelAllocation = async (req, res) => {
    try {
        // Get the tenantId from params
        const { tenantId } = req.params;

        const { allocationHeaders } = req.body;
        console.log(allocationHeaders, 'allocationHeaders')

        //get HRCompany document by its tenantId
        const hrCompany = await HRCompany.findOne({ tenantId: tenantId }, {tenantId:1});
        console.log(hrCompany)

        if(!hrCompany){
          //tenant record not found
          res.status(404).json({ error: 'Tenant record not found' })
        }

        

        //update the travelAllocationHeaders
        const updatedHRCompany = await HRCompany.findOneAndUpdate({ tenantId: tenantId }, {$set: {travelAllocation: allocationHeaders}}, { new: true });
        
        //send updates to other microservices
        //const update_res = await sendUpdatedReplica(updatedHRCompany)
        //modify later to return success message only if update_res returns 1

        res.status(200).json(updatedHRCompany); // Respond with the updated HRCompany data

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateTravelExpenseAllocation = async (req, res) => {
  try {
    // Get the tenantId from params
    const { tenantId } = req.params;

    const { allocationHeaders } = req.body;
    console.log(allocationHeaders, 'allocationHeaders')

    //get HRCompany document by its tenantId
    const hrCompany = await HRCompany.findOne({ tenantId: tenantId }, {tenantId:1});
    console.log(hrCompany)

    if(!hrCompany){
      //tenant record not found
      res.status(404).json({ error: 'Tenant record not found' })
    }

    //send updates to other microservices
    //const update_res = await sendUpdatedReplica({travelExpenseAllocation: allocationHeaders})
    //modify later to return success message only if update_res returns 1

    //update the travelAllocationHeaders
    const updatedHRCompany = await HRCompany.findOneAndUpdate({ tenantId: tenantId }, {$set: {travelExpenseAllocation: allocationHeaders}}, { new: true });
    res.status(200).json(updatedHRCompany); // Respond with the updated HRCompany data

} catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' });
}
}

const updateTravelCategoriesExpenseAllocation = async (req, res) => {
  try {
    // Get the tenantId from params
    const { tenantId } = req.params;

    const { allocationHeaders } = req.body;
    console.log(allocationHeaders, 'allocationHeaders')

    //get HRCompany document by its tenantId
    const hrCompany = await HRCompany.findOne({ tenantId: tenantId }, {tenantId:1});
    console.log(hrCompany)

    if(!hrCompany){
      //tenant record not found
      res.status(404).json({ error: 'Tenant record not found' })
    }

    //send updates to other microservices
    //const update_res = await sendUpdatedReplica({travelCategoriesExpenseAllocation:allocationHeaders})
    //modify later to return success message only if update_res returns 1

    //update the travelAllocationHeaders
    const updatedHRCompany = await HRCompany.findOneAndUpdate({ tenantId: tenantId }, {$set: {travelCategoriesExpenseAllocation: allocationHeaders}}, { new: true });
    res.status(200).json(updatedHRCompany); // Respond with the updated HRCompany data
    
    updateAccountLinesAndExpenseCategories(tenantId)
} catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' });
}
}

const updateNonTravelExpenseAllocation = async (req, res) => {
  try {
    // Get the tenantId from params
    const { tenantId } = req.params;

    const { allocationHeaders } = req.body;
    console.log(allocationHeaders, 'allocationHeaders')

    //get HRCompany document by its tenantId
    const hrCompany = await HRCompany.findOne({ tenantId: tenantId }, {tenantId:1});

    if(!hrCompany){
      //tenant record not found
      res.status(404).json({ error: 'Tenant record not found' })
    }

    //update the travelAllocationHeaders
    const updatedHRCompany = await HRCompany.findOneAndUpdate({ tenantId: tenantId }, {$set: {nonTravelExpenseAllocation: allocationHeaders}}, { new: true });
    //send updates to other microservices
    //const update_res = await sendUpdatedReplica({nonTravelExpenseAllocation: allocationHeaders})
    //modify later to return success message only if update_res returns 1
    res.status(200).json(updatedHRCompany); // Respond with the updated HRCompany data

} catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' });
}
}

const getTenantTravelAllocation = async (req, res)=>{
  try{
    const {tenantId} = req.params

    if(!tenantId){
      //bad request
      res.status(400).json({error:'Bad request'})
      return
    }

    //check if tenant exist
    const hrCompany = await HRCompany.findOne({tenantId}, {tenantId:1, travelAllocation:1})

    if(!hrCompany){
      res.status(404).json({error:'tenant not found'})
      return
    }

    //proceed with the request
    res.status(200).json({travelAllocation: hrCompany.travelAllocation})
  }
  catch(e){
    console.log(e)
    res.status(500).json({error:'Internal server error'})
  }
}

const getTenantTravelExpenseAllocation = async (req, res)=>{
  try{
    const {tenantId} = req.params

    if(!tenantId){
      //bad request
      res.status(400).json({error:'Bad request'})
      return
    }

    //check if tenant exist
    const hrCompany = await HRCompany.findOne({tenantId}, {tenantId:1, travelExpenseAllocation:1})

    if(!hrCompany){
      res.status(404).json({error:'tenant not found'})
      return
    }

    console.log(hrCompany, 'hrCompany...') 

    //proceed with the request
    res.status(200).json({travelExpenseAllocation: hrCompany.travelExpenseAllocation})
  }
  catch(e){
    console.log(e)
    res.status(500).json({error:'Internal server error'})
  }
}

const getTravelCategoriesExpenseAllocation = async (req, res)=>{
  try{
    const {tenantId} = req.params

    if(!tenantId){
      //bad request
      res.status(400).json({error:'Bad request'})
      return
    }

    //check if tenant exist
    const hrCompany = await HRCompany.findOne({tenantId}, {tenantId:1, travelCategoriesExpenseAllocation:1})

    if(!hrCompany){
      res.status(404).json({error:'tenant not found'})
      return
    }

    console.log(hrCompany, 'hrCompany...') 

    //proceed with the request
    res.status(200).json({travelExpenseAllocation: hrCompany.travelCategoriesExpenseAllocation})
  }
  catch(e){
    console.log(e)
    res.status(500).json({error:'Internal server error'})
  }
}

const getTenantNonTravelExpenseAllocation = async (req, res)=>{
  try{
    const {tenantId} = req.params

    if(!tenantId){
      //bad request
      res.status(400).json({error:'Bad request'})
      return
    }

    //check if tenant exist
    const hrCompany = await HRCompany.findOne({tenantId}, {tenantId:1, nonTravelExpenseAllocation:1})

    if(!hrCompany){
      res.status(404).json({error:'tenant not found'})
      return
    }

    console.log(hrCompany, 'hrCompany...') 

    //proceed with the request
    res.status(200).json({nonTravelExpenseAllocation: hrCompany.nonTravelExpenseAllocation})
  }
  catch(e){
    console.log(e)
    res.status(500).json({error:'Internal server error'})
  }
}

const updateTenantGroupingLabels = async (req, res) => {
  try {
    // Get the tenantId from params
    const { tenantId } = req.params;

    const { groupingLabels } = req.body;
    console.log(groupingLabels, 'grouping labels')

    //get HRCompany document by its tenantId
    const hrCompany = await HRCompany.findOne({ tenantId: tenantId }, {tenantId:1});
    console.log(hrCompany)

    if(!hrCompany){
      //tenant record not found
      res.status(404).json({ error: 'Tenant record not found' })
    }

    //update the travelAllocationHeaders
    const updatedHRCompany = await HRCompany.findOneAndUpdate({ tenantId: tenantId }, {$set: {groupingLabels}}, { new: true });
    
    //send updates to other microservices
    //const update_res = await sendUpdatedReplica({travelExpenseAllocation: allocationHeaders})
    //modify later to return success message only if update_res returns 1

    res.status(200).json(updatedHRCompany.groupingLabels); // Respond with the updated HRCompany data

  } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getTenantGroupingLabels = async (req, res) => {
  try{
    const {tenantId} = req.params

    if(!tenantId){
      //bad request
      res.status(400).json({error:'Bad request'})
      return
    }

    //check if tenant exist
    const hrCompany = await HRCompany.findOne({tenantId}, {tenantId:1, groupingLabels:1})

    if(!hrCompany){
      res.status(404).json({error:'tenant not found'})
      return
    }

    console.log(hrCompany, 'hrCompany...') 

    //proceed with the request
    res.status(200).json({groupingLabels: hrCompany.groupingLabels})
  }
  catch(e){
    console.log(e)
    res.status(500).json({error:'Internal server error'})
  }
}

const updateTenantGroups = async (req, res) => {
  try {
    // Get the tenantId from params
    const { tenantId } = req.params;

    //get HRCompany document by its tenantId
    let hrCompany = await HRCompany.findOne({ tenantId: tenantId });
    console.log(hrCompany)

    if(!hrCompany){
      //tenant record not found
      res.status(404).json({ error: 'Tenant record not found' })
    }

    const { groups } = req.body;
    
    //validate groups data for each group... 

    //update groups and blanket information in HR master
    hrCompany.groups = groups
    //const updatedHRCompany = await HRCompany.findOneAndUpdate({ tenantId: tenantId }, {$set: {groups}}, { new: true });

    //clear all group data from employee list
    hrCompany.employees.forEach(employee=>{
        employee.group = []
      })

    //tag employees with groups
    async function tagEmployees(){
      groups.forEach((group,ind)=>{
        const employees = hrCompany.employees
        const groupingLabels = hrCompany.groupingLabels 

        employees.forEach(employee=>{
          let taggable = true
          group.filters.forEach((filter, index)=>{
            if(!filter.length == 0 && !filter.includes(employee.employeeDetails[groupingLabels[index].headerName])){
                taggable = false
                //console.log('this ran', employee.employeeDetails[groupingLabels[index].headerName], filter, group.groupName)
            }           
          })
  
          if(taggable){
            console.log('pushed', group.groupName)
            //see if the group already exists
            employee.group.push(group.groupName)
          }

        })
  
      })  
    }
    
    await tagEmployees()
    //update employees
    //await HRCompany.findOneAndUpdate({ tenantId: tenantId }, {$set: {employees:hrCompany.employees}}, { new: true });



    //update policies
    const defaultCurrency = hrCompany.companyDetails.defaultCurrency

    let travelPolicies = hrCompany.policies?.travelPolicies??[]
    travelPolicies = {}


    const travelAllocationFlags = hrCompany.travelAllocationFlags
    const travelExpenseCategories = hrCompany.travelExpenseCategories??[]
    const reimbursementExpenseCategories = hrCompany.reimbursementExpenseCategories??[]
    

     let modified_travelPolicies = [...groups].map(group=>{
        const key = group.groupName
        let tmpPolicies = []

        //push fixed policies inside policies object for each category
        const fixed = {
          international: {
              ['Allowed Trip Purpose'] : {
                class: {
                'Business': {allowed:true, violationMessage:'', enabled:false}, 
                'Personal': {allowed:true, violationMessage:'', enabled:false},
                'Training': {allowed:true, violationMessage:'', enabled:false},
                'Events': {allowed:true, violationMessage:'', enabled:false}
              }},
              ['Approval Flow'] : {approval: {approvers:[], violationMessage:''}},
              ['Per Diem allowance / Cash Advance allowed'] : {permission: {allowed: true, violationMessage:'', enabled:false}},
              ['Advance Payment'] : {limit:{amount:null, currency:defaultCurrency, violationMessage:'', enabled:false}},
              ['Allow International Travel Submission/booking with violations'] : {permission: {allowed: true, violationMessage:''}, enabled:false},
              ['Allow International Travel Expense Submission with violations'] : {permission: {allowed: true, violationMessage:''}, enabled:false},
              ['Expense Report Submission Deadline'] : {dayLimit: {days:'', violationMessage:''}, enabled:false},
              ['Minimum Days to Book Before Travel'] : {dayLimit: {days:'', violationMessage:''}, enabled:false},
          },
          domestic: {
            ['Allowed Trip Purpose'] : {
              class: {
              'Business': {allowed:true, violationMessage:'', enabled:false}, 
              'Personal': {allowed:true, violationMessage:'', enabled:false},
              'Training': {allowed:true, violationMessage:'', enabled:false},
              'Events': {allowed:true, violationMessage:'', enabled:false}
            }},
            ['Approval Flow'] : {approval: {approvers:[], violationMessage:''}},
            ['Per Diem allowance / Cash Advance allowed'] : {permission: {allowed: true, violationMessage:'', enabled:false}},
            ['Advance Payment'] : {limit:{amount:null, currency:defaultCurrency, violationMessage:'', enabled:false}},
            ['Expense Report Submission Deadline'] : {dayLimit: {days:'', violationMessage:''}, enabled:false},
            ['Minimum Days to Book Before Travel'] : {dayLimit: {days:'', violationMessage:''}, enabled:false},
        },
        local: {
          ['Allowed Trip Purpose'] : {
            class: {
            'Business': {allowed:true, violationMessage:'', enabled:false}, 
            'Personal': {allowed:true, violationMessage:'', enabled:false},
            'Training': {allowed:true, violationMessage:'', enabled:false},
            'Events': {allowed:true, violationMessage:'', enabled:false}
          }},
          ['Approval Flow'] : {approval: {approvers:[], violationMessage:''}},
          ['Per Diem allowance / Cash Advance allowed'] : {permission: {allowed: true, violationMessage:'', enabled:false}},
          ['Advance Payment'] : {limit:{amount:null, currency:defaultCurrency, violationMessage:'', enabled:false}},
          ['Expense Report Submission Deadline'] : {dayLimit: {days:'', violationMessage:''}, enabled:false},
          ['Minimum Days to Book Before Travel'] : {dayLimit: {days:'', violationMessage:''}, enabled:false},
      },
        }

        if(travelAllocationFlags.level1){
          tmpPolicies = ['international', 'domestic', 'local'].map(travelType=>({
            [travelType]: travelExpenseCategories.map(category=>{
              if(category.hasOwnProperty('class')){
                return({
                  [category.categoryName] : {
                    class:category.class.map(c=>({ [c] : {allowed:true, violationMessage: ''} })).reduce((result, currentObj) => {
                      const [key] = Object.keys(currentObj);
                      const value = currentObj[key];
                      result[key] = value;
                      return result;
                    }, {}),
                    limit: {amount:null, currency:defaultCurrency, violationMessage: ''},
                    enabled:false
                  }
                })
              }
              else return({
                [category.categoryName] : {
                  limit: {amount:null, currency:defaultCurrency, violationMessage: ''},
                  enabled:false
                }
              })
            }).reduce((result, currentObj) => {
              const [key] = Object.keys(currentObj);
              const value = currentObj[key];
              result[key] = value;
              return result;
            }, {...fixed[travelType]}),
           
          }))
        }
        else{
           tmpPolicies = ['international', 'domestic', 'local'].map((travelType, index)=>({
            [travelType]: travelExpenseCategories[index][travelType].map(category=>{
              if(category.hasOwnProperty('class') && category.class != null && category.class !=undefined){
                console.log('category name', category.categoryName)
                return({
                  [category.categoryName] : {
                    class:category.class.map(c=>({[c] : {allowed:true, violationMessage: ''}})).reduce((result, currentObj) => {
                      const [key] = Object.keys(currentObj);
                      const value = currentObj[key];
                      result[key] = value;
                      return result;
                    }, {}),
                    limit: {amount:null, currency:defaultCurrency, violationMessage: ''},
                    enabled:false
                  }
                })
              }
              else return({
                [category.categoryName] : {
                  limit: {amount:null, currency:defaultCurrency, violationMessage: ''},
                  enabled:false
                }
              })
            }).reduce((result, currentObj) => {
              const [key] = Object.keys(currentObj);
              const value = currentObj[key];
              result[key] = value;
              return result;
            }, {...fixed[travelType]})
          }))
        }
        
        tmpPolicies = tmpPolicies.reduce((result, currentObj) => {
          const [key] = Object.keys(currentObj);
          const value = currentObj[key];
          result[key] = value;
          return result;
        }, {});

        return({[key]:tmpPolicies})
      })

      const ind = Object.keys(modified_travelPolicies).length

      modified_travelPolicies = {...modified_travelPolicies}


      let modified_nonTravelPolicies = [...groups].map(group=>{
        const key = group.groupName
        let tmpPolicies = []

        tmpPolicies = reimbursementExpenseCategories.map(category=>{
          if(category.hasOwnProperty('class')){
            return({
              [category.categoryName] : {
                class:category.class.map(c=>({ [c] : {allowed:true, violationMessage: ''} })).reduce((result, currentObj) => {
                  const [key] = Object.keys(currentObj);
                  const value = currentObj[key];
                  result[key] = value;
                  return result;
                }, {}),
                limit: {amount:null, currency:defaultCurrency, violationMessage: ''},
                enabled:false
              }
            })
          }
          else return({
            [category.categoryName] : {
              limit: {amount:null, currency:defaultCurrency, violationMessage: ''},
              enabled:false
            }
          })
        }).reduce((result, currentObj) => {
          const [key] = Object.keys(currentObj);
          const value = currentObj[key];
          result[key] = value;
          return result;
        }, {})

        return({[key]:tmpPolicies})
      })

      
     hrCompany.policies = {nonTravelPolicies:modified_nonTravelPolicies, travelPolicies:modified_travelPolicies}
    
     //save modified hrCompany
     hrCompany.save()

    res.status(200).json({message:'Groups updated!'}); //Respond with success message

  } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getTenantGroups = async (req, res) => {
  try{
    const {tenantId} = req.params

    if(!tenantId){
      //bad request
      res.status(400).json({error:'Bad request'})
      return
    }

    //check if tenant exist
    const hrCompany = await HRCompany.findOne({tenantId}, {tenantId:1, groups:1})

    if(!hrCompany){
      res.status(404).json({error:'tenant not found'})
      return
    }

    //proceed with the request
    res.status(200).json({groups: hrCompany.groups})
  }
  catch(e){
    console.log(e)
    res.status(500).json({error:'Internal server error'})
  }
}

const updateTenantPolicies = async (req, res) => {
  try {
    // Get the tenantId from params
    const { tenantId } = req.params;

    //get HRCompany document by its tenantId
    const hrCompany = await HRCompany.findOne({ tenantId: tenantId }, {tenantId:1});
    console.log(hrCompany)

    if(!hrCompany){
      //tenant record not found
      res.status(404).json({ error: 'Tenant record not found' })
    }

    const { policies } = req.body;
    //validate policies data for each group... 

    //update policies information in HR master
    const updatedHRCompany = await HRCompany.findOneAndUpdate({ tenantId: tenantId }, {$set: {'policies.travelPolicies': policies, 'flags.POLICY_SETUP_FLAG':true}}, { new: true });
    //send updates to other microservices
    //const update_res = await sendUpdatedReplica({travelExpenseAllocation: allocationHeaders})
    //modify later to return success message only if update_res returns 1
    res.status(200).json({message:'Policies Updated!'}); // Respond with success message

  } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getTenantPolicies = async (req, res)=>{
  try{
    const {tenantId} = req.params

    if(!tenantId){
      //bad request
      res.status(400).json({error:'Bad request'})
      return
    }

    //check if tenant exist
    const hrCompany = await HRCompany.findOne({tenantId}, {tenantId:1, policies:1})

    if(!hrCompany){
      res.status(404).json({error:'tenant not found'})
      return
    }

    //proceed with the request
    res.status(200).json({policies: hrCompany.policies.travelPolicies})
  }
  catch(e){
    console.log(e)
    res.status(500).json({error:'Internal server error'})
  }
}

const updateTenantNonTravelPolicies = async (req, res) => {
  try {
    // Get the tenantId from params
    const { tenantId } = req.params;

    //get HRCompany document by its tenantId
    const hrCompany = await HRCompany.findOne({ tenantId: tenantId }, {tenantId:1});
    console.log(hrCompany)

    if(!hrCompany){
      //tenant record not found
      res.status(404).json({ error: 'Tenant record not found' })
    }

    const { policies } = req.body;
    
    //validate policies data for each group... 

    //update policies information in HR master
    const updatedHRCompany = await HRCompany.findOneAndUpdate({ tenantId: tenantId }, {$set: {'policies.nonTravelPolicies': policies}}, { new: true });
    
    //send updates to other microservices
    //const update_res = await sendUpdatedReplica({travelExpenseAllocation: allocationHeaders})
    //modify later to return success message only if update_res returns 1

    res.status(200).json({message:'Policies Updated!'}); // Respond with success message

    //update account lines and expense categories
    //updateAccountLinesAndExpenseCategories(tenantId)


  } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getTenantNonTravelPolicies = async (req, res)=>{
  try{
    const {tenantId} = req.params

    if(!tenantId){
      //bad request
      res.status(400).json({error:'Bad request'})
      return
    }

    //check if tenant exist
    const hrCompany = await HRCompany.findOne({tenantId}, {tenantId:1, policies:1})

    if(!hrCompany){
      res.status(404).json({error:'tenant not found'})
      return
    }

    //proceed with the request
    res.status(200).json({policies: hrCompany.policies.nonTravelPolicies})
  }
  catch(e){
    console.log(e)
    res.status(500).json({error:'Internal server error'})
  }
}

const getTenantExpenseCategories = async (req, res)=>{
  try{
    const {tenantId} = req.params

    if(!tenantId){
      //bad request
      res.status(400).json({error:'Bad request'})
      return
    }

    //check if tenant exist
    const hrCompany = await HRCompany.findOne({tenantId}, {tenantId:1, expenseCategories:1})

    if(!hrCompany){
      res.status(404).json({error:'tenant not found'})
      return
    }

    //proceed with the request
    res.status(200).json({expenseCategories: hrCompany.expenseCategories})
  }
  catch(e){
    console.log(e)
    res.status(500).json({error:'Internal server error'})
  }
}

const getTenantAccountLines = async (req, res)=>{
  try{
    const {tenantId} = req.params

    if(!tenantId){
      //bad request
      res.status(400).json({error:'Bad request'})
      return
    }

    //check if tenant exist
    const hrCompany = await HRCompany.findOne({tenantId}, {tenantId:1, accountLines:1})

    if(!hrCompany){
      res.status(404).json({error:'tenant not found'})
      return
    }

    //proceed with the request
    res.status(200).json({accountLines: hrCompany.accountLines})
  }
  catch(e){
    console.log(e)
    res.status(500).json({error:'Internal server error'})
  }
}

const updateTenantAccountLines = async (req, res)=>{
  try {
    // Get the tenantId from params
    const { tenantId } = req.params;

    const { accountLines } = req.body;
    console.log(accountLines, 'account lines')

    //get HRCompany document by its tenantId
    const hrCompany = await HRCompany.findOne({ tenantId: tenantId }, {tenantId:1});
    console.log(hrCompany)

    if(!hrCompany){
      //tenant record not found
      res.status(404).json({ error: 'Tenant record not found' })
    }

    //update account lines
    await HRCompany.findOneAndUpdate({ tenantId: tenantId }, {$set: {accountLines: accountLines}});
    //send updates to other microservices
    //const update_res = await sendUpdatedReplica({accountLines})
    //modify later to return success message only if update_res returns 1
    res.status(200).json({message:'Account Lines Updated!'}); // Respond with the updated HRCompany data

  } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

const updateTenantMulticurrencyTable = async (req, res)=>{
  try {
    // Get the tenantId from params
    const { tenantId } = req.params;

    const { multiCurrencyTable } = req.body;
    console.log(multiCurrencyTable)

    //get HRCompany document by its tenantId
    const hrCompany = await HRCompany.findOne({ tenantId: tenantId }, {tenantId:1});
    console.log(hrCompany)

    if(!hrCompany){
      //tenant record not found
      res.status(404).json({ error: 'Tenant record not found' })
    }

    //update account lines
    await HRCompany.findOneAndUpdate({ tenantId: tenantId }, {$set: {multiCurrencyTable}});
    res.status(200).json({message:'Multicurrency Table updated!'}); // Respond with the updated HRCompany data

  } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' });
  }

}

const getTenantMultiCurrencyTable = async (req, res)=>{
  try{
    const {tenantId} = req.params

    if(!tenantId){
      //bad request
      res.status(400).json({error:'Bad request'})
      return
    }

    //check if tenant exist
    const hrCompany = await HRCompany.findOne({tenantId}, {tenantId:1, multiCurrencyTable:1})

    if(!hrCompany){
      res.status(404).json({error:'tenant not found'})
      return
    }

    //proceed with the request
    res.status(200).json({multiCurrencyTable: hrCompany.multiCurrencyTable})
  }
  catch(e){
    console.log(e)
    res.status(500).json({error:'Internal server error'})
  }
}

const getTenantCashExpenseOptions = async (req, res) => {
  try{
    const {tenantId} = req.params

    if(!tenantId){
      //bad request
      res.status(400).json({error:'Bad request'})
      return
    }

    //check if tenant exist
    const hrCompany = await HRCompany.findOne({tenantId}, {tenantId:1, expenseSettlementOptions:1})

    if(!hrCompany){
      res.status(404).json({error:'tenant not found'})
      return
    }

    //proceed with the request
    res.status(200).json({expenseSettlementOptions: hrCompany.expenseSettlementOptions})
  }
  catch(e){
    console.log(e)
    res.status(500).json({error:'Internal server error'})
  }
}

const updateTenantCashExpenseOptions = async (req, res)=>{
  try {
    // Get the tenantId from params
    const { tenantId } = req.params;

    const { expenseSettlementOptions } = req.body;
    console.log(expenseSettlementOptions)

    //get HRCompany document by its tenantId
    const hrCompany = await HRCompany.findOne({ tenantId: tenantId }, {tenantId:1});
    console.log(hrCompany)

    if(!hrCompany){
      //tenant record not found
      res.status(404).json({ error: 'Tenant record not found' })
    }

    //update expense options
    await HRCompany.findOneAndUpdate({ tenantId: tenantId }, {$set: {expenseSettlementOptions}});
    //send updates to other microservices
    //const update_res = await sendUpdatedReplica({expenseSettlementOptions})
    //modify later to return success message only if update_res returns 1
    res.status(200).json({message:'Cash Expense Options updated!'}); 

  } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' });
  }

}

const getTenantCashAdvanceOptions = async (req, res) => {
  try{
    const {tenantId} = req.params

    if(!tenantId){
      //bad request
      res.status(400).json({error:'Bad request'})
      return
    }

    //check if tenant exist
    const hrCompany = await HRCompany.findOne({tenantId}, {tenantId:1, advanceSettlementOptions:1})

    if(!hrCompany){
      res.status(404).json({error:'tenant not found'})
      return
    }

    //proceed with the request
    res.status(200).json({advanceSettlementOptions: hrCompany.advanceSettlementOptions})
  }
  catch(e){
    console.log(e)
    res.status(500).json({error:'Internal server error'})
  }
}

const updateTenantCashAdvanceOptions = async (req, res)=>{
  try {
    // Get the tenantId from params
    const { tenantId } = req.params;

    const { advanceSettlementOptions } = req.body;
    console.log(advanceSettlementOptions)

    //get HRCompany document by its tenantId
    const hrCompany = await HRCompany.findOne({ tenantId: tenantId }, {tenantId:1, });
    console.log(hrCompany)

    if(!hrCompany){
      //tenant record not found
      res.status(404).json({ error: 'Tenant record not found' })
    }

    //update expense options
    await HRCompany.findOneAndUpdate({ tenantId: tenantId }, {$set: {advanceSettlementOptions}});
    //send updates to other microservices
    //const update_res = await sendUpdatedReplica({advanceSettlementOptions})
    //modify later to return success message only if update_res returns 1
    res.status(200).json({message:'Cash Expense Options updated!'}); 

  } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' });
  }

}

const updateTenantSystemRelatedRoles = async (req, res) => {
  try {
    // Get the tenantId from params
    const { tenantId } = req.params;

    const { systemRelatedRoles } = req.body;
    console.log(systemRelatedRoles);

    // Get HRCompany document by its tenantId
    let hrCompany = await HRCompany.findOne({ tenantId: tenantId }, {employees:1});
    console.log(hrCompany);

    if (!hrCompany) {
      // Tenant record not found
      res.status(404).json({ error: 'Tenant record not found' });
      return; // Add a return statement to exit the function in case of an error
    }

    // Update systemRelatedRoles
    await HRCompany.findOneAndUpdate({ tenantId: tenantId }, { $set: { systemRelatedRoles } });


    // Tag employees
    let employeesList = hrCompany.employees;

    async function tagRoles(){
      return new Promise((resolve)=>{
              // Tag finance employees
        if (systemRelatedRoles.finance.length > 0) {
          const financeEmployeeIds = systemRelatedRoles.finance.map((emp) => emp.employeeId);
    
          employeesList.forEach((employee) => {
            if (financeEmployeeIds.includes(employee.employeeDetails.employeeId)) {
              employee.employeeRoles.finance = true;
            } else {
              employee.employeeRoles.finance = false;
            }
          });
        }
    
        // Tag businessAdmin employees
        if (systemRelatedRoles.businessAdmin.length > 0) {
          const businessAdminEmployeeIds = systemRelatedRoles.businessAdmin.map((emp) => emp.employeeId);
    
          employeesList.forEach((employee) => {
            if (businessAdminEmployeeIds.includes(employee.employeeDetails.employeeId)) {
              employee.employeeRoles.businessAdmin = true;
            } else {
              employee.employeeRoles.businessAdmin = false;
            }
          });
        }
    
        // Tag superAdmin employees
        if (systemRelatedRoles.superAdmin.length > 0) {
          const superAdminEmployeeIds = systemRelatedRoles.superAdmin.map((emp) => emp.employeeId);
    
          employeesList.forEach((employee) => {
            if (superAdminEmployeeIds.includes(employee.employeeDetails.employeeId)) {
              employee.employeeRoles.superAdmin = true;
            } else {
              employee.employeeRoles.superAdmin = false;
            }
          });
        }

        resolve()
      })
    }

    await tagRoles()
    // Save the updated document
    await HRCompany.findOneAndUpdate({ tenantId: tenantId }, { $set: { employees:employeesList } });
    //send updates to other microservices
    //const update_res = await sendUpdatedReplica({employees:employeesList, systemRelatedRoles})
    //modify later to return success message only if update_res returns 1
    res.status(200).json({ message: 'System roles updated!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
  
const getTenantSystemRelatedRoles = async (req, res) => {
  try{
    const {tenantId} = req.params

    if(!tenantId){
      //bad request
      res.status(400).json({error:'Bad request'})
      return
    }

    //check if tenant exist
    const hrCompany = await HRCompany.findOne({tenantId}, {tenantId:1, systemRelatedRoles:1})

    if(!hrCompany){
      res.status(404).json({error:'tenant not found'})
      return
    }

    //proceed with the request
    res.status(200).json({systemRelatedRoles: hrCompany.systemRelatedRoles})
  }
  catch(e){
    console.log(e)
    res.status(500).json({error:'Internal server error'})
  }
}

const updateBlanketDelegations = async (req, res) => {
  try {
    // Get the tenantId from params
    const { tenantId } = req.params;

    const { blanketDelegations } = req.body;
    console.log(blanketDelegations);

    // Get HRCompany document by its tenantId
    let hrCompany = await HRCompany.findOne({ tenantId: tenantId }, {tenantId:1, groupingLabels:1, employees:1});
    console.log(hrCompany);

    if (!hrCompany) {
      // Tenant record not found
      res.status(404).json({ error: 'Tenant record not found' });
      return; // Add a return statement to exit the function in case of an error
    }


      const groups = blanketDelegations.groups.filter(groups=> groups.canDelegate)
      const employeesIds = blanketDelegations.employees.map(emp=>emp.employeeId)

      console.log(groups)
        //tag employees with can delegate tag
        async function tagEmployees(){
          groups.forEach((group,ind)=>{
            const employees = hrCompany.employees
            const groupingLabels = hrCompany.groupingLabels 

    
            employees.forEach(employee=>{
              let taggable = true
              group.filters.forEach((filter, index)=>{
                if(!filter.length == 0 && !filter.includes(employee.employeeDetails[groupingLabels[index].headerName])){
                    taggable = false
                    console.log('this ran', employee.employeeDetails[groupingLabels[index].headerName], filter, group.groupName)
                }           
              })
      
              if(taggable || employeesIds.includes(employee.employeeDetails.employeeId) ){
                employee.canDelegate = true
              }
              else{
                employee.canDelegate = false
              }
      
            })
      
          })  
        }
        
        await tagEmployees()
        //update employees
        await HRCompany.findOneAndUpdate({ tenantId: tenantId }, {$set: {employees:hrCompany.employees}}, { new: true });
        
            // Update systemRelatedRoles
        await HRCompany.findOneAndUpdate({ tenantId: tenantId }, { $set: { blanketDelegations } });


    // async function tagRoles(){
    //   return new Promise((resolve)=>{
    //           // Tag finance employees
    //     if (systemRelatedRoles.finance.length > 0) {
    //       const financeEmployeeIds = systemRelatedRoles.finance.map((emp) => emp.employeeId);
    
    //       employeesList.forEach((employee) => {
    //         if (financeEmployeeIds.includes(employee.employeeDetails.employeeId)) {
    //           employee.employeeRoles.finance = true;
    //         } else {
    //           employee.employeeRoles.finance = false;
    //         }
    //       });
    //     }
    
    //     // Tag businessAdmin employees
    //     if (systemRelatedRoles.businessAdmin.length > 0) {
    //       const businessAdminEmployeeIds = systemRelatedRoles.businessAdmin.map((emp) => emp.employeeId);
    
    //       employeesList.forEach((employee) => {
    //         if (businessAdminEmployeeIds.includes(employee.employeeDetails.employeeId)) {
    //           employee.employeeRoles.businessAdmin = true;
    //         } else {
    //           employee.employeeRoles.businessAdmin = false;
    //         }
    //       });
    //     }
    
    //     // Tag superAdmin employees
    //     if (systemRelatedRoles.superAdmin.length > 0) {
    //       const superAdminEmployeeIds = systemRelatedRoles.superAdmin.map((emp) => emp.employeeId);
    
    //       employeesList.forEach((employee) => {
    //         if (superAdminEmployeeIds.includes(employee.employeeDetails.employeeId)) {
    //           employee.employeeRoles.superAdmin = true;
    //         } else {
    //           employee.employeeRoles.superAdmin = false;
    //         }
    //       });
    //     }

    //     resolve()
    //   })
    // }

   // await tagRoles()
    // Save the updated document
   // await HRCompany.findOneAndUpdate({ tenantId: tenantId }, { $set: { employees:employeesList } });

    res.status(200).json({ message: 'Blanket Delegations updated!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getBlanketDelegations = async (req, res) => {
  try{
    const {tenantId} = req.params

    if(!tenantId){
      //bad request
      res.status(400).json({error:'Bad request'})
      return
    }

    //check if tenant exist
    const hrCompany = await HRCompany.findOne({tenantId}, {tenantId:1, blanketDelegations:1})

    if(!hrCompany){
      res.status(404).json({error:'tenant not found'})
      return
    }

    //proceed with the request
    res.status(200).json({blanketDelegations: hrCompany.blanketDelegations})
  }
  catch(e){
    console.log(e)
    res.status(500).json({error:'Internal server error'})
  }
}

const handleHRData = async (req, res) => {
  
  console.log(req.body, 'req.body')
  try {
    //do validations here...
    const {tenantId} = req.params
    const {hrData} = req.body

    console.log('upload route hit')


    if(!tenantId || !hrData) return res.status(400).json({message: 'Bad Request. Missing values'})
    
    //look for tenant
    const tenant = await HRCompany.findOne({tenantId})
    console.log(tenant?.tenantId,'tenant id')

    if(!tenant) return res.status(404).json({message: 'Tenant not found'})

    const DIY_FLAG = true
    let GROUPING_FLAG = false
    let ORG_HEADERS_FLAG = false
    //const {filename, companyName, companyHQ, teamSize} = req.body

    const employees = []
    const data=[]

    const bands = new Set()
    const grades = new Set()
    const designations = new Set()

    const profitCenters = new Set()
    const costCenters = new Set()
    const departments = new Set()
    const businessUnits = new Set()
    const legalEntities = new Set()
    const divisions = new Set()
    const projects = new Set()
    const geographicalLocations = new Set()
    const responsibilityCenters = new Set()

    //will contian employeeId's for managers
    const managers = new Set()

    const excelFilePath = `uploads/${req.body?.filename}`

    //iterate thourght excel data
    hrData.forEach((row, index)=>{
        if (index > 0) {
            const {
              employeeName,
              employeeId,
              designation,
              grade,
              department,
              businessUnit,
              legalEntity,
              costCenter,
              profitCenter,
              responsibilityCenter,
              division,
              project,
              geographicalLocation,
              l1Manager,
              l2Manager,
              l3Manager,
              joiningDate,
              mobileNumber,
              phoneNumber,
              emailId,
              }  = {...row}
            
            const employee = {
              employeeDetails:{employeeName,employeeId,designation,grade,department,businessUnit,legalEntity,costCenter,profitCenter,responsibilityCenter,division,project,geographicalLocation,l1Manager,l2Manager,l3Manager,joiningDate,mobileNumber,phoneNumber,emailId},
              group:[],
              employeeRoles:{
                employee: true,
                employeeManager: false,
                finance: false,
                businessAdmin: false,
              },
              temporaryAssignedManager: {
                assignedFor: '',
                approvals: {
                  travelRequest: false,
                  cashAdvance: false,
                  expenseApproval: false,
                }
              },
              delegated: {
                delegatedFor: '',
                endDate: '',
              },
            }

            //push employeeId's present in  l1, l2, l3 manager fields to managers
            if(l1Manager??false) managers.add(Number(l1Manager))
            if(l2Manager??false) managers.add(Number(l2Manager))
            if(l3Manager??false) managers.add(Number(l3Manager)) 

            //set other details
            profitCenters.add(profitCenter)
            costCenters.add(costCenter)
            departments.add(department)
            businessUnits.add(businessUnit)
            legalEntities.add(legalEntity)
            divisions.add(division)
            projects.add(project)
            geographicalLocations.add(geographicalLocation)
            responsibilityCenters.add(responsibilityCenter)
           // bands.add(band)
            grades.add(grade)
            designations.add(designation)

            employees.push(employee)
          }
      }
      );

      console.log(managers)

      //tag employee managers
      async function tagEmployees(employees, managers){
        employees.forEach(employee=>{
          console.log('employeeId:', employee.employeeDetails.employeeId)
          if(managers.has(Number(employee.employeeDetails.employeeId))){
            console.log('tagging manager')
            employee.employeeRoles.employeeManager = true
          }
        })
      }

      await tagEmployees(employees, managers)
    
      if(departments.length>0 || legalEntities.length>0 || costCenters.length>0 || profitCenters.length>0 || businessUnits.length>0 || divisions.length>0 || projects.length>0 || geographicalLocations.length>0 || responsibilityCenters.length>0 ){
        ORG_HEADERS_FLAG = true
      }

      if(bands.length>0 || grades.length>0 || designations>0 ){
        GROUPING_FLAG = true
      }

    
    // Update tenant data
    tenant.flags = {
      DIY_FLAG: DIY_FLAG,
      GROUPING_FLAG: GROUPING_FLAG,
      ORG_HEADERS_FLAG: ORG_HEADERS_FLAG,
    }
    tenant.employees = [...employees]
    tenant.groupHeaders = {
      band: [...bands],
      grade: [...grades],
      designation: [...designations],
    }

    tenant.orgHeaders = {
      department: [...departments],
      legalEntity: [...legalEntities],
      costCenter: [...costCenters],
      profitCenter: [...profitCenters],
      businessUnit: [...businessUnits],
      division: [...divisions],
      project: [...projects],
      geographicalLocation: [...geographicalLocations],
      responsibilityCenter: [...responsibilityCenters],
    }

    tenant.multiCurrency = []
    tenant.expenseCategories = []
    tenant.travelExpenseAllocation = []
    tenant.nonTravelExpenseAllocation = []
    tenant.groupingLabels = []
    tenant.groups = []
    tenant.policies = {
      policyStructure:{},  //possibly we need to set it with the ruleEngineExcel file
      ruleEngine:{}
    }
    tenant.onboardingCompleted = false
    tenant.state = 'section_1'

    // Save updated HRCompany document to the database
      const savedHRCompany = await tenant.save();

      console.log(savedHRCompany, 'newHRCompany')
      res.status(201).json(savedHRCompany); // Respond with the saved HRCompany data
    }
    catch(error){
      res.status(500).json({ error: 'Internal Server Error' })
      console.log(error, 'error') 
    }
  }

const updateHRMaster = async (req, res) => {

  try {
    //do validations here...
    const {tenantId} = req.params
    const {hrData} = req.body

    console.log('upload route hit')


    if(!tenantId || !hrData) return res.status(400).json({message: 'Bad Request. Missing values'})
    
    //look for tenant
    const tenant = await HRCompany.findOne({tenantId})
    console.log(tenant?.tenantId,'tenant id')

    if(!tenant) return res.status(404).json({message: 'Tenant not found'})



    const employees = []
    //will contian employeeId's for managers
    const managers = new Set()


    //iterate thourght excel data
    hrData.forEach((row, index)=>{
        if (index > 0) {
            const {
              employeeName,
              employeeId,
              designation,
              grade,
              department,
              businessUnit,
              legalEntity,
              costCenter,
              profitCenter,
              responsibilityCenter,
              division,
              project,
              geographicalLocation,
              l1Manager,
              l2Manager,
              l3Manager,
              joiningDate,
              mobileNumber,
              phoneNumber,
              emailId,
              }  = {...row}
            
            const employee = {
              employeeDetails:{employeeName,employeeId,designation,grade,department,businessUnit,legalEntity,costCenter,profitCenter,responsibilityCenter,division,project,geographicalLocation,l1Manager,l2Manager,l3Manager,joiningDate,mobileNumber,phoneNumber,emailId},
              group:[],
              employeeRoles:{
                employee: true,
                employeeManager: false,
                finance: false,
                businessAdmin: false,
              },
              temporaryAssignedManager: {
                assignedFor: '',
                approvals: {
                  travelRequest: false,
                  cashAdvance: false,
                  expenseApproval: false,
                }
              },
              delegated: {
                delegatedFor: '',
                endDate: '',
              },
            }

            //push employeeId's present in  l1, l2, l3 manager fields to managers
            if(l1Manager??false) managers.add(Number(l1Manager))
            if(l2Manager??false) managers.add(Number(l2Manager))
            if(l3Manager??false) managers.add(Number(l3Manager)) 

            employees.push(employee)
          }
      }
      );

      console.log(managers)

      //tag employee managers
      async function tagManagers(employees, managers){
        employees.forEach(employee=>{
          console.log('employeeId:', employee.employeeDetails.employeeId)
          if(managers.has(Number(employee.employeeDetails.employeeId))){
            console.log('tagging manager')
            employee.employeeRoles.employeeManager = true
          }
        })
      }
      await tagManagers(employees, managers)

      const groups = tenant.groups

      //tag employees with groups
      async function tagEmployeesGroups(){
        groups.forEach((group,ind)=>{
          const groupingLabels = tenant.groupingLabels 
  
          employees.forEach(employee=>{
            let taggable = true
            group.filters.forEach((filter, index)=>{
              if(!filter.length == 0 && !filter.includes(employee.employeeDetails[groupingLabels[index].headerName])){
                  taggable = false
                  console.log('this ran', employee.employeeDetails[groupingLabels[index].headerName], filter, group.groupName)
              }           
            })
    
            if(taggable){
              employee.group.push(group.groupName)
            }
    
          })
    
        })  
      }
      
      await tagEmployeesGroups()
  
    
    // Update tenant data
   
    tenant.employees = [...employees]

    // Save updated HRCompany document to the database
      const savedHRCompany = await tenant.save();

    //send updates to other microservices
    //const update_res = await sendUpdatedReplica({employees})
    //modify later to return success message only if update_res returns 1
      res.status(201).json(savedHRCompany); // Respond with the saved HRCompany data
    }
    catch(error){
      res.status(500).json({ error: 'Internal Server Error' })
      console.log(error, 'error') 
    }
}

const updateTenantState = async (req, res) => {
  try{
    const {tenantId} = req.params
    const {state} = req.body

    if(!tenantId || !state) return res.status(400).json({message: 'Bad request. Missing required fields'})

    //check tenant
    const tenant = HRCompany.findOne({tenantId}, {tenantId})
    if(!tenant) return res.status(404).json({message: 'Tenant not found'})

    //update tenant state
    await HRCompany.findOneAndUpdate({tenantId}, {$set:{state}})

    return res.status(200).json({message: 'Tenant sate updated'})

  }catch(e){
    console.log(e)
    return res.status(500).json({message: 'Internal Server Error'})
  }
}

const getTenantDefaultCurrency = async (req, res)=>{
  try{
    const {tenantId} = req.params

    const tenant = await HRCompany.findOne({tenantId}, {companyDetails:1})

    if(!tenant){
      return res.status(404).json({message: 'Tenant not found'})
    }

    res.status(200).json({defaultCurrency: tenant?.companyDetails?.defaultCurrency??{}})
    
  }catch(e){
    return res.status(500).json({message: 'Internal Server Error'})
  }
}

export { 
          getTenantDefaultCurrency,
          updateTenantReimbursementAllocations,
          getTenantReimbursementAllocations,
          updateTenantReimbursementExpenseCategories,
          getTenantReimbursementExpenseCategories,
          updateTenantTravelAllocations,
          getTenantTravelAllocations,
          getTenantTravelExpenseCategories,
          updateTenantTravelExpenseCategories,
          updateTenantTravelAllocationFlags, 
          getTenantTravelAllocationFlags,
          updateExistingHrCompanyInfo, 
          updateTenantCompanyInfo,
          handleUpload,
          getTenantHRMaster,
          getTenantEmployees,
          updateTenantEmployeeDetails,
          getTenantEmployee,
          getTenantFlags,
          getTenantGroupHeaders,
          updateTenantOrgHeaders,
          updateTravelAllocation,
          updateTravelExpenseAllocation,
          updateNonTravelExpenseAllocation,
          updateTenantGroupingLabels,
          getTenantTravelAllocation,
          getTenantTravelExpenseAllocation,
          getTenantNonTravelExpenseAllocation,
          getTenantGroupingLabels,
          getTenantGroups,
          updateTenantGroups,
          getTenantPolicies,
          updateTenantPolicies,
          getTenantExpenseCategories,
          getTenantAccountLines,
          updateTenantAccountLines,
          updateTenantMulticurrencyTable,
          getTenantMultiCurrencyTable,
          getTenantCashAdvanceOptions,
          getTenantCashExpenseOptions,
          updateTenantCashAdvanceOptions,
          updateTenantCashExpenseOptions,
          getTenantSystemRelatedRoles,
          updateTenantSystemRelatedRoles,
          updateBlanketDelegations,
          getBlanketDelegations,
          handleHRData,
          updateTenantState,
          getTenantNonTravelPolicies,
          updateTenantNonTravelPolicies,
          updateTravelCategoriesExpenseAllocation,
          getTravelCategoriesExpenseAllocation,
          getTenantCompanyInfo,
          updateHRMaster,
          getTenantOrgHeaders, }