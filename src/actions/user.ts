"use server";

import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { compare, hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { LibsqlError } from "@libsql/client";

import db from "@/db";
import jwt from "@/lib/jwt";
import { users } from "@/db/schema";
import getEnv from "@/lib/get-env";

export async function signup(
  _formState: { error: string },
  formData: FormData
) {
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    let password = formData.get("password");

    if (typeof name !== "string" || name.trim().length === 0)
      return { error: "Name must be provided" };

    if (typeof email !== "string" || email.trim().length === 0)
      return { error: "Email must be provided" };

    if (typeof password !== "string" || password.trim().length <= 3)
      return { error: "Password must be at least 4 characters long" };

    password = await hash(password, 12);

    await db.insert(users).values({
      name,
      email,
      password,
    });

    redirect("/");
  } catch (error) {
    if (
      error instanceof LibsqlError &&
      error.code === "SQLITE_CONSTRAINT_UNIQUE"
    ) {
      return {
        error: "User already exists",
      };
    }

    // handled by error.ts
    throw error;
  }
}

export const login = async (_: { error: string }, formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string") return { error: "Email must be provided" };

  if (typeof password !== "string")
    return { error: "Password must be provided" };

  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)
    .get();

  if (!user) return { error: "Wrong credentials" };

  const validPass = await compare(password, user.password);

  if (!validPass) return { error: "Wrong credentials" };

  const cookieStore = cookies();

  const key = getEnv("COOKIE_TOKEN_NAME");

  const token = await jwt.sign(user);

  cookieStore.set(key, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  redirect("/");
};

export async function logout() {
  cookies().delete(getEnv("COOKIE_TOKEN_NAME"));
  redirect("/");
}

export async function getUser() {
  const token = cookies().get(getEnv("COOKIE_TOKEN_NAME"))?.value;

  if (!token) return null;

  const user = await jwt.verify(token).catch(() => undefined);

  if (!user) return null;

  return user;
}

export async function getUserById(id: string) {
  const user = await db
    .select({ name: users.name, email: users.email, id: users.id })
    .from(users)
    .limit(1)
    .get();

  return user ? user : null;
}
