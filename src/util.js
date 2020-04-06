export const setJsonFromUrl = (url, set, transform = data => {
    return data
}) => {
    fetch(url).then(response => {
        return response.json();
    }).then(data => set(transform(data)));
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

export const getFormattedNumberString = number => {
    return new Intl.NumberFormat().format(parseFloat(number));
};

export const ensureCustomElement = (name, element) => {
    if (customElements.get(name) === undefined) {
        customElements.define(name, element);
    }
};
