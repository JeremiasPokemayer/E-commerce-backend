import { createSingleProductPreference } from "lib/mercadopago";
import { Order } from "models/orders";
import { getProductById } from "controllers/products";

export async function generateOrder(objectID: any) {
  const productData = await getProductById(objectID);
  const product = productData[0];
  const name = product.Name;
  const message = product.Description;
  const amount = product["Unit cost"];

  const newPref = await createSingleProductPreference({
    productName: name,
    productDescription: message,
    productId: objectID,
    productPrice: amount,
    transactionId: objectID,
  });

  const newOrder = await Order.createNewOrder({
    name,
    message,
    amount,
    id: newPref.id,
    status: "Pendiente",
  });
  return [newPref.init_point, newPref.id, newOrder.orderId, newPref];
}

export async function getOrder(orderId: any) {
  const order = await Order.getOrderById(orderId);
  return order;
}
