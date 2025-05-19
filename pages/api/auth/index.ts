import { NextApiRequest, NextApiResponse } from "next";
import { sendCode } from "controllers/auth";
import cors from "lib/cors";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);

  if (req.method === "OPTIONS") {
    res.status(200).end(); // Maneja preflight correctamente
    return;
  }

  if (req.method === "POST") {
    const auth = await sendCode(req.body.email);
    res.send(auth);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
