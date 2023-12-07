import { myCodes } from "@/actions/code";
import fonts from "@/fonts";
import CodeListItem from "./components/CodeListItem";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pen } from "lucide-react";
import { getUser } from "@/actions/user";
import { redirect } from "next/navigation";

export const metadata = {
  title: "My Codes",
};

export default async function CodesPage() {
  const codes = await myCodes();

  const user = await getUser();
  if (!user) redirect("/");

  return (
    <div>
      <h1 className={`${fonts.title.className} text-4xl my-10 text-center`}>
        My Codes
      </h1>
      <Button asChild size="sm">
        <Link href="/codes/new">
          <Pen size={16} className="mr-1" />
          Create
        </Link>
      </Button>
      <ul>
        {codes.map((code) => (
          <CodeListItem
            showControls
            key={code.id}
            id={code.id}
            title={code.title}
          />
        ))}
      </ul>
    </div>
  );
}
