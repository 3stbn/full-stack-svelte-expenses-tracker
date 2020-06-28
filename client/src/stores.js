import { writable, derived } from 'svelte/store';

export const transactions = writable([]);
export const sortTransaction = derived(transactions, (value) =>
	value.sort((a, b) => b.date - a.date)
);
export const balance = derived(transactions, (value) =>
	value.reduce((acc, t) => acc + t.value, 0)
);
export const income = derived(transactions, (value) =>
	value.filter((t) => t.value > 0).reduce((acc, t) => acc + t.value, 0)
);
export const expense = derived(transactions, (value) =>
	value.filter((t) => t.value < 0).reduce((acc, t) => acc + t.value, 0)
);
