// authStore.js
import { writable } from "svelte/store";

// for saving names
export const currentPageNumber = writable(0);
export const randomNumber = writable("");