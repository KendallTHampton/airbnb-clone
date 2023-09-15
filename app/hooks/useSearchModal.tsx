"use client";
// Made a Register Hook Modal to create a custom hook for the register modal
import {create} from "zustand";

// This is the interface for the store which has defined properties and methods
interface SearchModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}



const SearchModalHook = create<SearchModalStore>((set) => ({
    isOpen: false, // Will Change on When Sign Up Is Clicked (in navbar/UserMenu.tsx)
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));

export default SearchModalHook;
