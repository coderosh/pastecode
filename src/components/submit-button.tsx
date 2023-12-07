"use client";

import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./ui/button";
import { ReactNode } from "react";

interface Props extends ButtonProps {
  normal: ReactNode;
  loading: ReactNode;
}

export default function SubmitButton({
  children,
  normal,
  loading,
  ...rest
}: Props) {
  const { pending } = useFormStatus();

  return (
    <Button {...rest} disabled={pending}>
      {pending ? loading : normal}
    </Button>
  );
}
