import {writable} from 'svelte/store';
import {ENDPOINT_FEED, ENDPOINT_CASES, ENDPOINT_CONFIG, FFEDS} from './global';
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
    const promises = [];
    let items = [];

    FFEDS.forEach(feed => {
        promises.push(fetch(`${ENDPOINT_FEED}/${feed}.json`).then(response => {
            return response.json();
        }));
    });

    Promise.allSettled(promises).then(results => {
        results.forEach(result => {
            if (result.value.status === 'ok') {
                items = [...items, ...result.value.items];
            }
        });
        items = items.filter(item => {
            const string = JSON.stringify(item).toLowerCase();
            let result = false;

            if (
                string.includes('corona')
                || string.includes('covid')
                || string.includes('sars-cov')
                || string.includes('pandemie')
                || string.includes('pandemic')
                || string.includes('epidemie')
                || string.includes('epidemic')
            ) {
                result = true;
            }

            return result;
        });
        items.sort((a, b) => {
            const dateA = new Date(a.pubDate);
            const dateB = new Date(b.pubDate);

            return dateB - dateA;
        });

        set(items);
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
