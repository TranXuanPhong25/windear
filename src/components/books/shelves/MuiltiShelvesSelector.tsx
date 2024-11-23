import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Check, Plus, X, Edit2, Trash2 } from 'lucide-react';
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
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { useCreateShelf } from "@/hooks/shelves/useCreateShelf";
import { useGetMyShelves } from "@/hooks/shelves/useGetMyShelves";
import { useDeleteShelf } from "@/hooks/shelves/useDeleteShelf";
import { useCallback, useEffect, useRef } from "react";
import { useChangeShelfName} from "@/hooks/shelves/useChangeShelfName"
const MAX_SHELF_NAME_LENGTH = 30;

export default function MultiShelfSelector() {
  const { mutate: createShelf } = useCreateShelf();
  const { data: myShelves = [], isLoading: isGettingMyShelves } = useGetMyShelves();
  const { mutate: callDeleteShelf } = useDeleteShelf();
  const { mutate:changeShelfName }= useChangeShelfName();
  const [selectedShelves, setSelectedShelves] = React.useState<string[]>([]);
  const [newShelfName, setNewShelfName] = React.useState("");
  const [editingShelf, setEditingShelf] = React.useState<string | null>(null);
  const shelfInput = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  const toggleShelf = (shelfId: string) => {
    setSelectedShelves((prevSelected) =>
      prevSelected.includes(shelfId)
        ? prevSelected.filter((id) => id !== shelfId)
        : [...prevSelected, shelfId]
    );
  };

  const deselectAll = () => {
    setSelectedShelves([]);
  };

  const validateShelfName = useCallback((name: string): boolean => {
    if (name.trim().length === 0) {
      toast({
        title: "Error",
        description: "Shelf name cannot be empty.",
        variant: "destructive",
        className: "mb-4",
      });
      return false;
    }
    if (name.length > MAX_SHELF_NAME_LENGTH) {
      toast({
        title: "Error",
        description: `Shelf name must be ${MAX_SHELF_NAME_LENGTH} characters or less.`,
        variant: "destructive",
      });
      return false;
    }
    return true;
  }, [toast]);

  const addNewShelf = useCallback(() => {
    if (validateShelfName(newShelfName)) {
      createShelf(newShelfName, {
        onSuccess: () => {
          setNewShelfName("");
        },
      });
    }
  }, [createShelf, newShelfName, validateShelfName]);

  const startEditing = (shelf: string) => {
    shelfInput.current.focus();
    setEditingShelf(shelf);
    setNewShelfName(shelf);
  };

  const updateShelf = useCallback(() => {
    if (editingShelf && validateShelfName(newShelfName)) {
      // Update shelf logic here
      changeShelfName({
        shelfName:editingShelf,
        newShelfName:newShelfName
      });
      setEditingShelf(null);
      setNewShelfName("");
      
    }
  }, [changeShelfName, editingShelf, newShelfName, validateShelfName]);

  const cancelEditing = () => {
    setEditingShelf(null);
    setNewShelfName("");
  };

  const deleteShelf = (shelfName: string) => {
    callDeleteShelf(shelfName, {
      onSuccess: () => {
        setSelectedShelves(selectedShelves.filter((id) => id !== shelfName));
      },
    });
  };

  const truncateName = (name: string, maxLength: number) => {
    return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;
  };

  useEffect(() => {
    const shelfInputRef = shelfInput.current;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        cancelEditing();
      } else if (e.key === "Enter") {
        if (editingShelf) {
          updateShelf();
        } else {
          addNewShelf();
        }
      }
    };
    shelfInputRef?.addEventListener("keydown", handleKeyDown);
    return () => {
      shelfInputRef?.removeEventListener("keydown", handleKeyDown);
    };
  }, [addNewShelf, editingShelf, updateShelf]);

  return (
    <TooltipProvider>
      <div className="max-w-[310px] ">
        <div className="mb-4 flex items-center space-x-2">
          <Input
            ref={shelfInput}
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
        {!isGettingMyShelves && myShelves.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No shelves available. Add a new shelf above.</p>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[230px] w-full rounded-md border p-4">
              <div className="flex flex-col space-y-2">
                {myShelves.map((shelf) => (
                  <div key={shelf} className="flex items-center space-x-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={() => toggleShelf(shelf)}
                          className={`justify-between text-left h-10 px-4 py-2 w-full transition-colors duration-200 max-w-[180px] ${selectedShelves.includes(shelf)
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : ""
                            }`}
                        >
                          <span className="truncate">{truncateName(shelf, 20)}</span>
                          {selectedShelves.includes(shelf) && (
                            <Check className="h-4 w-4 ml-2 flex-shrink-0" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{shelf}</p>
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
                          className="flex-shrink-0 hover:bg-red-100"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the
                            "{shelf}" shelf and remove it from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteShelf(shelf)}>
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
              {selectedShelves.map((shelf) => (
                <Tooltip key={shelf}>
                  <TooltipTrigger asChild>
                    <span className="mr-2">{truncateName(shelf, 20)}</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{shelf}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </>
        )}
      </div>
    </TooltipProvider>
  );
}