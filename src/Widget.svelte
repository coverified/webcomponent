<svelte:options tag="coverified-widget"/>

<script>
    import {onMount} from 'svelte';
    import {config, cases, news} from './stores.js';
    import {ICON_DEFS} from './global.js';
    import {getElapsedTime, hostNameFromUrl, getFormattedNumberString} from './util';

    export let area = 'DEU';
    export let language = 'de';
    export let postLimit = 3;
    export let open = false;
    export let debug = false;

    function toggleOpen() {
        open = !open;
    }

    onMount(async () => {
        config.load(language);
        cases.load(area);
        news.load();
        // close widget if there was a click outside of it
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

{@html `<!--googleoff: all-->`}

{#if $config}
    <details open={open}>
        <summary on:click|preventDefault={toggleOpen}>
            <svg class="icon icon-logo">
                <use xlink:href="#icon-logo"></use>
            </svg>
            <span>
                CoVerified
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
            {#if $cases}
                <table class="numbers">
                    <tr>
                        <td>
                            <b>{getFormattedNumberString($cases.confirmed)}</b>
                        </td>
                        <td>
                            {$config.strings.casesAll}<br>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>{getFormattedNumberString($cases.deaths)}</b>
                        </td>
                        <td>
                            {$config.strings.casesDeaths}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b class="green">{getFormattedNumberString($cases.recovered)}</b>
                        </td>
                        <td>
                            {$config.strings.casesRecovered}
                        </td>
                    </tr>
                    <tr>
                        <td>
                        </td>
                        <td>
                            <small>
                                {$config.strings.statusDate}
                                {new Date().toLocaleDateString()},
                                {$config.strings.casesSource}
                            </small>
                        </td>
                    </tr>
                </table>
            {/if}
            {#if $news}
                <ul>
                    {#each $news as item, i}
                        {#if i < postLimit}
                            <li>
                                <a href="{item.link}"
                                   target="_blank"
                                   rel="noopener"
                                   class="article"
                                   aria-label="{item.title}"
                                   title="{item.title}">
                                    <article>
                                        <header>
                                            <h2>
                                                <span class="verified">
                                                    <svg class="icon icon-logo">
                                                        <use xlink:href="#icon-logo"></use>
                                                    </svg>
                                                    <span class="verified__label">
                                                        {$config.strings.verified}
                                                    </span>
                                                </span>
                                                {item.title}
                                            </h2>
                                            <small>
                                                <span class="source">
                                                    <svg class="icon icon-external">
                                                        <use xlink:href="#icon-external"></use>
                                                    </svg>
                                                    {hostNameFromUrl(item.link)}
                                                </span>
                                                <span class="timestamp">
                                                    <svg class="icon icon-clock">
                                                        <use xlink:href="#icon-clock"></use>
                                                    </svg>
                                                    {getElapsedTime(item.pubDate)}
                                                </span>
                                            </small>
                                        </header>
                                        <main>
                                            <p>{item.description}</p>
                                            <span class="btn btn-arrow">
                                                    <span class="btn-icon">
                                                        <svg class="icon icon-arrow-right">
                                                            <use xlink:href="#icon-arrow-right"></use>
                                                        </svg>
                                                    </span>
                                                {$config.strings.moreLink}
                                            </span>
                                        </main>
                                    </article>
                                </a>
                            </li>
                        {/if}
                    {/each}
                </ul>
            {/if}
        </section>
    </details>
{/if}

{#if debug === true || debug === 'true'}
    <h3>Settings:</h3>
    <p>{area}</p>
    <p>{language}</p>
    <h3>Config:</h3>
    <pre>{JSON.stringify($config, null, 2)}</pre>
    <h3>Cases:</h3>
    <pre>{JSON.stringify($cases, null, 2)}</pre>
    <h3>News:</h3>
    <pre>{JSON.stringify($news, null, 2)}</pre>
{/if}

{@html ICON_DEFS}

{@html `<!--googleon: all-->`}
