"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const RABBITMQ_URL = process.env.AMQ_URI;
const QUEUE_NAME = 'single';
// import { findCompetition } from "./functions/findcomp.ai";
// import { totalAnalysis } from './functions/analysis.api';
const functions_1 = require("./functions");
function startRabbitMQListener() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield amqplib_1.default.connect(RABBITMQ_URL);
            console.log('Connected to RabbitMQ');
            const channel = yield connection.createChannel();
            yield channel.assertQueue(QUEUE_NAME, { durable: true });
            console.log(`Waiting for messages in queue: ${QUEUE_NAME}`);
            channel.consume(QUEUE_NAME, (message) => {
                if (message) {
                    console.log(`Received message: ${message.content.toString()}`);
                    const { prompt, userId } = JSON.parse(message.content.toString());
                    (0, functions_1.main)(prompt, userId).then((a) => {
                        console.log(a);
                        channel.ack(message);
                    });
                }
            });
        }
        catch (error) {
            console.error('Error connecting to RabbitMQ:', error);
        }
    });
}
startRabbitMQListener();
