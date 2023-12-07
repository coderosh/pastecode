import Link from "next/link";
import { Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteCode } from "@/actions/code";

interface CodeListItemProps {
  title: string;
  id: string;
  showControls: boolean;
}

export default function CodeListItem({
  title,
  id,
  showControls,
}: CodeListItemProps) {
  const deleteCodeAction = deleteCode.bind(null, id);

  return (
    <li className="my-5 flex items-center justify-between border rounded-lg">
      <Link href={`/codes/${id}`} className="pl-5 py-4 flex-1">
        <div>{title}</div>
      </Link>

      <div className="pr-5 flex gap-4">
        {showControls && (
          <>
            <Button size="sm" variant="secondary" asChild>
              <Link href={`/codes/${id}/edit`}>
                <Edit2 size={16} />
              </Link>
            </Button>
            <form action={deleteCodeAction}>
              <Button size="sm" variant="destructive">
                <Trash2 size={16} />
              </Button>
            </form>
          </>
        )}
      </div>
    </li>
  );
}
