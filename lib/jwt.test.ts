import { test } from "vitest";
import { generate, decode } from "lib/jwt";

test("jwt encode/decode", (t) => {
  const payload = { jere: true };
  const token = generate(payload);
  const salida: any = decode(token);
  delete salida.iat;
  t.expect(salida).toEqual(payload);
  console.log("Test pasado", token);
});
