import type { NextApiRequest, NextApiResponse } from "next";
import { getProductById } from "controllers/products";
import cors from "lib/cors";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const id: any = req.query.id;
  const product = await getProductById(id);
  res.send(product);
}
