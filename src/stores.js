import {writable} from 'svelte/store';
import {ENDPOINT_FEED, ENDPOINT_CASES, ENDPOINT_CONFIG} from './global';
import {setJsonFromUrl} from './util';

const createStore = loadFunc => {
    const {subscribe, set, update} = writable(null);

    return {
        subscribe,
        update,
        set,
        load: key => loadFunc(set, key),
    };
};

export const news = createStore((set, key) => {
    setJsonFromUrl(`${ENDPOINT_FEED}/latest?limit=${key}&offset=0`, set);
});

export const config = createStore((set, key) => {
    setJsonFromUrl(`${ENDPOINT_CONFIG}/${key}.json`, set);
});

export const cases = createStore((set, key) => {
    setJsonFromUrl(`${ENDPOINT_CASES}/${key}/latest`, set, data => {
        return data.result[Object.keys(data.result)[0]];
    });
});
