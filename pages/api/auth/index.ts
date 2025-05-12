import { NextApiRequest, NextApiResponse } from "next";
import { sendCode } from "controllers/auth";
import Cors from "cors";
import initMiddleware from "lib/init-middleware";

const cors = initMiddleware(
  Cors({
    methods: ["POST"],
    origin: "*",
  })
);

export default async function (req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);
  if (req.method === "POST") {
    const auth = await sendCode(req.body.email);
    res.send(auth);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
