<script>
	import {onDestroy, onMount} from 'svelte'
	let input;
	let typeOfTranasaction = '+';
	let transactions = [];

	$: disable = !input;

	async function fetchTransaction(url = '', method = 'GET') {
		const response = await fetch(url, {
			method: method,
		});
		return response.json();
	};

	onMount(() => {
		fetchTransaction('api/transaction', 'GET').then(data => transactions = data);
		console.log(transactions);	
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
		<button disabled={disable}>Post</button>	
		{JSON.stringify(transactions)}
	</p>
</div>