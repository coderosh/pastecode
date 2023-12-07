import { getUserCodes } from "@/actions/code";
import { getUser, getUserById } from "@/actions/user";
import { redirect } from "next/navigation";
import CodeListItem from "../../codes/components/CodeListItem";
import { User2 } from "lucide-react";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const user = await getUserById(params.id);

  return {
    title: user?.name || "Profile",
  };
}

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const curUser = await getUser();
  const user = await getUserById(params.id);

  if (!user) redirect("/");

  const codes = await getUserCodes(user.id);

  console.log({ user, curUser });

  return (
    <div>
      <h3 className="text-4xl text-center flex items-center gap-5 justify-center my-10">
        <User2 size={30} /> <span>{user.name}</span>
      </h3>
      <ul>
        {codes.map((code) => (
          <CodeListItem
            showControls={user.id === curUser?.id}
            id={code.id}
            title={code.title}
            key={code.id}
          />
        ))}
      </ul>
    </div>
  );
}
