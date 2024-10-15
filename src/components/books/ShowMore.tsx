import { useState } from 'react'
import { Button } from "@/components/ui/button"

interface ExpandableParagraphProps {
   text: string
   maxLength?: number
}

export default function ExpandableParagraph({
   text = '',
   maxLength = 300
}: ExpandableParagraphProps) {
   const [isExpanded, setIsExpanded] = useState(false)

   const toggleExpand = () => {
      setIsExpanded(!isExpanded)
   }

   const shouldTruncate = text.length > maxLength
   const displayText = isExpanded || !shouldTruncate ? text : `${text.slice(0, maxLength)}...`

   return (
      <div className=" py-3 text-white rounded-md text-justify text-md max-w-[800px]">
         <p className={`${isExpanded ? '' : 'line-clamp-4'}`} >
            {displayText}
            {shouldTruncate && (
               <Button
                  variant="link"
                  size="sm"
                  className="text-purple-400 hover:text-purple-300 p-0 ml-3 text-md h-auto"
                  onClick={toggleExpand}
               >
                  {isExpanded ? 'Hide' : 'Show more'}
               </Button>
            )}
         </p>

      </div>
   )
}