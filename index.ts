import amqp from 'amqplib';
import dotenv from 'dotenv';
dotenv.config();
const RABBITMQ_URL = process.env.AMQ_URI!;
const QUEUE_NAME = 'single';

// import { findCompetition } from "./functions/findcomp.ai";
// import { totalAnalysis } from './functions/analysis.api';
import { main } from './functions';

async function startRabbitMQListener() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    console.log('Connected to RabbitMQ');

    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    console.log(`Waiting for messages in queue: ${QUEUE_NAME}`);

    channel.consume(QUEUE_NAME, (message) => {
      if (message) {
        console.log(`Received message: ${message.content.toString()}`);
        const {prompt,userId} = JSON.parse(message.content.toString()) as {prompt:string,userId:string}; 
        main(prompt,userId).then((a)=>{
            console.log(a)
            channel.ack(message)
          });
         
      }
    });
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
}

startRabbitMQListener();
