"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import { FileEdit, FilePlus2, Loader2 } from "lucide-react";

import Form from "@/components/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/submit-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

const Editor = dynamic(() => import("@/components/editor"), {
  loading: () => <Skeleton className="w-full h-24" />,
});

interface CodeFormProps {
  defaultLang: string;
  defaultType: string;
  defaultTheme: string;
  defaultTitle: string;
  defaultCode: string;
  btnText: string;
  icon: "create" | "edit";
  action: (
    state: { error: string },
    formData: FormData
  ) => Promise<{ error: string }>;
  children?: React.ReactNode;
}

export default function CodeForm({
  action,
  btnText,
  defaultLang,
  defaultType,
  defaultTheme,
  defaultTitle,
  defaultCode,
  icon,
  children,
}: CodeFormProps) {
  const [lang, setLang] = useState(defaultLang);
  const [type, setType] = useState(defaultType);
  const [theme, setTheme] = useState(defaultTheme);

  return (
    <Form action={action}>
      {children}
      <div className="mb-5">
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          name="title"
          id="title"
          defaultValue={defaultTitle}
        />
      </div>
      <CodeFormSelect
        label="Language"
        name="lang"
        value={lang}
        onChange={(val) => setLang(val)}
        values={{
          javascript: "Javascript/Typescript",
          python: "Python",
          css: "CSS",
        }}
      />
      <CodeFormSelect
        label="Type"
        name="type"
        onChange={(val) => setType(val)}
        value={type}
        values={{ public: "Public", private: "Private", unlisted: "Unlisted" }}
      />
      <CodeFormSelect
        label="Theme"
        name="theme"
        onChange={(val) => setTheme(val)}
        value={theme}
        values={{
          tokyonight: "Tokyo Night",
          vscode: "VSCode Dark",
          nord: "Nord",
          material: "Material Dark",
          github: "Github Dark",
          "tokyonight-storm": "Tokyonight Storm",
        }}
      />
      <div className="mb-5">
        <Label htmlFor="code">Code</Label>
        <Editor
          name="code"
          theme={theme}
          lang={lang}
          defaultValue={defaultCode}
        />
      </div>
      <SubmitButton
        normal={
          <>
            {icon === "create" ? (
              <FilePlus2 className="mr-1" size={16} />
            ) : (
              <FileEdit className="mr-1" size={16} />
            )}
            {btnText}
          </>
        }
        loading={
          <>
            <Loader2 className="animate-spin mr-1" size={16} /> {btnText}
          </>
        }
      />
    </Form>
  );
}

function CodeFormSelect({
  value,
  onChange,
  label,
  name,
  values,
}: {
  value: string;
  onChange: (val: string) => any;
  name: string;
  label: string;
  values: Record<string, string>;
}) {
  return (
    <div className="mb-5">
      <Label htmlFor={name}>{label}</Label>
      <Select name={name} value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent id={name}>
          {Object.keys(values).map((val) => {
            return (
              <SelectItem key={val} value={val}>
                {values[val]}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
