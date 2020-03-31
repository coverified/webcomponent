export const setJsonFromUrl = (url, set, transform = data => {
    return data
}) => {
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => set(transform(data)));
};

export const getElapsedTime = timestamp => {
    const now = new Date;
    const then = new Date(timestamp);
    const diff = Math.floor((now - then) / 1000);
    const hours = Math.floor(diff / 3600);
    const mins = Math.floor((diff % 3600) / 60);

    if (hours > 48 || then > now) {
        return then.toLocaleDateString();
    } else if (hours >= 1) {
        return `${hours}h`;
    } else {
        return `${mins}m`;
    }
};

export const hostNameFromUrl = url => {
    url = new URL(url);

    return url.hostname.replace(/www\./, '');
};

export const sortFeedItemsByDate = items => {
    return items.sort((a, b) => {
        const dateA = new Date(a.pubDate);
        const dateB = new Date(b.pubDate);

        return dateB - dateA;
    });
};

export const removeNonCoronaItemsFromFeed = items => {
    return items.filter(item => {
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
};

export const getFormattedNumberString = number => {
    return new Intl.NumberFormat().format(parseFloat(number));
};
