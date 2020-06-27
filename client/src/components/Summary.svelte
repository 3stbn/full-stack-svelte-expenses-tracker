<script>
    export let value = 0;
    export let mode = 'balance';
    $: label = mode.toUpperCase();
    $: cssClass = getClass(mode);

    function getClass(mode) {
        switch(mode) {
            case 'income':
                return 'is-income';
            case 'expense':
                return 'is-expense';
            default:
                return 'is-info';
        }
    }
</script>

<div class="{cssClass}">
	<div>{label}: <strong>{value}</strong></div>
</div>