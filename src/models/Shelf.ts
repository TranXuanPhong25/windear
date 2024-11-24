import {BookInShelfPayload} from "@/models/AddBookToShelfPayload.ts";

export interface Shelf{
    name: string;
    books:BookInShelfPayload[];
}