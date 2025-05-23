import { User } from "models/user";
import { Auth } from "models/auth";
import seedrandom from "seedrandom";
import { addMinutes } from "date-fns/addMinutes";

function generateCode(seed = Date.now().toString()) {
  const rng = seedrandom(seed);
  const code = Math.floor(rng() * 90000) + 10000;
  return code;
}

export async function findOrCreateAuth(email: string) {
  const cleanEmail = email.trim().toLowerCase();
  const auth = await Auth.findByEmail(cleanEmail);
  if (auth) {
    return auth;
  } else {
    const newUser = await User.createNewUser({
      email: cleanEmail,
    });
    const newAuth = await Auth.createNewAuth({
      email: cleanEmail,
      userId: newUser.id,
      code: "",
      expires: new Date(),
    });
    return newAuth;
  }
}

export async function sendCode(email: string) {
  const auth = await findOrCreateAuth(email);
  const code = generateCode();
  const now = new Date();
  const twentyMinutesFromNow = addMinutes(now, 20);
  auth.data.code = code;
  auth.data.expires = twentyMinutesFromNow;
  await auth.push();
  return auth;
}
