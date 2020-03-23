<svelte:options tag="coverified-articles"/>

<script>
    import {onMount} from 'svelte';
    import {config, data} from './stores.js';
    import {ICON_DEFS} from './global.js';
    import {dataKeyFromConfig, getElapsedTime} from './util';

    export let area = 'GER';
    export let language = 'de';
    export let postLimit = 6;
    export let open = false;
    export let debug = false;

    onMount(async () => {
        data.load(dataKeyFromConfig(area, language));
    });
</script>

<style src="Widget.scss"></style>

{#if $data}
    <ul>
        {#each Array(postLimit) as _, i}
            <li>
                <a href="{$data[`post_${i+1}_url`]}"
                   target="_blank"
                   rel="noopener"
                   class="article"
                   aria-label="{$data[`post_${i+1}_headline`]}"
                   title="{$data[`post_${i+1}_headline`]}">
                    <article>
                        <header>
                            <h2>
                                <span class="verified">
                                    <svg class="icon icon-logo">
                                        <use xlink:href="#icon-logo"></use>
                                    </svg>
                                    <span class="verified__label">
                                        {$data[`verified_label`]}
                                    </span>
                                </span>
                                {$data[`post_${i+1}_headline`]}
                            </h2>
                            <small>
                                <span class="source">
                                    <svg class="icon icon-external">
                                        <use xlink:href="#icon-external"></use>
                                    </svg>
                                    {$data[`post_${i+1}_source`]}
                                </span>
                                <span class="timestamp">
                                    <svg class="icon icon-clock">
                                        <use xlink:href="#icon-clock"></use>
                                    </svg>
                                    {getElapsedTime($data[`post_${i+1}_timestamp`])}
                                </span>
                            </small>
                        </header>
                        <main>
                            <p>{$data[`post_${i+1}_text`]}</p>
                        </main>
                    </article>
                </a>
            </li>
        {/each}
    </ul>
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

{@html ICON_DEFS}
