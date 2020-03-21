import {readable} from 'svelte/store';
import {ENDPOINT_CONFIG} from './global';
import {setJsonFromUrl} from './util';

export const config = readable(
    null,
    function start(set) {
        setJsonFromUrl(ENDPOINT_CONFIG, set, 'config');
    }
);
