import Link from "next/link";

import fonts from "@/fonts";
import { getUser } from "@/actions/user";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const user = await getUser();

  return (
    <div className="mt-20">
      <div className="text-center">
        <h1 className={`${fonts.title.className} text-5xl`}>PasteCode</h1>
        <p className="text-xl my-10 max-w-prose mx-auto">
          Elevate your code-sharing experience with instant sharing, and a
          visual appeal that makes your snippets stand out effortlessly.
        </p>
      </div>

      <div className="flex items-center justify-center gap-4">
        {user ? (
          <>
            <Button asChild variant="default" size="lg">
              <Link href="/codes/new">Create Code</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/codes">View Your Codes</Link>
            </Button>
          </>
        ) : (
          <>
            <Button asChild variant="default" size="lg">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/signup">Signup</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
