<script>
	import { onDestroy, onMount} from 'svelte';

	let input = 0;
	let typeOfTranasaction = '+';
	let transactions = [];
	let loading = false;

	$: disable = !input;

	async function deleteTransaction(id) {
		const query =`
			mutation DeleteTransaction($_id: ID!) {
				deleteTransaction(_id: $_id) {
					_id
					value
					date
				}
			}
		`;
		const response = await fetch(`/api/transaction`,{
			method: 'POST',
			headers: {
      		'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				query,
				variables: {
					_id: id,
				},
			}),
		});
		const json = await response.json();
		const { data } = await json;
		const { _id } = data.deleteTransaction;
		if (_id === id) {
			transactions = transactions.filter(t => t._id != id);
		};
	};

	async function addTransaction() {
		const value = typeOfTranasaction === '+' ? input : input * -1;
		const query =`
			mutation CreateTransaction($value: Int!) {
				createTransaction(value: $value) {
					_id
					value
					date
				}
			}
		`;
		const response = await fetch('/api/transaction', {
			method: 'POST',
			headers : {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query,
				variables: {
					value: value,
				},
			}),
		});
		const json = await response.json();
		const { data } = await json;
		transactions = [data.createTransaction, ... transactions];
		input = 0;
	};

	onMount( async () => {
		loading = true;
		const query = encodeURIComponent(`
		query {
			transactions {
				_id
				value
				date
			}
		}`);
		const response = await fetch(`/api/transaction?query=${query}`);
		const json = await response.json();
		const { data } = await json;
		transactions = data.transactions;
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