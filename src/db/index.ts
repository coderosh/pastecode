import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

import getEnv from "@/lib/get-env";

const client = createClient({
  url: getEnv("DB_URL"),
});

export default drizzle(client);
