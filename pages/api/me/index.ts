import { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import { getUserById, updateUser } from "controllers/user";
import cors from "lib/cors";

async function handler(req: NextApiRequest, res: NextApiResponse, token) {
  const { userId, username, lastname } = req.body;
  await cors(req, res);

  if (req.method === "OPTIONS") {
    res.status(200).end(); // Maneja preflight correctamente
    return;
  }

  if (req.method === "GET") {
    const user = await getUserById(token.userId);
    res.send(user.data);
  } else if (req.method === "PATCH") {
    const user = await updateUser(userId, { username, lastname });
    res.send(user);
  } else {
    return res.status(405).json({
      message: `Método ${req.method} no permitido. Prueba con PATCH para modificar el nombre y apellido del usuario o con GET para obtener los datos`,
    });
  }
}

export default authMiddleware(handler);
