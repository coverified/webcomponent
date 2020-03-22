export const idValueArrayToObject = array => {
    const result = {};

    array.forEach(({id, value}) => result[id] = value);

    return result;
};

export const setJsonFromUrl = (url, set, subfield) => {
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            set(idValueArrayToObject(data[subfield]));
        });
};

export const capitalizeFirstLetter = string => {
    return string && string[0].toUpperCase() + string.slice(1);
};

export const dataKeyFromConfig = (area, language) => {
    return `${area.toLowerCase()}${capitalizeFirstLetter(language.toLowerCase())}`;
};

export const getElapsedTime = timestamp => {
    const now = new Date;
    const then = new Date(timestamp);
    const diff = Math.floor((now - then) / 1000);
    const hours = Math.floor(diff / 3600);
    const mins = Math.floor((diff % 3600) / 60);

    if (hours > 48) {
        return then.toLocaleDateString();
    } else if (hours >= 1)  {
        return `${hours}h`;
    } else {
        return `${mins}m`;
    }
};
