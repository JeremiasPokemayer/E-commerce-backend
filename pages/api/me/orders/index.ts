import { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import { Order } from "models/orders";
import { corsMiddleware } from "lib/cors";

async function handler(req: NextApiRequest, res: NextApiResponse, token) {
  const data = await Order.getOrders();
  res.send(data);
}

function withCors(req: NextApiRequest, res: NextApiResponse) {
  const ended = corsMiddleware(req, res);
  if (ended) return;

  return authMiddleware(handler)(req, res);
}

export default withCors;
