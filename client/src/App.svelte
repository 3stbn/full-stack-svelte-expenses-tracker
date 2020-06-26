<script>
	import { onDestroy, onMount} from 'svelte';

	let input = 0;
	let typeOfTranasaction = '+';
	let transactions = [];
	let loading = false;

	$: disable = !input;

	async function deleteTransaction(id) {
		const response = await fetch(`/api/transaction/${id}`,{
			method: 'DELETE',
			headers: {
      		'Content-Type': 'application/json'
    		},
		});
		const json = await response.json();
		const data = await json;
		if (data._id === id) {
			transactions = transactions.filter(t => t._id != id);
		};
	};

	async function addTransaction() {
		const transaction = {
			value: typeOfTranasaction === '+' ? input : input * -1,
		};
		const response = await fetch('/api/transaction', {
			method: 'POST',
			headers : {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(transaction),
		});
		const json = await response.json();
		const data = await json;
		transactions = [data, ... transactions];
		input = 0;
	};

	onMount( async () => {
		loading = true;
		const response = await fetch('/api/transaction');
		const data = await response.json();
		transactions = await data;
		loading = false;
	});
</script>

<div class="app container">
	<p>
		<span>
			<select bind:value={typeOfTranasaction}>
				<option value="+">+</option>
				<option value="-">-</option>
			</select>
		</span>
		<input type="number" placeholder="Amount" bind:value={input}>
		<button disabled={disable} on:click={addTransaction}>Post</button>	
	</p>
</div>
<div class="app">
	{#each transactions as transaction}
		<div>
			{transaction.value} <button on:click={() => deleteTransaction(transaction._id)}>x</button>
		</div>
	{/each}
</div>