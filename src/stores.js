// writable revealedCells
// writable bombsLeft

import { writable } from 'svelte/store';

export const isOver = writable(false);
export const bombsLeft = writable(10);
export const revealedCells = writable(0);
