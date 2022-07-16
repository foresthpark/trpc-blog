import { url } from "./../constants";
import nodemailer from "nodemailer";
import { encode } from "./base64";

export async function sendLoginEmail({
  email,
  url,
  token,
}: {
  email: string;
  url: string;
  token: string;
}) {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: "'Forest Park' <forest@example.com>",
    to: email,
    subject: `Login to the site`,
    html: `
        Login by clicking <a href="${url}/login#token=${token}">HERE</a>
    `,
  });

  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
}
