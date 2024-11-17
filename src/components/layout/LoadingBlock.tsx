import clsx from "clsx";
import { RefreshCcw } from "lucide-react";

export default function LoadingBlock({ className }: { className?: string }) {
  return (
    <div className={clsx(className,"dark:bg-gray-800")}>
      <div className="w-full h-full flex justify-center items-center">
        <RefreshCcw className="animate-spin size-24 text-gray-500 dark:text-gray-400" />
      </div>
    </div>
  );
}