import Cors from "cors";
import initMiddleware from "./middlewares";

const cors = initMiddleware(
  Cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  })
);

export default cors;
