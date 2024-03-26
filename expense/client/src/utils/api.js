import axios from 'axios';
//import these id from params and pas here
//const BASE_URL = `http://192.168.1.11:8089`
const BASE_URL = `http://localhost:8089`
// const BASE_URL = `http://192.168.1.11:8089`
// const BASE_URL = `http://192.168.1.10:8089`
// const nontravelbase = `http://192.168.1.4:8089`
// const BASE_URL = `http://192.168.1.8:8089`
const retry = 3;
const retryDelay = 5000;

// level 2 http://localhost:5173/65ddbe4f905e5ef67d8ab969/1002/65ddbfb4905e5ef67d8ab96b/cancel/travel-expense
// level1 http://localhost:5173/65c5c3bef21cc9ab3038e21f/1003/65e1b40c80f4848c20f6f118/cancel/travel-expense
// http://localhost:5173/65ddbe4f905e5ef67d8ab969/1003/book/reimbursement   non travel expense 
// http://localhost:5173/65ddbe4f905e5ef67d8ab969/1003/cancel/reimbursement   non travel expense 
// http://192.168.1.11:8089/65c5c3bef21cc9ab3038e21f/1003/65e1b40c80f4848c20f6f118/65e3522cbd53887508dd7c0b/clear-rejection/travel-expense

const errorMessages = {
  '404': 'Resource Not Found',
  '400': 'Cannot fetch data at the moment',
  '500': 'Internal Server Error',
  'request': 'Network Error from backend',
  'else': 'Something went wrong. Please try again later'
};

const handleRequestError = (e) => {
  if (e.response) {
    // Response received from the server
    const status = e.response.status;
    if (status === 400 || status === 404 || status === 500) {
      throw new Error(errorMessages[status]);
    }
  } else if (e.request) {
    // Request was sent, but no response received
    throw new Error(errorMessages.request);
  } else {
    // Something else went wrong
    throw new Error(errorMessages[e.response?.status] || errorMessages.request || errorMessages.else);
  }
};


const axiosRetry = async (requestFunction, ...args) => {
  for (let i = 0; i < retry; i++) {
    try {
      return await requestFunction(...args);
    } catch (error) {
      if (i === retry - 1) {
        // Last attempt, throw the error
        throw error;
      }

      // Wait for the specified delay before retrying
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
};

//verfied by backend
///first tiem get travel header id
//for Book expense 
//


export const getTravelExpenseApi = async (tenantId,empId,tripId) => {
  // const url = `travel/book-expense/:${tenantId}/:${empId}/:${tripId}`;
  const url = `${BASE_URL}/api/fe/expense/travel/${tenantId}/${empId}/${tripId}/book-expense`;

  try {
    const response = await axiosRetry(axios.get, url);
    return response.data

  } catch (error) {
    handleRequestError(error);
    const errorObject = {
      status: error.response?.status || null,
      message: error.message || 'Unknown error',
    };
    return { error: errorObject };
  }
};


export const ocrScanApi = async (data) => {
 
  const url = `${BASE_URL}/api/fe/expense/travel/upload`;
  try {
    const response = await axiosRetry(axios.post, url,data);
    return { data: response.data, error: null };
  } catch (error) {
    handleRequestError(error);
    const errorObject = {
      status: error.response?.status || null,
      message: error.message || 'Unknown error',
    };

    return { data: null, error: errorObject };
  }
};

///non travel handler
export const nonTravelOcrApi = async (data) => {
 
  const url = `${BASE_URL}/ocr-scan`;
  try {
    const response = await axiosRetry(axios.post, url,data);
    return { data: response.data, error: null };
  } catch (error) {
    handleRequestError(error);
    const errorObject = {
      status: error.response?.status || null,
      message: error.message || 'Unknown error',
    };

    return { data: null, error: errorObject };
  }
};

//verfied by backend
//when user will get for modify
export const logoutApi = async (authToken) => {
  try {
    const response = await axiosRetry(axios.post ,'/logout', {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });
    const data = response.data;
    return { data: data,message:data.message, error: null };

  } catch (error) {
    handleRequestError(error);
    const errorObject = {
      status: error.response?.status || null,
      message: error.message || 'Unknown error',
    };
    return { data: null, error: errorObject };
  }
};


export const getTravelExpenseForModifyApi= async(tenantId,empId,tripId,expenseHeaderId)=>{
  const url = `${BASE_URL}/api/fe/expense/travel/${tenantId}/${empId}/${tripId}/${expenseHeaderId}/rejected`
  
  try {
    const response = await axiosRetry(axios.get, url);
    return response.data

  } catch(error){
    handleRequestError(error);
    const errorObject = {
      status: error.response?.status || null,
      message: error.message || 'Unknown error',
    };
    return { error: errorObject };
  }

}

//verfied by backend
//save lineItems {} only saving form object 
//whole got company data and and 
export const postTravelExpenseLineItemApi = async(tenantId,empId,tripId,expenseHeaderId,data)=>{

  // const url = 'http://localhost:3000/lineItem'


  const url = `${BASE_URL}/api/fe/expense/travel/${tenantId}/${empId}/${tripId}/${expenseHeaderId}/save`
  try{
     const response = await axiosRetry(axios.post,url,data)
     return response.data

  } catch(error){
    handleRequestError(error);
    const errorObject = {
      status: error.response?.status || null,
      message: error.message || 'Unknown error',
    };
    return { error: errorObject };
  }

}
export const updateTravelExpenseLineItemApi = async(tenantId,empId,tripId,expenseHeaderId,data)=>{

  // const url = 'http://localhost:3000/lineItem'


  const url = `${BASE_URL}/api/fe/expense/travel/${tenantId}/${empId}/${tripId}/${expenseHeaderId}/edit`
  try{
     const response = await axiosRetry(axios.post,url,data)
     return response.data

  } catch(error){
    handleRequestError(error);
    const errorObject = {
      status: error.response?.status || null,
      message: error.message || 'Unknown error',
    };
    return { error: errorObject };
  }

}
//verfied by backend
//onDraft send expense lines array
///for submit or save as draft

export const submitOrSaveAsDraftApi = async(
  action,
  tenantId,
  empId,
  tripId,
  expenseHeaderId,
  data)=>{
let url;
    if(action==="submit"){
       url = `${BASE_URL}/api/fe/expense/travel/${tenantId}/${empId}/${tripId}/${expenseHeaderId}/submit`
    }else if (action === "draft"){
       url = `${BASE_URL}/api/fe/expense/travel/${tenantId}/${empId}/${tripId}/${expenseHeaderId}/draft`
    }
  try{
    const response = await axiosRetry(axios.patch,url,data)
    return response.data
  }catch(error){
    handleRequestError(error);
    const errorObject = {
      status: error.response?.status || null,
      message: error.message || 'Unknown error',
    };
    console.log('Post Error : ',errorObject);
    return { error: errorObject };
  }
}








//verfied by backend

///check in require data

export const postMultiCurrencyForTravelExpenseApi = async(tenantId,data)=>{

  // const url =   `http://localhost:3000/api/postmulticurrency/travel api Api/${tenantId}`

  const url = `${BASE_URL}/api/fe/expense/travel/${tenantId}/currency-converter`

  try{
    const response = await axiosRetry(axios.post,url,data)
     return response.data
  }catch(error){
    handleRequestError(error);
    const errorObject = {
      status: error.response?.status || null,
      message: error.message || 'Unknown error',
    };
    console.log('Post Error : ',errorObject);
    return {  error: errorObject };
  }
}


//verified by backend
//// dashboard to rejection page for travel expense rejection reason data 
//get the data
// {
//   tripNumber:"",
//   expenseHeaderNumber:"",
//   rejectionReason:""
// }

export const  getRejectionDataForTravelExpenseApi=async(tenantId,empId,tripId,expenseHeaderId)=>{
  const url = `${BASE_URL}/api/fe/expense/travel/${tenantId}/${empId}/${tripId}/${expenseHeaderId}/rejected`


  try {
    const response = await axiosRetry(axios.get, url);
    return response.data

  } catch (error) {
    handleRequestError(error);
    const errorObject = {
      status: error.response?.status || null,
      message: error.message || 'Unknown error',
    };

    return { data: null, error: errorObject };
  }

}




//cancel travel expense 
// on cancel travel header send whole report of expense 
//entire report has to send to backend
//travel expense report data
// {travelExpenseData:[]} this str has to send

export const cancelTravelExpenseHeaderApi = async(tenantId,empId,tripId,expenseHeaderId,data)=>{

  const url = `${BASE_URL}/api/fe/expense/travel/${tenantId}/${empId}/${tripId}/${expenseHeaderId}/cancel`
  
  try{
    const response = await axiosRetry(axios.patch,url,data)
    return response.data
  }catch(error){
    handleRequestError(error);
    const errorObject = {
      status: error.response?.status || null,
      message: error.message || 'Unknown error',
    };
    console.log('Post Error : ',errorObject);
    return {  error: errorObject };
  }

}

// verified by backend
////cancel  travel expense  array of lineItemId
///here i have to send whole object of lineitem in array [{LI1}] for deduct expense and cashadvance
// expenseLines:[]

export const cancelTravelExpenseLineItemApi = async(tenantId,empId,tripId ,expenseHeaderId,data)=>{

  const url = `${BASE_URL}/api/fe/expense/travel/${tenantId}/${empId}/${tripId}/${expenseHeaderId}/cancel-line`
  
  
  try{
    const response = await axiosRetry(axios.patch,url,data)
    return response.data
  }catch(error){
    handleRequestError(error);
    const errorObject = {
      status: error.response?.status || null,
      message: error.message || 'Unknown error',
    };
    console.log('Post Error : ',errorObject);
    return {  error: errorObject };
  }

}



export const travelPolicyViolationApi = async(data)=>{

  // const url =   `http://localhost:3000/api/policyViolation/reimbursement api Api/${tenantId}`

  const url = `${BASE_URL}/currency-convertor`

  try{

    const response = await axiosRetry(axios.post,url,data)
    return response.data

  }catch(error){
    handleRequestError(error);
    const errorObject = {
      status: error.response?.status || null,
      message: error.message || 'Unknown error',
    };
    console.log('Post Error : ',errorObject);
    return {  error: errorObject };
  }
}





///------------------------------non travel expense------------------------------------------------------------------------

//const nontravelbase = `http://192.168.80.73:8089`

 const nontravelbase = BASE_URL


export const postMultiCurrencyForNonTravelExpenseApi = async(tenantId,amount,currencyName)=>{

  const url = `${nontravelbase}/api/fe/expense/non-travel/currency/${tenantId}/${amount}/${currencyName}`
  try{
    const response = await axiosRetry(axios.get,url)
     return response.data
  }catch(error){
    handleRequestError(error);
    const errorObject = {
      status: error.response?.status || null,
      message: error.message || 'Unknown error',
    };
    console.log('Post Error : ',errorObject);
    return {  error: errorObject };
  }
}


///get non-travel-expense category and group if available

export const getNonTravelExpenseMiscellaneousDataApi=async(tenantId,empId)=>{

  const url =`${nontravelbase}/api/fe/expense/non-travel/${tenantId}/${empId}/expensecategories`
  try {
    const response = await axiosRetry(axios.get, url);
    return response.data

  }catch(error){
    handleRequestError(error);
    const errorObject = {
      status: error.response?.status || null,
      message: error.message || 'Unknown error',
    };
    console.log('Post Error : ',errorObject);
    return {  error: errorObject };

  }
}


//for get form value behalf of selected category
export const getCategoryFormElementApi=async(tenantId,empId,categoryName)=>{
  const url = `${nontravelbase}/api/fe/expense/non-travel/${tenantId}/${empId}/${categoryName}/policy`
  try{
    const response = await axiosRetry( axios.get, url);
    return response.data

  }catch(error){
    const errorObject={
      status:error.response?.status || null,
      message: error.message || 'Unknown error'
    };
    console.log('Post Error : ', errorObject);
    return {error: errorObject}
  }
}


///save line item details for non travel expense 
export const postNonTravelExpenseLineItems = async(tenantId,empId,expenseHeaderId,data)=>{

  // this is the real api route
  const url = `${nontravelbase}/api/fe/expense/non-travel/${tenantId}/${empId}/${expenseHeaderId}/save`
  
  try{
    const response = await axiosRetry(axios.post,url,data)
     return response.data
    

  }catch(error){
    handleRequestError(error);
    const errorObject = {
      status: error.response?.status || null,
      message: error.message || 'Unknown error',
    };
    console.log('Post Error : ',errorObject);
    return {  error: errorObject };


  }

}
///edit line item details for non travel expense 
export const editNonTravelExpenseLineItemsApi = async(tenantId,empId,expenseHeaderId,lineItemId,data)=>{

  // this is the real api route
  const url = `${nontravelbase}/api/fe/expense/non-travel/${tenantId}/${empId}/${expenseHeaderId}/${lineItemId}/edit`
  
  try{
    const response = await axiosRetry(axios.patch,url,data)
     return response.data
    

  }catch(error){
    handleRequestError(error);
    const errorObject = {
      status: error.response?.status || null,
      message: error.message || 'Unknown error',
    };
    console.log('Post Error : ',errorObject);
    return {  error: errorObject };


  }

}



export const saveAsDraftNonTravelExpense = async(tenantId,empId,expenseHeaderId)=>{

  const url = `${nontravelbase}/api/fe/expense/non-travel/${tenantId}/${empId}/${expenseHeaderId}/draft`
  
  try{

     const response = await axiosRetry(axios.post,url)
     return response.data

  }catch(error){
    handleRequestError(error);
    const errorObject = {
      status: error.response?.status || null,
      message: error.message || 'Unknown error',
    };
    console.log('Post Error : ',errorObject);
    return {  error: errorObject };
  }
  
}


export const submitNonTravelExpenseApi = async(tenantId,empId,expenseHeaderId)=>{

  const url = `${nontravelbase}/api/fe/expense/non-travel/${tenantId}/${empId}/${expenseHeaderId}/submit`
  
  try{
     const response =await axiosRetry(axios.post,url)
     return response.data

  }catch(error){
    handleRequestError(error);
    const errorObject = {
      status: error.response?.status || null,
      message: error.message || 'Unknown error',
    };
    console.log('Post Error : ',errorObject);
    return {  error: errorObject };
  }

}




export const getNonTravelExpenseLineItemsApi = async(tenantId,empId,expenseHeaderId)=>{

  const url = `${nontravelbase}/api/fe/expense/non-travel/${tenantId}/${empId}/${expenseHeaderId}/report`
  
  try{
     const response =await axiosRetry(axios.get,url)
     return response.data

  }catch(error){
    handleRequestError(error);
    const errorObject = {
      status: error.response?.status || null,
      message: error.message || 'Unknown error',
    };
    console.log('Post Error : ',errorObject);
    return {  error: errorObject };
  }

}


////cancel non travel expense 

export const cancelNonTravelExpenseHeaderApi = async(tenantId,empId,expenseHeaderId)=>{

  const url = `${nontravelbase}/api/fe/expense/non-travel/${tenantId}/${empId}/${expenseHeaderId}/delete`
  
  try{
    const response =await axiosRetry(axios.patch,url)
    return response.data
  }catch(error){
    handleRequestError(error);
    const errorObject = {
      status: error.response?.status || null,
      message: error.message || 'Unknown error',
    };
    console.log('Post Error : ',errorObject);
    return {  error: errorObject };
  }

}


//cancel non travel expense  array of lineItemId

export const cancelNonTravelExpenseLineItemApi = async(tenantId,empId,expenseHeaderId,data)=>{

  const url = `${nontravelbase}/api/fe/expense/non-travel/${tenantId}/${empId}/${expenseHeaderId}/delete-line`
  
  try{
    const response =await axiosRetry(axios.patch,url,data)
    return response.data
  }catch(error){
    handleRequestError(error);
    const errorObject = {
      status: error.response?.status || null,
      message: error.message || 'Unknown error',
    };
    console.log('Post Error : ',errorObject);
    return {  error: errorObject };
  }

}



////  get policy violation for reimbursement on click
export const reimbursementPolicyViolationApi = async(data)=>{

  // const url =   `http://localhost:3000/api/policyViolation/reimbursement api Api/${tenantId}`

  const url =`${BASE_URL}/currency-convertor`
  try{

    const response = await axiosRetry(axios.post,url,data)
    return{data: response.data,error:null};

  }catch(error){
    handleRequestError(error);
    const errorObject = {
      status: error.response?.status || null,
      message: error.message || 'Unknown error',
    };
    console.log('Post Error : ',errorObject);
    return {  error: errorObject };
  }
}


