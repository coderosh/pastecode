"use client";

import { ReactNode } from "react";
import { useFormState } from "react-dom";

interface FormProps {
  action: (
    state: { error: string },
    payload: FormData
  ) => Promise<{ error: string }>;
  children: ReactNode;
}

export default function Form({ action, children }: FormProps) {
  const [{ error }, formAction] = useFormState(action, { error: "" });

  return (
    <>
      <form action={formAction}>{children}</form>
      {error && <div className="p-2 my-2 bg-red-500 rounded">{error}</div>}
    </>
  );
}
