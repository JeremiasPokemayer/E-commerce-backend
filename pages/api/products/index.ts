import type { NextApiRequest, NextApiResponse } from "next";
import { getProductById } from "controllers/products";
import { corsMiddleware } from "lib/cors";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const ended = corsMiddleware(req, res);
  if (ended) return;

  const id: any = req.query.id;
  const product = await getProductById(id);
  res.send(product);
}
