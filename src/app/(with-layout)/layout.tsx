import type { Metadata } from "next";

import "../globals.css";

import fonts from "@/fonts";
import Nav from "@/components/nav";
import { getUser } from "@/actions/user";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: {
    template: "PasteCode - %s",
    default: "PasteCode",
  },
  description:
    "Elevate your code-sharing experience with instant sharing, and a visual appeal that makes your snippets stand out effortlessly.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <html lang="en">
      <body className={fonts.normal.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex justify-between flex-col min-h-screen">
            <div className="w-10/12 mx-auto">
              <Nav isLoggedIn={!!user} />
              {children}
            </div>
            <footer className="my-10 text-center">Roshan Acharya</footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
