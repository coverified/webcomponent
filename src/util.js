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
