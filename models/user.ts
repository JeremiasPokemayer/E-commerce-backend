import { firestore } from "db/firestore";

const collection = firestore.collection("users");

export class User {
  ref: FirebaseFirestore.DocumentReference;
  data: any;
  id: string;
  constructor(id) {
    this.id = id;
    this.ref = collection.doc(id);
  }
  async pull() {
    const snap = await this.ref.get();
    this.data = snap.data();
  }
  async push() {
    this.ref.update(this.data);
  }
  static async createNewUser(data) {
    const newUserSnap = await collection.add(data);
    const newUser = new User(newUserSnap.id);
    newUser.data = data;
    return newUser;
  }
  static async updateUser(id, data) {
    const userRef = collection.doc(id);

    try {
      await userRef.update(data, { merge: true });

      const userUpdated = new User(id);
      await userUpdated.pull();
      return userUpdated;
    } catch (e) {
      console.log(e);
      throw new Error("No se pudo actualizar el usuario");
    }
  }
  static async updateUserAddress(id, data) {
    const userRef = collection.doc(id);

    try {
      await userRef.update(data, { merge: true });

      const userUpdated = new User(id);
      await userUpdated.pull();
      return userUpdated;
    } catch (e) {
      console.log(e);
      throw new Error("No se pudo actualizar el usuario");
    }
  }
}
