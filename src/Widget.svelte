<svelte:options tag="coverified-widget"/>

<script>
    import {onMount} from 'svelte';
    import {config, data} from './stores.js';
    import {ICON_DEFS} from './global.js';
    import {dataKeyFromConfig, getElapsedTime} from './util';

    export let area = 'GER';
    export let language = 'de';
    export let postLimit = 3;
    export let open = false;
    export let debug = false;

    function toggleOpen() {
        open = !open;
    }

    onMount(async () => {
        data.load(dataKeyFromConfig(area, language));
        document.addEventListener('click', e => {
            const widgets = document.querySelectorAll('coverified-widget');

            [...widgets].forEach(widget => {
                if (!widget.contains(e.target)) {
                    open = false;
                }
            });
        });
    });
</script>

<style src="Widget.scss"></style>

{#if $data}
    <details open={open}>
        <summary on:click|preventDefault={toggleOpen}>
            <svg class="icon icon-logo">
                <use xlink:href="#icon-logo"></use>
            </svg>
            <span>
                {$data[`button_label`]}
<!--                <a href="https://www.coverified.info/"-->
<!--                   class="btn-info"-->
<!--                   target="_blank"-->
<!--                   rel="noopener"-->
<!--                   title="CoVerified">-->
<!--                    <svg class="icon icon-info">-->
<!--                        <use xlink:href="#icon-info"></use>-->
<!--                    </svg>-->
<!--                </a>-->
            </span>
            <svg class="icon icon-close">
                <use xlink:href="#icon-close"></use>
            </svg>
        </summary>
        <section>
            <table class="numbers">
                <tr>
                    <td>
                        <b>{$data[`number_active_cases`]}</b>
                    </td>
                    <td>
                        {$data[`number_active_cases_label`]}<br>
                    </td>
                </tr>
                <tr>
                    <td>
                        <b>{$data[`number_death`]}</b>
                    </td>
                    <td>
                        {$data[`number_death_label`]}
                    </td>
                </tr>
            </table>
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
        </section>
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

{@html ICON_DEFS}
