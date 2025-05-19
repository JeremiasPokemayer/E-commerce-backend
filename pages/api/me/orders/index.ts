import { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import { Order } from "models/orders";
import cors from "lib/cors";

async function handler(req: NextApiRequest, res: NextApiResponse, token) {
  await cors(req, res);

  if (req.method === "OPTIONS") {
    res.status(200).end(); // Maneja preflight correctamente
    return;
  }

  const data = await Order.getOrders();
  res.send(data);
}

export default authMiddleware(handler);
