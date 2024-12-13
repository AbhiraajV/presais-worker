import { Resend } from 'resend';
const k = process.env.RESEND_API_KEY!
const baseurl = process.env.FRONTEND
const resend = new Resend(k);
import prisma from '../prisma';
export async function sendMail(userId:string,reportId:string) {
  const user = await prisma.user.findFirst({where:{
    id:userId
  }})
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
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

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
}
