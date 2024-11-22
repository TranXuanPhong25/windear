"use client"

import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Check, Plus, X, Edit2, Trash2 } from 'lucide-react'
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Input } from "@/components/ui/input"
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"

interface Shelf {
   id: string
   name: string
}

const MAX_SHELF_NAME_LENGTH = 30

export default function MultiShelfSelector() {
   const [shelves, setShelves] = React.useState<Shelf[]>([
      { id: "1", name: "To Read" },
      { id: "2", name: "Currently Reading" },
      { id: "3", name: "Read" },
      { id: "4", name: "Favorites" },
      { id: "5", name: "Classics" },
      { id: "6", name: "This is a very long shelf name that needs to be truncated" },
   ])
   const [selectedShelves, setSelectedShelves] = React.useState<string[]>([])
   const [newShelfName, setNewShelfName] = React.useState("")
   const [editingShelf, setEditingShelf] = React.useState<Shelf | null>(null)
   const { toast } = useToast()

   const toggleShelf = (shelfId: string) => {
      setSelectedShelves((prevSelected) =>
         prevSelected.includes(shelfId)
            ? prevSelected.filter((id) => id !== shelfId)
            : [...prevSelected, shelfId]
      )
   }

   const deselectAll = () => {
      setSelectedShelves([])
   }

   const validateShelfName = (name: string): boolean => {
      if (name.trim().length === 0) {
         toast({
            title: "Error",
            description: "Shelf name cannot be empty.",
            variant: "destructive",
            className: "mb-4",
         })
         return false
      }
      if (name.length > MAX_SHELF_NAME_LENGTH) {
         toast({
            title: "Error",
            description: `Shelf name must be ${MAX_SHELF_NAME_LENGTH} characters or less.`,
            variant: "destructive",
         })
         return false
      }
      return true
   }

   const addNewShelf = () => {
      if (validateShelfName(newShelfName)) {
         const newShelf: Shelf = {
            id: Date.now().toString(),
            name: newShelfName.trim()
         }
         setShelves([...shelves, newShelf])
         setNewShelfName("")
         toast({
            title: "Success",
            className: "mb-4 !bg-green-500 !text-white",
            description: "New shelf added successfully.",
         })
      }
   }

   const startEditing = (shelf: Shelf) => {
      setEditingShelf(shelf)
      setNewShelfName(shelf.name)
   }

   const updateShelf = () => {
      if (editingShelf && validateShelfName(newShelfName)) {
         setShelves(shelves.map(shelf =>
            shelf.id === editingShelf.id ? { ...shelf, name: newShelfName.trim() } : shelf
         ))
         setEditingShelf(null)
         setNewShelfName("")
         toast({
            title: "Success",
            className: "mb-4 bg-green-500",
            description: "Shelf name updated successfully.",
         })
      }
   }

   const cancelEditing = () => {
      setEditingShelf(null)
      setNewShelfName("")
   }

   const deleteShelf = (shelfId: string) => {
      setShelves(shelves.filter(shelf => shelf.id !== shelfId))
      setSelectedShelves(selectedShelves.filter(id => id !== shelfId))
      toast({
         title: "Success",
         description: "Shelf deleted successfully.",
      })
   }

   const truncateName = (name: string, maxLength: number) => {
      return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name
   }

   return (
      <TooltipProvider>
         <div className="max-w-[310px] ">
            <div className="mb-4 flex items-center space-x-2">
               <Input
                  type="text"
                  placeholder={editingShelf ? "Edit shelf name" : "New shelf name"}
                  value={newShelfName}
                  onChange={(e) => setNewShelfName(e.target.value)}
                  className="flex-grow"
                  maxLength={MAX_SHELF_NAME_LENGTH}
               />
               {editingShelf ? (
                  <>
                     <Button onClick={updateShelf} className="!bg-green-500">
                        <Check className="h-4 w-4" />
                     </Button>
                     <Button variant="outline" onClick={cancelEditing}>
                        <X className="h-4 w-4" />
                     </Button>
                  </>
               ) : (
                  <Button onClick={addNewShelf}>
                     <Plus className="h-4 w-4 " />
                  </Button>
               )}
            </div>
            {shelves.length === 0 ? (
               <div className="text-center py-8">
                  <p className="text-gray-500">No shelves available. Add a new shelf above.</p>
               </div>
            ) : (
               <>
                  <ScrollArea className="h-[230px] w-full rounded-md border p-4">
                     <div className="flex flex-col space-y-2">
                        {shelves.map((shelf) => (
                           <div key={shelf.id} className="flex items-center space-x-2">
                              <Tooltip>
                                 <TooltipTrigger asChild>
                                    <Button
                                       variant="outline"
                                       onClick={() => toggleShelf(shelf.id)}
                                       className={`justify-between text-left h-10 px-4 py-2 w-full transition-colors duration-200 max-w-[230px] ${selectedShelves.includes(shelf.id)
                                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                          : ""
                                          }`}
                                    >
                                       <span className="truncate">{truncateName(shelf.name, 20)}</span>
                                       {selectedShelves.includes(shelf.id) && (
                                          <Check className="h-4 w-4 ml-2 flex-shrink-0" />
                                       )}
                                    </Button>
                                 </TooltipTrigger>
                                 <TooltipContent>
                                    <p>{shelf.name}</p>
                                 </TooltipContent>
                              </Tooltip>
                              <Button
                                 variant="ghost"
                                 size="icon"
                                 onClick={() => startEditing(shelf)}
                                 className="flex-shrink-0"
                              >
                                 <Edit2 className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                 <AlertDialogTrigger asChild>
                                    <Button
                                       variant="ghost"
                                       size="icon"
                                       className="flex-shrink-0"
                                    >
                                       <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                 </AlertDialogTrigger>
                                 <AlertDialogContent>
                                    <AlertDialogHeader>
                                       <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                       <AlertDialogDescription>
                                          This action cannot be undone. This will permanently delete the
                                          "{shelf.name}" shelf and remove it from our servers.
                                       </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                       <AlertDialogCancel>Cancel</AlertDialogCancel>
                                       <AlertDialogAction onClick={() => deleteShelf(shelf.id)}>
                                          Delete
                                       </AlertDialogAction>
                                    </AlertDialogFooter>
                                 </AlertDialogContent>
                              </AlertDialog>
                           </div>
                        ))}
                     </div>
                  </ScrollArea>
                  <div className="mt-4 flex justify-between items-center">
                     <p className="text-sm text-gray-600">
                        Selected shelves: {selectedShelves.length}
                     </p>
                     {selectedShelves.length > 0 && (
                        <Button variant="outline" size="sm" onClick={deselectAll}>
                           <X className="h-4 w-4 mr-2" />
                           Deselect All
                        </Button>
                     )}
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                     {selectedShelves.map((id) => (
                        <Tooltip key={id}>
                           <TooltipTrigger asChild>
                              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 truncate max-w-[150px]">
                                 {truncateName(shelves.find(s => s.id === id)?.name || "", 15)}
                              </span>
                           </TooltipTrigger>
                           <TooltipContent>
                              <p>{shelves.find(s => s.id === id)?.name}</p>
                           </TooltipContent>
                        </Tooltip>
                     ))}
                  </div>

               </>
            )}
         </div>
      </TooltipProvider>
   )
}

