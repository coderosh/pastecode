import { getCodeById } from "@/actions/code";

export default async function CodeRawPage({
  params,
}: {
  params: { id: string };
}) {
  const code = await getCodeById(params.id);

  return <pre>{code.code}</pre>;
}
