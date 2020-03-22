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
