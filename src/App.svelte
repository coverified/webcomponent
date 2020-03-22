<svelte:options tag="web-info-widget"/>

<script>
    import {onMount} from 'svelte';
    import {config, data} from './stores.js';
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
            const widgets = document.querySelectorAll('web-info-widget');

            [...widgets].forEach(widget => {
                if (!widget.contains(e.target)) {
                    open = false;
                }
            });
        });
    });
</script>

<style src="App.scss"></style>

{#if $data}
    <details open={open}>
        <summary on:click|preventDefault={toggleOpen}>
            <svg class="icon icon-logo">
                <use xlink:href="#icon-logo"></use>
            </svg>
            <span>
                {$data[`button_label`]}
                <a href="https://coverified-website.netlify.com/" target="_blank" rel="noopener" title="CoVerified">
                    <svg class="icon icon-info">
                        <use xlink:href="#icon-info"></use>
                    </svg>
                </a>
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
            {#each Array(postLimit) as _, i}
                <a href="{$data[`post_${i+1}_url`]}"
                   target="_blank"
                   rel="noopener"
                   class="article"
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
            {/each}
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

<svg aria-hidden="true" style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1"
     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <symbol id="icon-logo" viewBox="0 0 61 63">
            <style>
                .shape {
                    fill: var(--color-icon-bg)
                }

                .checkmark {
                    stroke: var(--color-icon-check)
                }
            </style>
            <g transform="translate(-12 -11)" fill="none" fill-rule="evenodd">
                <path class="shape"
                      d="M30.325 12.367a3.5 3.5 0 0 1 3.888 5.615l1.644 4.07a21.4 21.4 0 0 1 12.968-.101l1.802-4.246a3.5 3.5 0 1 1 2.763 1.172l-1.765 4.155a21.42 21.42 0 0 1 10.2 10.043l4.069-1.646a3.5 3.5 0 1 1 1.123 2.783l-4.068 1.645a21.42 21.42 0 0 1-.362 14.309l4.156 1.763a3.5 3.5 0 1 1-1.172 2.763l-4.247-1.804a21.4 21.4 0 0 1-9.398 8.936l1.645 4.07a3.5 3.5 0 1 1-2.783 1.123l-1.644-4.068a21.4 21.4 0 0 1-12.969.1l-1.802 4.247a3.5 3.5 0 1 1-2.762-1.173l1.764-4.155a21.42 21.42 0 0 1-10.2-10.042l-4.069 1.645a3.5 3.5 0 1 1-1.123-2.783l4.068-1.644a21.42 21.42 0 0 1 .362-14.31l-4.156-1.763a3.5 3.5 0 1 1 1.172-2.763l4.247 1.804a21.4 21.4 0 0 1 9.399-8.937l-1.644-4.069a3.5 3.5 0 0 1-1.106-6.74z"
                      fill="#3753FF"/>
                <path class="checkmark" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
                      d="M35 42.5L40.4964365 48 52.5981445 36"/>
            </g>
        </symbol>
        <symbol id="icon-close" viewBox="0 0 17 16">
            <g fill="none" fill-rule="evenodd" stroke="#1c1c1c" stroke-linecap="round" stroke-width="3"
               transform="matrix(.70710678 .70710678 -.70710678 .70710678 8.146491 -5.081369)">
                <path d="m9.5 0v17.823"/>
                <path d="m9.5 0v17.823" transform="matrix(0 -1 1 0 .589 18.411)"/>
            </g>
        </symbol>
        <symbol id="icon-clock" viewBox="0 0 17 16">
            <g fill="none" fill-rule="evenodd">
                <circle cx="7.5" cy="7.5" fill="#9c9c9c" r="7.5"/>
                <path d="m4 7.634h4.088l3.053-3.134" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="1.395"/>
            </g>
        </symbol>
        <symbol id="icon-external" viewBox="0 0 15 15">
            <g fill="none" fill-rule="evenodd">
                <circle fill="#9C9C9C" cx="7.5" cy="7.5" r="7.5"/>
                <g transform="translate(3.5 3.5)" fill="#FFF" stroke="#FFF">
                    <path d="M5.775 4.535v2.31a.383.383 0 0 1-.385.385H1.155a.383.383 0 0 1-.385-.385V2.61a.383.383 0 0 1 .385-.385h2.31a.385.385 0 0 0 0-.77h-2.31A1.152 1.152 0 0 0 0 2.61v4.235A1.152 1.152 0 0 0 1.155 8H5.39a1.152 1.152 0 0 0 1.155-1.155v-2.31a.385.385 0 0 0-.77 0z"
                          stroke-width=".3"/>
                    <path d="M3.578 4.976l3.639-3.639v1.404a.392.392 0 0 0 .783 0V.391a.39.39 0 0 0-.114-.276h-.001A.39.39 0 0 0 7.608 0h-2.35a.392.392 0 0 0 0 .783h1.405l-3.64 3.64a.391.391 0 1 0 .555.553z"
                          stroke-width=".4"/>
                </g>
            </g>
        </symbol>
        <symbol id="icon-info" viewBox="0 0 15 15">
            <g fill="none" fill-rule="evenodd">
                <circle fill="#1C1C1C" cx="7.5" cy="7.5" r="7.5"/>
                <path d="M7.5 7.8a.7.7 0 0 1 .694.605L8.2 8.5v3a.7.7 0 0 1-1.394.095L6.8 11.5v-3a.7.7 0 0 1 .7-.7z" fill="#FFF"
                      fill-rule="nonzero"/>
                <circle fill="#FFF" cx="7.5" cy="5.25" r="1.25"/>
            </g>
        </symbol>
    </defs>
</svg>
