import { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import { Order } from "models/orders";
import Cors from "cors";
import initMiddleware from "lib/init-middleware";

const cors = initMiddleware(
  Cors({
    methods: ["GET"],
    origin: "*",
  })
);

async function handler(req: NextApiRequest, res: NextApiResponse, token) {
  await cors(req, res);
  const data = await Order.getOrders();
  res.send(data);
}

export default authMiddleware(handler);
