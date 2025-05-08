import { defineConfig } from "vitest/config";
import dotenv from "dotenv";

// Carga las variables de entorno desde el archivo .env
dotenv.config({ path: ".env.local" });

export default defineConfig({
  test: {
    // Aquí puedes agregar otras configuraciones de Vitest si es necesario
  },
});
