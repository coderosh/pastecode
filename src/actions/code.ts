"use server";

import db from "@/db";
import { codes } from "@/db/schema";
import { notFound, redirect } from "next/navigation";
import { getUser } from "./user";
import { and, desc, eq } from "drizzle-orm";

export async function createCode(_: { error: string }, formData: FormData) {
  const data = extractCodeData(formData);

  if ("error" in data) return data;

  const { title, code, language, theme, type } = data;

  const author = await getUser();

  if (!author) return redirect("/");

  await db.insert(codes).values({
    title,
    code,
    language,
    type: type as "public" | "private" | "unlisted",
    theme,
    author: author.id,
  });

  redirect("/codes");
}

export async function editCode(_: { error: string }, formData: FormData) {
  const id = formData.get("id");

  if (typeof id !== "string") return redirect("/codes");

  const data = extractCodeData(formData);

  if ("error" in data) return data;

  const { title, code, language, theme, type } = data;

  const author = await getUser();

  if (!author) return redirect("/");

  await db
    .update(codes)
    .set({ title, code, language, type })
    .where(and(eq(codes.id, id), eq(codes.author, author.id)));

  redirect("/codes");
}

export async function deleteCode(id: string) {
  const user = await getUser();

  const code = await db.select().from(codes).where(eq(codes.id, id)).get();

  if (user?.id !== code?.author) redirect("/");

  await db.delete(codes).where(eq(codes.id, id));

  redirect("/codes");
}

export async function myCodes() {
  const user = await getUser();

  if (!user) return redirect("/");

  const allCodes = await getUserCodes(user.id);

  return allCodes;
}

export async function getCodeById(id: string) {
  const author = await getUser();

  if (typeof id !== "string") return redirect("/codes");

  const code = await db
    .select()
    .from(codes)
    .limit(1)
    .where(eq(codes.id, id))
    .get();

  if (!code) return notFound();

  if (code.type === "private") {
    if (!author || author.id !== code.author) redirect("/");
  }

  return code;
}

export async function getUserCodes(userId: string) {
  const curUser = await getUser();

  const isCurUser = curUser?.id === userId;

  const where = and(
    eq(codes.author, userId),
    !isCurUser ? eq(codes.type, "public") : undefined
  );

  const allCodes = await db
    .select()
    .from(codes)
    .orderBy(desc(codes.timestamp))
    .where(where);

  return allCodes;
}

const extractCodeData = (
  formData: FormData
):
  | {
      title: string;
      code: string;
      language: string;
      theme: string;
      type: "public" | "private" | "unlisted";
    }
  | { error: string } => {
  const title = formData.get("title");
  const code = formData.get("code");

  const language = formData.get("lang");
  const theme = formData.get("theme");
  const type = formData.get("type");

  if (typeof title !== "string" || title.trim().length === 0)
    return { error: "Title must be provided" };

  if (typeof code !== "string" || code.trim().length === 0)
    return { error: "Code must be provided" };

  if (typeof language !== "string")
    return { error: "Language must be provided" };

  if (typeof type !== "string") return { error: "Type must be provided" };

  if (typeof theme !== "string") return { error: "Theme must be provided" };

  return {
    title,
    code,
    language,
    theme,
    type: type as "public" | "private" | "unlisted",
  };
};
