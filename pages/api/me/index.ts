import { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import { getUserById, updateUser } from "controllers/user";
import Cors from "cors";
import initMiddleware from "lib/init-middleware";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "PATCH"],
    origin: "http://localhost:3000",
  })
);

async function handler(req: NextApiRequest, res: NextApiResponse, token) {
  await cors(req, res);
  const { userId } = req.body;
  const { username, lastname } = req.body;
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
