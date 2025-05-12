import { NextApiRequest, NextApiResponse } from "next";
import { sendCode } from "controllers/auth";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const auth = await sendCode(req.body.email);
    res.send(auth);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
