import type { NextApiRequest, NextApiResponse } from "next";
import { getProductById } from "controllers/products";
import Cors from "cors";
import initMiddleware from "lib/init-middleware";

const cors = initMiddleware(
  Cors({
    methods: ["GET"],
    origin: "*",
  })
);

export default async function (req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);
  const id: any = req.query.id;
  const product = await getProductById(id);
  res.send(product);
}
