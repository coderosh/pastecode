import fonts from "@/fonts";
import { createCode } from "@/actions/code";
import CodeForm from "../components/CodeForm";
import { getUser } from "@/actions/user";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Create Code",
};

export default async function CodeCreatePage() {
  const user = await getUser();
  if (!user) redirect("/");

  return (
    <div>
      <h1 className={`${fonts.title.className} text-4xl my-10 text-center`}>
        Create Code
      </h1>

      <CodeForm
        btnText="Create"
        defaultLang="javascript"
        defaultType="public"
        defaultTheme="tokyonight"
        action={createCode}
        defaultCode={`\n\n\n`}
        defaultTitle=""
        icon="create"
      />
    </div>
  );
}
