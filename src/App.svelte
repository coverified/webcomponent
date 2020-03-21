<svelte:options tag="web-info-widget"/>

<script>
	import { config } from './stores.js';

	export let area = 'GER';
	export let language = 'de';
	export let debug = false;
</script>

<style>
</style>

<button>{name}</button>
{#if debug === true || debug === 'true'}
<h3>Settings:</h3>
<p>{area}</p>
<p>{language}</p>
<h3>Config:</h3>
<pre>
{JSON.stringify($config, null, 2)}
</pre>
{/if}
