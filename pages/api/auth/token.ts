import { NextApiRequest, NextApiResponse } from "next";
import { generate } from "lib/jwt";
import { Auth } from "models/auth";
import cors from "lib/cors";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);

  if (req.method === "OPTIONS") {
    res.status(200).end(); // Maneja preflight correctamente
    return;
  }

  if (req.method === "POST") {
    const auth = await Auth.findByEmailAndCode(req.body.email, req.body.code);
    if (!auth) {
      res.status(401).send({
        message: "email o code incorrectos",
      });
    }
    const expires = auth.isCodeExpired();
    if (expires) {
      res.status(401).send({
        message: "code expirado",
      });
    }
    const token = generate({ userId: "KcpQs44zNlldLaKQdJQ8" });
    res.send({ token });
  }
}
