import { NextApiRequest, NextApiResponse } from "next";
import { getPaymentById, WebhokPayload } from "lib/mercadopago";
import { authMiddleware } from "lib/middlewares";
import { Order } from "models/orders";
import { sendEmailNotification } from "controllers/user";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const email = "jeremiaspokemayerdev@gmail.com";
    const { id }: any = req.body;
    try {
      const paymentData = await getPaymentById(id);
      console.log(paymentData);

      if (paymentData.status === "approved") {
        const orderId = paymentData.external_reference;
        await Order.confirmOrder(orderId);
        await sendEmailNotification(paymentData, email);
      }

      res.status(200).json({ message: "Notificación recibida, mail enviado" });
    } catch (error) {
      console.error("Error al procesar la notificación:", error);
      res
        .status(500)
        .json({
          message: "Error al procesar la notificación",
          error: error.message,
        });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}

export default authMiddleware(handler);
