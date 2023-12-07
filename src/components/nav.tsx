"use client";
import Link from "next/link";

import fonts from "@/fonts";
import { Button } from "./ui/button";
import { logout } from "@/actions/user";
import { ModeToggle } from "./ui/toggle-mode";

export default function Nav({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <nav className={`py-3`}>
      <ul className="flex items-center justify-between">
        <li>
          <Link className={`text-3xl ${fonts.title.className}`} href="/">
            PasteCode
          </Link>
        </li>
        <li className="flex gap-4">
          {isLoggedIn && (
            <>
              <Button asChild variant="secondary">
                <Link href="/codes">My Codes</Link>
              </Button>
              <form action={logout}>
                <Button type="submit" variant="outline">
                  Logout
                </Button>
              </form>
            </>
          )}

          <ModeToggle />
        </li>
      </ul>
    </nav>
  );
}
