type EnvKey = "DB_URL" | "JWT_SECRET" | "COOKIE_TOKEN_NAME" | "BASE_URL";

const getEnv = (name: EnvKey) => {
  const val = process.env[name];

  if (typeof val === "undefined")
    throw new Error(`Environment variable "${name}" is not set`);

  return val;
};

export default getEnv;
