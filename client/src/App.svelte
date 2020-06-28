<script>
	import { onDestroy, onMount} from 'svelte';
	import { 
		transactions,
		sortTransaction,
		balance,
		income, 
		expense
	} from './stores';

	import Loading from './components/Loading.svelte';
	import Transaction from './components/Transaction.svelte';
	import Summary from './components/Summary.svelte';
	
	let input;
	let typeOfTranasaction = '+';
	let loading = false;
	$: disable = !input;

	async function passQuery(query) {
		try {
			const response = await fetch(`/api/transaction?query=${query}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const json = await response.json();
			const { data } = await json;
			return data;
		}catch(err) {
			throw Error('404 Bad request');
		};
	};

	async function addTransaction() {
		const value = typeOfTranasaction === '+' ? input : input * -1;
		const query = encodeURIComponent(`
			mutation {
				createTransaction(value: ${value}, date: ${Date.now()}) {
					_id
					date
					value
				}
			}
		`);
		const data = await passQuery(query);
		$transactions = [data.createTransaction, ... $transactions];
		input = null;
	};

	async function deleteTransaction(id) {
		const query = encodeURIComponent(`
			mutation {
				deleteTransaction(_id: "${id}") {
					_id
					value
					date
				}
			}
		`);
		const data = await passQuery(query);
		const { _id } = data.deleteTransaction;
		if (_id === id) {
			$transactions = $transactions.filter(t => t._id != id);
		};
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
		const data = await passQuery(query);
		$transactions = data.transactions;
		loading = false;
		console.log($income, $expense, $sortTransaction, $balance);
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

{#if loading}
	<Loading />
{/if}

{#if $transactions.length > 0}
	<Summary value={$balance}/>
	<Summary mode="income" value={$income} />
	<Summary mode="expense" value={$expense}/>
	{:else if !loading}
	<div class="">Add your first transaction</div>
{/if}

<div class="app">
	{#each $sortTransaction as transaction (transaction._id)}
		<Transaction {transaction} {deleteTransaction} />
	{/each}
</div>