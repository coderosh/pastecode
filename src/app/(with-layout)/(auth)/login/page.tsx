import { User2, Loader2 } from "lucide-react";

import Form from "@/components/form";
import { getUser, login } from "@/actions/user";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/submit-button";
import fonts from "@/fonts";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const user = await getUser();

  if (user) redirect("/");

  return (
    <div>
      <h1 className={`${fonts.title.className} text-4xl my-10 text-center`}>
        Login
      </h1>
      <Form action={login}>
        <div className="mb-5">
          <Label htmlFor="email">Email</Label>
          <Input type="text" name="email" id="email" />
        </div>
        <div className="mb-5">
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" id="password" />
        </div>
        <SubmitButton
          normal={
            <>
              <User2 className="mr-1" size={16} /> Login
            </>
          }
          loading={
            <>
              <Loader2 className="animate-spin mr-1" size={16} /> Login
            </>
          }
        />
      </Form>
    </div>
  );
}
