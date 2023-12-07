"use client";

import React from "react";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import CodeMirror, { Extension } from "@uiw/react-codemirror";
import {
  tokyoNight,
  vscodeDark,
  nord,
  materialDark,
  githubDark,
  tokyoNightStorm,
} from "@uiw/codemirror-themes-all";

export interface EditorProps {
  defaultValue: string;
  lang: string;
  theme: string;
  name: string;
  readonly?: boolean;
}

const js = javascript.bind(null, { jsx: true, typescript: true });

const langExtMap: Record<string, Function> = {
  python: python,
  javascript: js,
  css: css,
};

const themeMap: Record<string, Extension> = {
  tokyonight: tokyoNight,
  vscode: vscodeDark,
  nord: nord,
  material: materialDark,
  github: githubDark,
  "tokyonight-storm": tokyoNightStorm,
};

export default function Editor({
  defaultValue,
  lang,
  theme,
  name,
  readonly = false,
}: EditorProps) {
  const [value, setValue] = React.useState(defaultValue);

  const langExt = langExtMap[lang] || js;
  const themeExt = themeMap[theme] || tokyoNight;

  const extensions = React.useMemo(() => [langExt()], [langExt]);

  return (
    <>
      <textarea hidden name={name} value={value} onChange={() => {}}></textarea>
      <CodeMirror
        theme={themeExt}
        value={value}
        onChange={(val) => setValue(val)}
        extensions={extensions}
        readOnly={readonly}
        editable={!readonly}
      />
    </>
  );
}
