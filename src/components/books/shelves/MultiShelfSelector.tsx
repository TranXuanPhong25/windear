import * as React from "react";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Button} from "@/components/ui/button";
import {Check, Plus, X, Edit2, Trash2} from 'lucide-react';
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
import {Input} from "@/components/ui/input";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {useToast} from "@/hooks/use-toast";
import {useCreateShelf} from "@/hooks/shelves/useCreateShelf";
import {useGetMyShelvesName} from "@/hooks/shelves/useGetMyShelvesName";
import {useDeleteShelf} from "@/hooks/shelves/useDeleteShelf";
import {useCallback, useEffect, useRef} from "react";
import {useChangeShelfName} from "@/hooks/shelves/useChangeShelfName"
import {useDeleteBookInShelves} from "@/hooks/shelves/useDeleteBookInShelves"
import {BookInShelfPayload} from '@/models/AddBookToShelfPayload';
import {useAddBookInShelves} from "@/hooks/shelves/useAddBookInShelves";
import {clsx} from "clsx";
// import {useQueryClient} from "@tanstack/react-query";
// import {useAuth0} from "@auth0/auth0-react";

const MAX_SHELF_NAME_LENGTH = 30;

export default function MultiShelfSelector({book, onSaveCompleted, alreadyInShelves}: {
    book: BookInShelfPayload,
    onSaveCompleted: () => void,
    alreadyInShelves: string[]
}) {
    // const {user} = useAuth0();
    // const queryClient = useQueryClient();
    const {toast} = useToast();
    const {mutate: createShelf} = useCreateShelf();
    const {data: myShelves, isLoading: isGettingMyShelves} = useGetMyShelvesName();
    const {mutate: callDeleteShelf} = useDeleteShelf();
    const {mutate: changeShelfName} = useChangeShelfName();
    const {mutate: deleteBookInShelves} = useDeleteBookInShelves();
    const {mutate: addBookInShelves} = useAddBookInShelves();
    const [selectedShelves, setSelectedShelves] = React.useState<string[]>(alreadyInShelves);
    const [newShelfName, setNewShelfName] = React.useState("");
    const [editingShelf, setEditingShelf] = React.useState<string | null>(null);
    const shelfInput = useRef<HTMLInputElement | null>(null);

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
        if (myShelves.includes(newShelfName)) {
            toast({
                title: "Error",
                description: "Shelf name already exists.",
                variant: "destructive",
                className: "mb-4",
            });
            return;
        }
        if (validateShelfName(newShelfName)) {
            createShelf(newShelfName, {
                onSuccess: () => {
                    setNewShelfName("");
                },
            });
        }
    }, [createShelf, myShelves, newShelfName, toast, validateShelfName]);

    const startEditing = (shelf: string) => {
        if (shelfInput.current) {
            shelfInput.current.focus();
        }
        setEditingShelf(shelf);
        setNewShelfName(shelf);
    };

    const updateShelf = useCallback(() => {
        if (myShelves.includes(newShelfName)) {
            toast({
                title: "Error",
                description: "Shelf name already exists.",
                variant: "destructive",
                className: "mb-4",
            });
            return;
        }
        if (editingShelf && validateShelfName(newShelfName)) {
            changeShelfName({
                shelfName: editingShelf,
                newShelfName: newShelfName
            });
            setEditingShelf(null);
            setNewShelfName("");
        }
    }, [changeShelfName, editingShelf, myShelves, newShelfName, toast, validateShelfName]);

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

    const handleSaveChanges = () => {
        const shelvesNeedToBeAdded = selectedShelves.filter((shelf) => !alreadyInShelves.includes(shelf));
        const shelvesNeedToBeRemoved = alreadyInShelves.filter((shelf) => !selectedShelves.includes(shelf));
        addBookInShelves(
            {
                shelfNames: shelvesNeedToBeAdded,
                book: book
            },
            {
                onSuccess: () => {
                    deleteBookInShelves(
                        {
                            shelfNames: shelvesNeedToBeRemoved,
                            bookId: book.id
                        },
                        {
                            onSuccess: () => {
                                onSaveCompleted();
                                toast({
                                    title: "Success",
                                    description: "Update your shelves successfully",
                                    className: "mb-4 bg-green-500 text-white"
                                })
                                // queryClient.invalidateQueries({
                                //     queryKey: ['shelves', user?.sub, "book", book.id]
                                // })
                            },
                            onError: (error) => {
                                toast({
                                    title: "Error remove book from shelves",
                                    description: error.message,
                                    variant: "destructive",
                                    className: "mb-4",
                                });
                            }
                        }
                    );
                },
                onError: (error) => {
                    toast({
                        title: "Error update your shelves",
                        description: error.message,
                        variant: "destructive",
                        className: "mb-4",
                    });
                }
            }
        )

    }
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
                        className="flex-grow dark:text-white dark:border-white/40 dark:bg-gray-800/30"
                        maxLength={MAX_SHELF_NAME_LENGTH}
                    />
                    {editingShelf ? (
                        <>
                            <Button onClick={updateShelf} className="!bg-green-500 dark:text-white">
                                <Check className="h-4 w-4"/>
                            </Button>
                            <Button variant="outline" onClick={cancelEditing} className="dark:text-white">
                                <X className="h-4 w-4"/>
                            </Button>
                        </>
                    ) : (
                        <Button onClick={addNewShelf} >
                            <Plus className="h-4 w-4 "/>
                        </Button>
                    )}
                </div>
                {!isGettingMyShelves && myShelves.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No shelves available. Add a new shelf above.</p>
                    </div>
                ) : (
                    <>
                        <ScrollArea className="h-[230px] w-full rounded-md border dark:border-white/50 p-4">
                            <div className="flex flex-col space-y-2">
                                {myShelves && myShelves.map((shelf: string) => (
                                    <div key={shelf} className="flex items-center space-x-2">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => toggleShelf(shelf)}
                                                    className={clsx(
                                                        "justify-between text-left h-10 px-4 py-2 w-full transition-colors duration-200 max-w-[180px] dark:text-white dark:bg-gray-600",
                                                        (selectedShelves.includes(shelf)) && "bg-slate-100 dark:bg-gray-800/60 text-primary-foreground hover:bg-primary/90"
                                                    )}
                                                >
                                                    <span className="truncate">{truncateName(shelf, 20)}</span>
                                                    {selectedShelves.includes(shelf) && (
                                                        <Check className="h-4 w-4 ml-2 flex-shrink-0"/>
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
                                            className="flex-shrink-0  dark:hover:bg-gray-600  dark:text-white dark:hover:text-white"
                                        >
                                            <Edit2 className="h-4 w-4"/>
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="flex-shrink-0 hover:bg-red-100 dark:hover:bg-red-400 dark:text-red-500 dark:hover:text-white"
                                                >
                                                    <Trash2 className="h-4 w-4 "/>
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
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Selected shelves: {selectedShelves.length}
                            </p>
                            {selectedShelves.length > 0 && (
                                <Button variant="outline" size="sm" onClick={deselectAll} className="dark:text-white">
                                    <X className="h-4 w-4 mr-2"/>
                                    Deselect All
                                </Button>
                            )}
                        </div>
                        <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                            {selectedShelves.map((shelf) => (
                                <Tooltip key={shelf}>
                                    <TooltipTrigger asChild>
                                        <span className="mr-2 !bg-blue-500 !text-white  px-3 py-1 rounded-full">{truncateName(shelf, 20)}</span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{shelf}</p>
                                    </TooltipContent>
                                </Tooltip>
                            ))}
                        </div>
                        <div className="mt-4">
                            <Button
                                onClick={handleSaveChanges}
                                className="w-full bg-green-500 hover:bg-green-400 !text-white dark:bg-green-500 dark:hover:bg-green-500/90"
                            >
                                Save changes
                            </Button>
                        </div>

                    </>
                )}
            </div>
        </TooltipProvider>
    );
}