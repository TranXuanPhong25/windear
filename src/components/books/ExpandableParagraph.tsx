import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Markup } from 'interweave';
import { parseLinks } from '@/lib/parseLink';

interface ExpandableParagraphProps {
   text: string;
   maxLength?: number
}


export default function ExpandableParagraph({
   text,
   maxLength = 450
}: ExpandableParagraphProps) {
   const [isExpanded, setIsExpanded] = useState(false)

   const toggleExpand = () => setIsExpanded(!isExpanded)

   const shouldTruncate = text.length > maxLength
   const displayText = isExpanded || !shouldTruncate ? text : `${text.slice(0, maxLength)}...`
   return (
      <div className="py-3 text-gray-900 dark:text-gray-200 rounded-md text-justify text-md max-w-[800px] opacity-85 ">
         
            <Markup content={parseLinks(displayText)} />

            {shouldTruncate && (
               <Button
                  variant="link"
                  size="sm"
                  className="dark:text-purple-400 dark:hover:text-purple-500 p-0 ml-3 text-md h-auto"
                  onClick={toggleExpand}
               >
                  {isExpanded ? 'Hide' : 'Show more'}
               </Button>

            )}
            
         
      </div>
   )
}