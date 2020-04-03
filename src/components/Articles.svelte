<svelte:options tag="coverified-articles"/>

<script>
    import {onMount} from 'svelte';
    import Article from './Article.svelte';
    import {config, news} from '../stores.js';
    import {ensureCustomElement} from '../util';

    export let language = 'de';
    export let postLimit = 3;

    ensureCustomElement('coverified-articles-article', Article);

    onMount(async () => {
        config.load(language);
        news.load();
    });
</script>

<style src="Articles.scss"></style>

{#if $news && $config}
    <ul>
        {#each $news as item, i}
            {#if i < postLimit}
                <li>
                    <coverified-articles-article
                            title={item.title}
                            url={item.link}
                            content={item.description}
                            timestamp={item.pubDate}
                            more={$config.strings.moreLink}
                            verified={$config.strings.verified}
                    ></coverified-articles-article>
                </li>
            {/if}
        {/each}
    </ul>
{/if}
