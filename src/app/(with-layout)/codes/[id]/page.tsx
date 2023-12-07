import React from "react";
import Link from "next/link";

import fonts from "@/fonts";
import Editor from "@/components/editor";
import { getCodeById } from "@/actions/code";
import { Button } from "@/components/ui/button";
import { getUserById } from "@/actions/user";
import { User2 } from "lucide-react";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const code = await getCodeById(params.id);

  return {
    title: code.title,
  };
}

export default async function CodeViewPage({
  params,
}: {
  params: { id: string };
}) {
  const code = await getCodeById(params.id);
  const user = await getUserById(code.author);

  return (
    <div>
      <div className="my-10">
        <h1 className={`${fonts.title.className} text-4xl text-center mb-4`}>
          {code.title}
        </h1>

        <div className="text-center flex items-center justify-center">
          <User2 size={14} className="mr-2" />
          <Link href={`/profile/${user?.id}`}>{user?.name}</Link>
        </div>
      </div>

      <div>
        <div className="mb-5">
          <Button size="sm" variant="secondary" asChild>
            <Link href={`/codes/${code.id}/raw`}>Raw</Link>
          </Button>
        </div>
        <Editor
          defaultValue={code.code}
          lang={code.language}
          name="code"
          theme={code.theme}
          readonly={true}
        />
      </div>
    </div>
  );
}
