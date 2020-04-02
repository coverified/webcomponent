import {writable} from 'svelte/store';
import {ENDPOINT_FEED, ENDPOINT_CASES, ENDPOINT_CONFIG} from './global';
import {setJsonFromUrl, sortFeedItemsByDate} from './util';

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
    setJsonFromUrl(`${ENDPOINT_FEED}/?start=26.03.2020T18:00&end=02.04.2020T18:00&limit=${key}`, set, data => {
        return sortFeedItemsByDate(data);
    });
});

export const config = createStore((set, key) => {
    setJsonFromUrl(`${ENDPOINT_CONFIG}/${key}.json`, set);
});

export const cases = createStore((set, key) => {
    setJsonFromUrl(`${ENDPOINT_CASES}/${key}/latest`, set, data => {
        return data.result[Object.keys(data.result)[0]];
    });
});
