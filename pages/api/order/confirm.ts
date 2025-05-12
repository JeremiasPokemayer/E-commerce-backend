import type { NextApiRequest, NextApiResponse } from "next";
import { Order } from "models/orders";
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
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Método no permitido, unicamente disponible method --POST--",
    });
  }
  const { orderId } = req.query;
  try {
    const confirm = Order.confirmOrder(orderId);
    res.status(200).json({ confirm });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: error.message || "Error al generar la orden" });
  }
}
