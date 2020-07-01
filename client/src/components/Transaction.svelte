<script>
    import { slide } from 'svelte/transition';
    export let transaction;
    export let deleteTransaction;

</script>

<div class="slide" transaction:slide={{duration: 500}}>
	{transaction.value}
    <span class="date">{new Date(transaction.date).toLocaleString()}</span>
	<button 
	on:click={() => deleteTransaction(transaction._id)}>x</button>
</div>