<svelte:options tag={null}/>

<script>
    import {onMount} from 'svelte';
    import {config, cases} from '../stores.js';
    import {getFormattedNumberString} from '../util';

    export let area = 'DEU';
    export let language = 'de';

    onMount(async () => {
        config.load(language);
        cases.load(area);
    });
</script>

<style src="Cases.scss"></style>

{#if $cases && $config}
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
