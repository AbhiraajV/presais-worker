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
exports.sendMail = void 0;
const resend_1 = require("resend");
const k = process.env.RESEND_API_KEY;
const resend = new resend_1.Resend(k);
const prisma_1 = __importDefault(require("../prisma"));
function sendMail(userId, reportId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma_1.default.user.findFirst({ where: {
                id: userId
            } });
        if (!user)
            return;
        const { data, error } = yield resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [user.email],
            subject: 'SaaS idea analysis report is ready',
            html: `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
    <strong>It works!</strong>
    <p>Your SaaS report is ready! Click the button below to view it:</p>
    <a href="http://localhost:3000/report/${reportId}" 
       style="display: inline-block; padding: 10px 20px; margin-top: 10px; font-size: 16px; color: #ffffff; background-color: #007BFF; text-decoration: none; border-radius: 5px;">
        View Your Report
    </a>
</div>
    `,
        });
        if (error) {
            return console.error({ error });
        }
        console.log({ data });
    });
}
exports.sendMail = sendMail;
