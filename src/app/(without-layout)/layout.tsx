import fonts from "@/fonts";
import "../globals.css";

export const metadata = {
  title: "PasteCode",
  description:
    "Elevate your code-sharing experience with instant sharing, and a visual appeal that makes your snippets stand out effortlessly.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-black text-white p-4 text-sm`}>{children}</body>
    </html>
  );
}
