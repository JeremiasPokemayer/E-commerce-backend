import { NextApiRequest, NextApiResponse } from "next";
import { sendCode } from "controllers/auth";
import cors from "lib/cors";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function (req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "POST") {
    const auth = await sendCode(req.body.email);

    const msg = {
      from: "<onboarding@resend.dev>",
      to: req.body.email,
      subject: "¡NO LO COMPARTAS CON NADIE!",
      html: `<p>Este es tu codigo: <strong>${auth.data.code}</strong></p>`,
    };
    try {
      await resend.emails.send(msg);
    } catch (e) {
      throw "No fue posible enviar el mail";
    }
    res.send(auth);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
