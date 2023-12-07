import { SignJWT, jwtVerify } from "jose";

import getEnv from "./get-env";

const secret = new TextEncoder().encode(getEnv("JWT_SECRET"));

const sign = async (data: { name: string; id: string; email: string }) => {
  const token = await new SignJWT({
    jti: data.id,
    name: data.name,
    email: data.email,
    id: data.id,
  })
    .setProtectedHeader({ alg: "HS256" })
    .sign(secret);

  return token;
};

const verify = async (token: string) => {
  const data = await jwtVerify(token, secret);
  return data.payload as { id: string; name: string; email: string };
};

const jwt = { sign, verify };

export default jwt;
