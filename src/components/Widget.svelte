<svelte:options tag="coverified-widget"/>

<script>
    import {onMount} from 'svelte';
    import Article from './Article.svelte';
    import Cases from './Cases.svelte';
    import {config, news} from '../stores.js';
    import {ICON_DEFS} from '../global.js';
    import {ensureCustomElement} from '../util';

    export let area = 'DEU';
    export let language = 'de';
    export let postLimit = 3;
    export let open = false;
    let loaded = false;

    function toggleOpen() {
        open = !open;
    }

    ensureCustomElement('coverified-widget-article', Article);
    ensureCustomElement('coverified-widget-cases', Cases);

    onMount(async () => {
        config.load(language);
        news.load(postLimit);

        // close widget if there was a click outside of it
        document.addEventListener('click', e => {
            const widgets = document.querySelectorAll('coverified-widget');

            [...widgets].forEach(widget => {
                if (!widget.contains(e.target)) {
                    open = false;
                }
            });
        });

        setTimeout(() => loaded = true, 42);
    });
</script>

<style src="Widget.scss"></style>

{@html `<!--googleoff: all-->`}


<details open={open}>
    <summary on:click|preventDefault={toggleOpen} class={loaded ? `loaded` : ``}>
        <svg class="icon icon-logo">
            <use xlink:href="#icon-logo"></use>
        </svg>
        <span>
            CoVerified
        </span>
        <svg class="icon icon-close">
            <use xlink:href="#icon-close"></use>
        </svg>
    </summary>
    <section>
        <coverified-widget-cases
                area={area}
                language={language}
        ></coverified-widget-cases>
        {#if $news && $config}
            <ul>
                {#each $news as item, i}
                    {#if i < postLimit}
                        <li>
                            <coverified-widget-article
                                    title={item.title}
                                    url={item.url}
                                    content={item.content}
                                    timestamp={item.timestamp}
                                    more={$config.strings.moreLink}
                                    verified={$config.strings.verified}
                            ></coverified-widget-article>
                        </li>
                    {/if}
                {/each}
            </ul>
        {/if}

    </section>
</details>

{@html ICON_DEFS}

{@html `<!--googleon: all-->`}
