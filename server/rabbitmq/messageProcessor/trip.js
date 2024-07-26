import dashboard from '../../models/dashboardSchema.js';
import pino from 'pino';
import pinoPretty from 'pino-pretty';
import { getTravelRequestStatus} from './status.js';

const logger = pino({
  prettifier: pinoPretty
});

/**
 * Function to update or create trip documents based on payload.
 * @param {Array} payload - Array of objects containing tenantId and tripId.
 * @returns {Promise} - Promise representing the update operation.
 */
export const updateTrip = async (payload) => {
  try {
    console.log("trip creation process", payload);
    if (!Array.isArray(payload)) {
      throw new Error('Invalid input. Payload must be an array.');
    }

    const promises = payload.map(async (item) => {
     
      console.log("each trip ...... ", item);
   const { tenantId, travelRequestData: { travelRequestId } } = item;

      
      console.log( "database query","tenantId", tenantId )
      // Use $set to replace the entire tripSchema object with the new item
      const updatedTrip = await dashboard.findOneAndUpdate(
        { tenantId, travelRequestId,  },
        { $set: { tripSchema: item } },
        { upsert: true, new: true }
      );
      
      // If the update is successful, return a success message
      if (updatedTrip) {
        return { success: true, message: 'Trip updated successfully' };
      } else {
        throw new Error('Failed to update trip');
      }
    });

    const results = await Promise.all(promises);

    console.log("waht i get i results",results);
    // Return the results array containing success messages
    return results;
  } catch (error) {
    // Handle errors
    logger.error({ error: error.message }, 'Error occurred in updateTrip function');
    // Instead of re-throwing the error, return an object with error details
    return { error: 'Error occurred', message: error.message };
  }
};


export const updateTripStatus = async (payload) => {
  console.log("Payload received for status update - trip :", payload);
  
  if (!Array.isArray(payload)) {
      throw new Error('Invalid input. Payload must be an array.');
  }
  
  let successCount = 0;
  let failureCount = 0;
  
  const results = await Promise.all(payload.map(async ({ tripId, tripStatus }) => {
      try {
        console.log(`Attempting to update trip with ID: ${tripId} to status: ${tripStatus}`);
        const updatedTrip = await dashboard.findOneAndUpdate(
          { 'tripSchema.tripId': tripId },
          { $set: { 'tripSchema.tripStatus': tripStatus } },
          { new: true }
        );
  
        if (updatedTrip) {
          successCount++;
          console.log(`Trip ${tripId} updated successfully`);
          return { success: true, message: `Trip ${tripId} updated successfully` };
        } else {
          throw new Error(`Failed to update trip ${tripId}`);
        }
      } catch (error) {
        failureCount++;
        console.log(`Error occurred while updating trip ${tripId}: ${error.message}`);
        return { success: false, message: `Error occurred while updating trip ${tripId}: ${error.message}` };
      }
  }));
  
  console.log(`Update summary: Successfully updated ${successCount} trips. Failed to update ${failureCount} trips.`);
  
  return {
      success: successCount === payload.length,
      message: `Successfully updated ${successCount} trips. Failed to update ${failureCount} trips.`
  };
 };
 

// Process transit trip message (received from - trip microservice, received -All transit trips (batchjob))
//Trip microservice --All trip updates --- asynchronous rabbitmq route --- 
export const processTransitTrip = async (message) => {
  // const failedUpdates = [];
  // const successMessage = {
  //   message: 'Successfully updated dashboard database',
  //   correlationId: correlationId,
  // };
  for (const trip of message.updatedTripsInMemory) {
    const {
      tenantId,
      tenantName,
      companyName,
      tripId,
      tripNumber,
      tripPurpose,
      tripStatus,
      tripStartDate,
      tripCompletionDate,
      isSentToExpense,
      notificationSentToDashboardFlag,
      travelRequestData,
      cashAdvancesData,
    } = trip;

    try {
    const updated = await dashboard.findOneAndUpdate(
      { 'tripSchema.tripId': tripId },
      {
        $set: {
          'tripSchema.tenantId': tenantId ?? undefined,
          'tripSchema.tenantName': tenantName ?? undefined,
          'tripSchema.companyName': companyName ?? undefined,
          'tripSchema.tripId': tripId ?? undefined,
          'tripSchema.tripNumber': tripNumber ?? undefined,
          'tripSchema.tripPurpose': tripPurpose ?? undefined,
          'tripSchema.tripStatus': tripStatus ?? undefined,
          'tripSchema.tripStartDate': tripStartDate ?? undefined,
          'tripSchema.tripCompletionDate': tripCompletionDate ?? undefined,
          'tripSchema.isSentToExpense': isSentToExpense ?? undefined,
          'tripSchema.notificationSentToDashboardFlag': notificationSentToDashboardFlag ?? undefined,
          'tripSchema.travelRequestData': travelRequestData ?? undefined,
          'tripSchema.cashAdvancesData': cashAdvancesData ?? undefined,
        },
      },
      { upsert: true, new: true }
    );
    console.log('Saved to dashboard:', updated);

  } catch (error) {
    console.error('Failed to update dashboard:', error);

    // Collect failed updates
    failedUpdates.push(trip);
    console.error('Failed to update dashboard:', error);

  }
}
//  // Send success message if updates were successful
//  if (failedUpdates.length === 0) {
//   try {
//     // Send the success message and correlationId to another service or queue for further processing
//     await sendSuccessConfirmationToTripMicroservice(successMessage, correlationId);
//     console.log('Success confirmation sent:', successMessage);
//   } catch (error) {
//     console.error('Failed to send success confirmation:', error);
//     // Handle error while sending confirmation
//   }
// }

// // Send failed updates as confirmation message
// if (failedUpdates.length > 0) {
//   try {
//     // Send the failed updates to another service or queue for further processing
//     await sendFailedConfirmationToTripMicroservice(failedUpdates,correlationId );
//     console.log(' dashboard update failed and is sent to rabbitmq sent as confirmation:', failedUpdates,correlationId);
//   } catch (error) {
//     console.error('Failed to send failed updates confirmation:', error);
//     // Handle error while sending confirmation
//   }
// }
}

// Trip microservice ---All trip updates -- synchronous rabbitmq route
export const updateTripToDashboardSync = async (message,correlationId) => {
  const failedUpdates = [];
  const successMessage = {
    message: 'Successfully updated dashboard database',
    correlationId: correlationId,
  };
  for (const trip of message.trip) {
    const {
      tenantId,
      tenantName,
      companyName,
      tripId,
      tripNumber,
      tripPurpose,
      tripStatus,
      tripStartDate,
      tripCompletionDate,
      isSentToExpense,
      notificationSentToDashboardFlag,
      travelRequestData,
      cashAdvancesData,
    } = trip;

    try {
    const updated = await dashboard.findOneAndUpdate(
      { tenantId,'tripSchema.tripId': tripId },
      {
        $set: {
          'tripSchema.tenantId': tenantId ?? undefined,
          'tripSchema.tenantName': tenantName ?? undefined,
          'tripSchema.companyName': companyName ?? undefined,
          'tripSchema.tripId': tripId ?? undefined,
          'tripSchema.tripNumber': tripNumber ?? undefined,
          'tripSchema.tripPurpose': tripPurpose ?? undefined,
          'tripSchema.tripStatus': tripStatus ?? undefined,
          'tripSchema.tripStartDate': tripStartDate ?? undefined,
          'tripSchema.tripCompletionDate': tripCompletionDate ?? undefined,
          'tripSchema.isSentToExpense': isSentToExpense ?? undefined,
          'tripSchema.notificationSentToDashboardFlag': notificationSentToDashboardFlag ?? undefined,
          'tripSchema.travelRequestData': travelRequestData ?? undefined,
          'tripSchema.cashAdvancesData': cashAdvancesData ?? undefined,
          'tripSchema.sendForNotification': false,  // always set 'sendForNotification' it as false when dashboard is updated 
          'tripSchema.travelRequestData.sendForNotification': false, 
          'tripSchema.cashAdvancesData.sendForNotification': false, 
        },
      },
      { upsert: true, new: true }
    );
    console.log('Saved to dashboard: using synchrnous queue', updated);

  } catch (error) {
    console.error('Failed to update dashboard: using synchronous queue', error);

    // Collect failed updates
    failedUpdates.push(trip);
  }
}

 // Send success message if updates were successful
 if (failedUpdates.length === 0) {
  try {
    // Send the success message and correlationId to another service or queue for further processing
    await sendSuccessConfirmationToTripMicroservice(successMessage, correlationId);
    console.log('Success confirmation sent, using synchrnous queue:', successMessage);
  } catch (error) {
    console.error('Failed to send success confirmation,using synchrnous queue:', error);
    // Handle error while sending confirmation
  }
}

// Send failed updates as confirmation message
if (failedUpdates.length > 0) {
  try {
    // Send the failed updates to another service or queue for further processing
    await sendFailedConfirmationToTripMicroservice(failedUpdates,correlationId );
    console.log(' dashboard update failed and is sent to rabbitmq sent as confirmation,using synchrnous queue:', failedUpdates,correlationId);
  } catch (error) {
    console.error('Failed to send failed updates confirmation,using synchrnous queue:', error);
  }
}
}

// export const updateTripToCompleteOrClosed = async(payload) => {

//   const {
//     listOfClosedStandAloneTravelRequests = [], 
//     listOfCompletedStandaloneTravelRequests= [],
//     listOfCompletedTravelRequests = [],
//     listOfClosedTravelRequests = [],
//   } = payload


//   if(listOfClosedStandAloneTravelRequests.length > 0){

//     const updateTravel = await dashboard.updateMany({
//       'travelRequestSchema.travelRequestId':{$in:listOfClosedStandAloneTravelRequests}
//     },{
//       $set:{
//         'travelRequestSchema.travelStatus': getTravelRequestStatus.CLOSED
//       }
//     }
//   )

//   if (updateTravel.modifiedCount !== listOfClosedStandAloneTravelRequests.length) {
//     console.log('error occurred', updateTravel)
//     throw new Error('Failed to update travel requests to closed status', updateTravel);
//   } else {
//     console.log('Successfully updated travel requests to closed status');
//     return 
//   }
//   } else if (listOfCompletedStandaloneTravelRequests.length > 0){
//     const updateTravel = await dashboard.updateMany({
//       'travelRequestSchema.travelRequestId':{$in:listOfCompletedStandaloneTravelRequests}
//     },{
//       $set:{
//         'travelRequestSchema.travelRequestStatus': getTravelRequestStatus.COMPLETED
//       }
//     })

//     if(updateTravel.modifiedCount !== listOfCompletedStandaloneTravelRequests.length > 0){
//       console.log('error occurred', updateTravel)
//       // throw new Error('Failed to update travel requests to completed status', updateTravel);
//       return{success:false, error: error}
//     }else{
//       console.log('Successfully updated travel requests to completed status');
//       return{success:true, error: null}
//     }
//   } else if (listOfCompletedTravelRequests.length > 0){
//     const updateTravel = await dashboard.updateMany({
//       'cashAdvanceSchema.travelRequestData.travelRequestId':{$in:listOfCompletedTravelRequests}
//     },{
//       $set:{
//         'cashAdvanceSchema.travelRequestData.travelRequestStatus': getTravelRequestStatus.COMPLETED
//       }
//     })
//     if(updateTravel.modifiedCount !== listOfCompletedTravelRequests.length > 0){
//       console.log('error occurred', updateTravel)
//       return { success: false, error: error}
//     } else{
//       console.log('Successfully updated travel requests to completed status');
//       return {success: true , error: error}
//     }
//   } else if(listOfClosedTravelRequests.length > 0){
//     const updateTravel = await dashboard.updateMany({
//       'cashAdvanceSchema.travelRequestData.travelRequestId':{$in:listOfClosedTravelRequests}
//     },{
//       $set:{
//         'cashAdvanceSchema.travelRequestData.travelRequestStatus': getTravelRequestStatus.CLOSED
//       }
//     }
//   )
//   if(updateTravel.modifiedCount !== listOfClosedTravelRequests.length > 0){
//     console.log('error occurred', updateTravel)
//     return { success: false, error: error}
//   }else{
//     console.log('Successfully updated travel requests to closed status');
//     return { success: true, error: null}
//   }
//   }

// }

export const updateTripToCompleteOrClosed = async (payload) => {
  const {
    listOfCompletedStandaloneTravelRequests = [],
    listOfClosedStandAloneTravelRequests = [], 
    listOfCompletedTravelRequests = [],
    listOfClosedTravelRequests = [],
  } = payload;

  const promises = [];

  if (listOfCompletedStandaloneTravelRequests.length > 0) {
    promises.push(updateTravelRequests(listOfCompletedStandaloneTravelRequests, 'travelRequestSchema.travelRequestStatus', getTravelRequestStatus.COMPLETED));
  }

  if (listOfClosedStandAloneTravelRequests.length > 0) {
    promises.push(updateTravelRequests(listOfClosedStandAloneTravelRequests, 'travelRequestSchema.travelRequestStatus', getTravelRequestStatus.CLOSED));
  }

  if (listOfCompletedTravelRequests.length > 0) {
    promises.push(updateCashAdvanceRequests(listOfCompletedTravelRequests, 'cashAdvanceSchema.travelRequestData.travelRequestStatus', getTravelRequestStatus.COMPLETED));
  }

  if (listOfClosedTravelRequests.length > 0) {
    promises.push(updateCashAdvanceRequests(listOfClosedTravelRequests, 'cashAdvanceSchema.travelRequestData.travelRequestStatus', getTravelRequestStatus.CLOSED));
  }

  try {
    const results = await Promise.all(promises);

    // Check if all updates were successful
    results.forEach(result => {
      if (!result.success) {
        throw new Error(result.error || 'Unknown error');
      }
    });

    return { success: true, error: null };
  } catch (error) {
    console.error('Error occurred during updates:', error);
    return { success: false, error: error.message || 'Unknown error' };
  }
};

async function updateTravelRequests(travelRequestIds, updateField, updateValue) {
  try {
    const updateTravel = await dashboard.updateMany({
      'travelRequestSchema.travelRequestId': { $in: travelRequestIds }
    }, {
      $set: {
        [updateField]: updateValue
      }
    });

    if (updateTravel.modifiedCount !== travelRequestIds.length) {
      console.log('Failed to update travel requests:', updateTravel);
      return { success: false, error: 'Failed to update travel requests to desired status' };
    } else {
      console.log('Successfully updated travel requests');
      return { success: true, error: null };
    }
  } catch (error) {
    console.error('Error updating travel requests:', error);
    return { success: false, error: error.message || 'Unknown error' };
  }
}

async function updateCashAdvanceRequests(travelRequestIds, updateField, updateValue) {
  try {
    const updateTravel = await dashboard.updateMany({
      'cashAdvanceSchema.travelRequestData.travelRequestId': { $in: travelRequestIds }
    }, {
      $set: {
        [updateField]: updateValue
      }
    });

    if (updateTravel.modifiedCount !== travelRequestIds.length) {
      console.log('Failed to update cash advance requests:', updateTravel);
      return { success: false, error: 'Failed to update cash advance requests to desired status' };
    } else {
      console.log('Successfully updated cash advance requests');
      return { success: true, error: null };
    }
  } catch (error) {
    console.error('Error updating cash advance requests:', error);
    return { success: false, error: error.message || 'Unknown error' };
  }
}






