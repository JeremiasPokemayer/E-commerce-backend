import { firestore } from "db/firestore";

const collection = firestore.collection("orders");

export class Order {
  ref: FirebaseFirestore.DocumentReference;
  orderId: string;
  data: any;
  constructor(orderId) {
    this.orderId = orderId;
    this.ref = collection.doc(orderId);
  }
  async pull() {
    const snap = await this.ref.get();
    this.data = snap.data();
  }
  async push() {
    this.ref.update(this.data);
  }
  static async getOrders() {
    const data = await collection.get();
    const orders = data.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return orders;
  }
  static async getOrderById(orderId) {
    const orderRef = collection.doc(orderId);
    try {
      const snap = await orderRef.get();
      if (!snap.exists) {
        throw new Error("Orden no encontrada");
      }
      return {
        id: snap.id,
        ...snap.data(),
      };
    } catch (e) {
      console.log(e);
      throw new Error("No se pudo obtener la orden");
    }
  }
  static async createNewOrder(data) {
    const newUserSnap = await collection.add(data);
    const newUser = new Order(newUserSnap.id);
    newUser.data = data;
    return newUser;
  }
  static async confirmOrder(orderId) {
    const orderRef = collection.doc(orderId);

    try {
      await orderRef.update({ status: "Confirmado" });
      const orderUpdated = new Order(orderId);
      await orderUpdated.pull();
      return orderUpdated;
    } catch (e) {
      console.log(e);
      throw new Error("No se pudo actualizar el usuario");
    }
  }
}
