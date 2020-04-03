<svelte:options tag="coverified-cases"/>

<!--INFO: this file only wraps the `Cases` component and publishes it as a webcomponent named coverified-cases`-->

<script>
    import Cases from './Cases.svelte';

    export let area = 'DEU';
    export let language = 'de';

    customElements.define('coverified-cases-component', Cases);
</script>

<coverified-cases-component
    area={area}
    language={language}
></coverified-cases-component>
