"use client";
// Made a Register Hook Modal to create a custom hook for the register modal
import { create } from "zustand";

// This is the interface for the store which has defined properties and methods
interface RegisterModalStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

// 1. We create a store (think a vault) and we pass in the interface (objects we want in the vault) like createContext or createStore
/* 2. We then pass in a parameter called set which is a function that allows us to set/manipulate the state kinda like a context provider which provides the means to maniuplate state with or without a reducer, or Redux which uses a reducer to manipulate state.
CONTEXTAPI:
createContext(<RegisterModalStore |(or) undefined>(undefined) - initial value provided since we havent passed anythin in yet))
REDUX:
name: 'register', initialState = {isOpen = false }, reducers: {open: (state) => { state.isOpen = true;}, close: (state) => { state.isOpen = false;},},
*/
/* 3. So we return the objects we want to use in the store and we can use them in any component we want to use them in. 
CONTEXTAPI:
This is like <Context.Provider value={isOpen, onOpen, onClose}> {children} </Context.Provider> or <Context.Provider value=({state,dispatch})> {children} </Context.Provider>
REDUX: 
configureStore({reducer: {register: registerReducer}})
*/

const RegisterModalHook = create<RegisterModalStore>((set) => ({
	isOpen: false, // Will Change on When Sign Up Is Clicked (in navbar/UserMenu.tsx)
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default RegisterModalHook;
