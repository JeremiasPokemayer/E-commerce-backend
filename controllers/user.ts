import { User } from "models/user";
import { Resend } from "resend";

export async function getUserById(id: string): Promise<any> {
  const user = new User(id);
  await user.pull();
  return user;
}

export async function updateUserAddress(userId, addressData) {
  const userUpdate = await User.updateUserAddress(userId, addressData);
  return userUpdate;
}

export async function updateUser(userId, updateData) {
  const userUpdate = await User.updateUser(userId, updateData);
  return userUpdate;
}

export async function sendEmailNotification(data, email) {
  const resend = new Resend(process.env.RESEND_KEY);
  resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "--CONFIRMACIÓN DEL PAGO--",
    html: `<p>Esta es la confirmacion del pago <strong>${data}</strong></p>`,
  });
  console.log("email enviado a " + email);
  return true;
}
