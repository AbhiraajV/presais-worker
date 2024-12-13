import prisma from "../prisma";
import nodemailer from "nodemailer";

const baseurl = process.env.FRONTEND

export async function sendMail(userId:string,reportId:string) {
  

    const user = await prisma.user.findFirst({where:{
    id:userId
    }})
  if(!user) return;
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: "81cfab001@smtp-brevo.com",
      pass: "XDNaWQAJR8jnyzp3", 
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"abhiraajverma@gmail.com', // sender address
    to: [user?.email ?? 'abhiraajverma@gmail.com'],
    subject: 'SaaS idea analysis report is ready',
    html: `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
        <strong>It works!</strong>
        <p>Your SaaS report is ready! Click the button below to view it:</p>
        <a href="${baseurl}${reportId}" 
        style="display: inline-block; padding: 10px 20px; margin-top: 10px; font-size: 16px; color: #ffffff; background-color: #007BFF; text-decoration: none; border-radius: 5px;">
            View Your Report
        </a>
    </div>
        `,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}
