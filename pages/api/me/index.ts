import { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import { getUserById, updateUser } from "controllers/user";
import cors from "lib/cors";

async function baseHandler(req: NextApiRequest, res: NextApiResponse, token) {
  const { id }: any = req.query;
  const { userId, username, lastname, address, phone } = req.body;

  if (req.method === "GET") {
    console.log(id);

    const user = await getUserById(id);
    res.send(user.data);
  } else if (req.method === "PATCH") {
    const user = await updateUser(userId, {
      username,
      lastname,
      address,
      phone,
    });
    res.send(user);
  } else {
    return res.status(405).json({
      message: `Método ${req.method} no permitido. Prueba con PATCH para modificar el nombre y apellido del usuario o con GET para obtener los datos`,
    });
  }
}

// Nuevo handler que maneja OPTIONS y CORS antes que cualquier auth
async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  return authMiddleware(baseHandler)(req, res);
}

export default handler;
