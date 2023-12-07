import fonts from "@/fonts";
import CodeForm from "../../components/CodeForm";
import { editCode, getCodeById } from "@/actions/code";
import { getUser } from "@/actions/user";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Edit Code",
};

export default async function CodeEditPage({
  params,
}: {
  params: { id: string };
}) {
  const code = await getCodeById(params.id);

  const user = await getUser();
  if (!user || user.id !== code.author) redirect("/codes");

  return (
    <div>
      <h1 className={`${fonts.title.className} text-4xl my-10 text-center`}>
        Edit Code
      </h1>

      <CodeForm
        btnText="Edit"
        defaultCode={code.code}
        defaultTitle={code.title}
        defaultLang={code.language}
        defaultType={code.type}
        defaultTheme={code.theme}
        action={editCode}
        icon="edit"
      >
        <input hidden name="id" defaultValue={code.id} />
      </CodeForm>
    </div>
  );
}
