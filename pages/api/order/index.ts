import type { NextApiRequest, NextApiResponse } from "next";
import { generateOrder, getOrder } from "controllers/orders";
import Cors from "cors";
import initMiddleware from "lib/init-middleware";

const cors = initMiddleware(
  Cors({
    methods: ["POST", "GET"],
    origin: "*",
  })
);

export default async function (req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);
  if (req.method == "POST") {
    const { productId } = req.query;
    try {
      const [paymentUrl, mpId, orderId, newPref] = await generateOrder(
        productId as string
      );
      res.status(200).json({ paymentUrl, mpId, orderId, newPref });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: error.message || "Error al generar la orden" });
    }
  } else if (req.method == "GET") {
    const { orderId } = req.body;
    const order = await getOrder(orderId);
    res.send(order);
  } else {
    return res.status(405).json({
      message:
        "Método no permitido, unicamente disponible method --POST-- y method --GET--",
    });
  }
}
