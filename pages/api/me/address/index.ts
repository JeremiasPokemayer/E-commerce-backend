import { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import { updateUserAddress } from "controllers/user";
import * as Yup from "yup";
import { corsMiddleware } from "lib/cors";

const addressSchema = Yup.object().shape({
  calle: Yup.string().required("La calle es obligatoria"),
  ciudad: Yup.string().required("La ciudad es obligatoria"),
  zipCode: Yup.string()
    .required("El código postal es obligatorio")
    .matches(/^\d{4}$/, "El código postal debe tener 4 dígitos"),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") {
    return res
      .status(405)
      .json({ message: `Método ${req.method} no permitido, prueba con PATCH` });
  }
  const { userId } = req.body;
  const { calle, ciudad, zipCode } = req.body;
  try {
    await addressSchema.validate(req.body, { abortEarly: false });
    const updateUser = await updateUserAddress(userId, {
      calle,
      ciudad,
      zipCode,
    });
    res.send(updateUser);
  } catch (e) {
    res.status(400).send({ message: e });
  }
}

function withCors(req: NextApiRequest, res: NextApiResponse) {
  const ended = corsMiddleware(req, res);
  if (ended) return; // Preflight handled

  return authMiddleware(handler)(req, res);
}

export default withCors;
