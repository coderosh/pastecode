import { Loader2 } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <Loader2 size={40} className="animate-spin" />
    </div>
  );
}
