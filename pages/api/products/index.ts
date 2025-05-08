import type { NextApiRequest, NextApiResponse } from "next";
import { getProductById } from "controllers/products";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const id: any = req.query.id;
  const product = await getProductById(id);
  res.send(product);
}
