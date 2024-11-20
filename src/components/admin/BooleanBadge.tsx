export default function BooleanBadge({ value, color }: { value: boolean | undefined, color: string[] }) {
   if (value === undefined && color.length != 2) return null;
   return <div className={`w-12 py-[2px] border-2 border-none ${value ? color[0] : color[1]} rounded-full text-center`}>
         {value ? "Yes" : "No"}
      </div>
}