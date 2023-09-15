'use client';
import {create} from "zustand";

interface RentModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const RentModalHook = create<RentModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))

export default RentModalHook;