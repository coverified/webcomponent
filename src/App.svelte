<svelte:options tag="web-info-widget"/>

<script>
    import {onMount} from 'svelte';
    import {config, data} from './stores.js';
    import {dataKeyFromConfig} from './util';

    export let area = 'GER';
    export let language = 'de';
    export let postLimit = 3;
    export let debug = false;

    onMount(async () => {
        data.load(dataKeyFromConfig(area, language));
    });
</script>

<style>
</style>

{#if $data}
    <details>
        <summary>{$data[`button_label`]}</summary>
        {#each Array(postLimit) as _, i}
            <h2>{$data[`post_${i+1}_headline`]}</h2>
            <p>{$data[`post_${i+1}_text`]}</p>
            <a href="{$data[`post_${i+1}_url`]}"
               title="{$data[`post_${i+1}_headline`]}">
                {$data[`link_label`]}
            </a>
        {/each}
    </details>
{/if}
{#if debug === true || debug === 'true'}
    <h3>Settings:</h3>
    <p>{area}</p>
    <p>{language}</p>
    <h3>Config:</h3>
    <pre>{JSON.stringify($config, null, 2)}</pre>
    <h3>Data:</h3>
    <pre>{JSON.stringify($data, null, 2)}</pre>
{/if}
