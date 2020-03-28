<svelte:options tag="coverified-articles"/>

<script>
    import {ICON_DEFS} from './global.js';

    export let area = 'DEU';
    export let language = 'de';
    export let postLimit = 6;
    export let debug = false;
</script>

<style src="Widget.scss"></style>

<!--TODO: implement article listing-->

{@html ICON_DEFS}
