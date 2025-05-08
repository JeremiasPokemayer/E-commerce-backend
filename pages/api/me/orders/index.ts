import { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import { Order } from "models/orders";

async function handler(req: NextApiRequest, res: NextApiResponse, token) {
  const data = await Order.getOrders();
  res.send(data);
}

export default authMiddleware(handler);
