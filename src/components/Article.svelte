<svelte:options tag={null}/>

<script>
    import {getElapsedTime, hostNameFromUrl} from '../util';
    import {ICON_DEFS} from '../global.js';

    export let title = false;
    export let content = false;
    export let url = false;
    export let timestamp = false;
    export let more = false;
    export let verified = false;
</script>

<style src="Article.scss"></style>

{#if title && content && url && timestamp && more && verified}
    <a href="{url}"
       target="_blank"
       rel="noopener"
       class="article"
       aria-label="{title}"
       title="{title}">
        <article>
            <header>
                <h2>
                    <span class="verified">
                        <svg class="icon icon-logo">
                            <use xlink:href="#icon-logo"></use>
                        </svg>
                        <span class="verified__label">
                            {verified}
                        </span>
                    </span>
                    {title}
                </h2>
                <small>
                    <span class="source">
                        <svg class="icon icon-external">
                            <use xlink:href="#icon-external"></use>
                        </svg>
                        {hostNameFromUrl(url)}
                    </span>
                    <span class="timestamp">
                        <svg class="icon icon-clock">
                            <use xlink:href="#icon-clock"></use>
                        </svg>
                        {getElapsedTime(timestamp)}
                    </span>
                </small>
            </header>
            <main>
                <p>{content}</p>
                <span class="btn btn-arrow">
                    <span class="btn-icon">
                        <svg class="icon icon-arrow-right">
                            <use xlink:href="#icon-arrow-right"></use>
                        </svg>
                    </span>
                    {more}
                </span>
            </main>
        </article>
    </a>
{/if}

{@html ICON_DEFS}
