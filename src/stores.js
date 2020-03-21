import {readable, writable} from 'svelte/store';
import {API_BASE, ENDPOINT_CONFIG} from './global';
import {setJsonFromUrl} from './util';

export const config = readable(
    null,
    function start(set) {
        setJsonFromUrl(ENDPOINT_CONFIG, set, 'config');
    }
);

function createDataStore() {
    const { subscribe, set, update } = writable(null);

    return {
        subscribe,
        update,
        set,
        load: key => {
            setJsonFromUrl(`${API_BASE}/${key}`, set, key);
        },
    };
}

export const data = createDataStore();
