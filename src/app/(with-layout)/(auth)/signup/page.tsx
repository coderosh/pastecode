import { Loader2, User2 } from "lucide-react";

import fonts from "@/fonts";
import Form from "@/components/form";
import { getUser, signup } from "@/actions/user";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/submit-button";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const user = await getUser();

  if (user) redirect("/");

  return (
    <div>
      <h1 className={`${fonts.title.className} text-4xl my-10 text-center`}>
        Signup
      </h1>
      <Form action={signup}>
        <div className="mb-5">
          <Label htmlFor="name">Name</Label>
          <Input type="text" name="name" id="name" />
        </div>
        <div className="mb-5">
          <Label htmlFor="email">Email</Label>
          <Input type="email" name="email" id="email" />
        </div>
        <div className="mb-5">
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" id="password" />
        </div>
        <SubmitButton
          normal={
            <>
              <User2 className="mr-1" size={16} /> Signup
            </>
          }
          loading={
            <>
              <Loader2 className="animate-spin mr-1" size={16} /> Signup
            </>
          }
        />
      </Form>
    </div>
  );
}
