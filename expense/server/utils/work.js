import amqp from 'amqplib';
import { updateHRMaster, updatePreferences } from './messageProcessor.js/onboardingMessage.js';
import {  tripCancellationUpdate } from './messageProcessor.js/trip.js';
import { recoverCashAdvance, settleCashAdvance, settleExpenseReport, settleExpenseReportPaidAndDistributed } from './messageProcessor.js/finance.js';
import { addALegToTravelRequestData } from '../controller/travelExpenseController.js';
import dotenv from 'dotenv';

dotenv.config();

//start consuming messages..
export async function startConsumer(receiver){
   const rabbitMQUrl = process.env.rabbitMQUrl;
  
   const connectToRabbitMQ = async () => {
    try {
      console.log('Connecting to RabbitMQ...');
      const connection = await amqp.connect(rabbitMQUrl);
       const channel = await connection.createConfirmChannel();
      console.log('Connected to RabbitMQ.');
      return channel;
    } catch (error) {
      console.log('Error connecting to RabbitMQ:', error);
      return error;
    }
  };
  
  const channel = await connectToRabbitMQ();
  const exchangeName = 'amqp.dashboard';
  const queue = `q.${receiver}`;
  const routingKey = `rk.${receiver}`;
  
  console.log(`Asserting exchange: ${exchangeName}`);
  await channel.assertExchange(exchangeName, 'direct', { durable: true });
  
  console.log(`Asserting queue: ${queue}`);
  await channel.assertQueue(queue, { durable: true });
   
  
  console.log(`Binding queue ${queue} to exchange ${exchangeName}`);
  await channel.bindQueue(queue, exchangeName, routingKey);
  
  
  console.log('listening for messages. To exit press CTRL+C');
  
    // Listen for response
    channel.consume(queue, async (msg) => {
        if (msg && msg.content) {

      const content = JSON.parse(msg.content.toString());
  
      console.log(`coming from ${content.headers?.source} meant for ${content.headers?.destination}`)
      //console.log('payload', content?.payload)
      const payload = content?.payload
      const source = content?.headers?.source
      const action = content?.headers?.action
  
      if(content.headers.destination == 'expense'){
  
        if(source == 'onboarding'){
          console.log('trying to update HR Master')
          const res = await updateHRMaster(payload)
          console.log(res)
          if(res.success){
            //acknowledge message
            channel.ack(msg)
            console.log('message processed successfully')
          }
          else{
            //implement retry mechanism
            console.log('update failed with error code', res.error)
          }
        }
        else if(source == 'trip'){
            if(action == 'full-update')
            console.log('trying to update Travel and cash after cancellation ')
            const res = await tripCancellationUpdate(payload)
            console.log(res)
            if(res.success){
              //acknowledge message
              channel.ack(msg)
              console.log('message processed successfully')
            }
            else{
              //implement retry mechanism
              console.log('update failed with error code', res.error)
            }
          }
        else if(source == 'finance'){
          if(action == 'settle-expense-paid') {
            console.log(" expenseheaderstatus paid")
            const res = await settleExpenseReport(payload);
            if(res.success){
                channel.ack(msg)
                console.log('expenseheaderstatus paid- successful ')
            }else{
                console.log('error updating travel and cash')
            }
        }
        if(action == 'settle-expense-Paid-and-distributed') {
          console.log(" expenseheaderstatus paid and distributed")
          const res = await settleExpenseReportPaidAndDistributed(payload);
          if(res.success){
              channel.ack(msg)
              console.log('expenseheaderstatus paid- successful ')
          }else{
              console.log('error updating travel and cash')
          }
      }
        if(action == 'settle-cash') {
          console.log(" ")
          const res = await settleCashAdvance(payload);
          if(res.success){
              channel.ack(msg)
              console.log('cash update successful ')
          }else{
              console.log('error updating travel and cash')
          }
      }
      if(action == 'recover-cash') {
        console.log(" ")
        const res = await recoverCashAdvance(payload);
        if(res.success){
            channel.ack(msg)
            console.log('cash update successful ')
        }else{
            console.log('error updating travel and cash')
        }
    }
        } else if (source == 'dashboard'){
          if(action == 'profile-update'){
            const res = await updatePreferences(payload);
            console.log(res)
            if(res.success){
              //acknowledge message
              channel.ack(msg)
              console.log('message processed successfully')
            }
            else{
              //implement retry mechanism
              console.log('update failed with error code', res.error)
            }
  
          }
        } else if (source == 'travel'){
          if(action == 'add-leg'){
            console.log('add-leg from travel microservice to expense microservice')
            const res = await addALegToTravelRequestData(payload);
            console.log(res)
            if(res.success){
              //acknowledge message
              channel.ack(msg)
              console.log('message processed successfully')
            }
            else{
              //implement retry mechanism
              console.log('update failed with error code', res.error)
            }
          }  
        } else if ( source == 'cash'){
          if(action == 'add-leg'){
            console.log('add-leg from cash microservice to expense microservice')
            const res = await addALegToTravelRequestData(payload);
            console.log(res)
            if(res.success){
              //acknowledge message
              channel.ack(msg)
              console.log('message processed successfully')
            }
            else{
              //implement retry mechanism
              console.log('update failed with error code', res.error)
            }
          }  
        }
      } 
    }}, { noAck: false });
  }
  
  

  import amqp from 'amqplib';

  export async function startConsumer(receiver) {
    const rabbitMQUrl = process.env.rabbitMQUrl;
  
    const connectToRabbitMQ = async () => {
      try {
        console.log('Connecting to RabbitMQ...');
        const connection = await amqp.connect(rabbitMQUrl);
        const channel = await connection.createConfirmChannel();
        console.log('Connected to RabbitMQ.');
        return channel;
      } catch (error) {
        console.log('Error connecting to RabbitMQ:', error);
        throw error; // Throw the error to signal the failure of connection attempt
      }
    };
  
    const setupQueue = async () => {
      const channel = await connectToRabbitMQ();
      const exchangeName = 'amqp.dashboard';
      const queue = `q.${receiver}`;
      const routingKey = `rk.${receiver}`;
  
      console.log(`Asserting exchange: ${exchangeName}`);
      await channel.assertExchange(exchangeName, 'direct', { durable: true });
  
      console.log(`Asserting queue: ${queue}`);
      await channel.assertQueue(queue, { durable: true });
  
      console.log(`Binding queue ${queue} to exchange ${exchangeName}`);
      await channel.bindQueue(queue, exchangeName, routingKey);
  
      console.log('Listening for messages. To exit, press CTRL+C');
  
      // Listen for response
      channel.consume(queue, async (msg) => {
        if (msg && msg.content) {
          const content = JSON.parse(msg.content.toString());
  
          console.log(`Coming from ${content.headers?.source} meant for ${content.headers?.destination}`);
          // ... rest of the code ...
        }
      }, { noAck: false });
  
      // Handle channel closure
      channel.on('close', async (err) => {
        console.error('Channel closed:', err);
        // Attempt to reconnect
        try {
          const newChannel = await connectToRabbitMQ();
          setupQueue(); // Re-setup the queue on the new channel
        } catch (reconnectError) {
          console.error('Error reconnecting to RabbitMQ:', reconnectError);
          // Handle the reconnection error as needed
        }
      });
    };
  
    await setupQueue(); // Initial setup
  
    // Additional code can be added here if needed
  }
  