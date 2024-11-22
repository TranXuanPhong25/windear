import { cn } from "@/lib/utils";

interface AvatarCirclesProps {
  className?: string;
  numPeople?: string;
  avatarUrls: string[];
}

const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)}>
      {avatarUrls.map((url, index) => (
        <img
          key={index}
          className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800"
          src={url}
          width={40}
          height={40}
          alt={`Avatar ${index + 1}`}
        />
      ))}
      <span
        className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-slate-200 text-center text-xs font-medium text-black hover:text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black"
      >
        +{numPeople}
      </span>
    </div>
  );
};

export default AvatarCircles;
