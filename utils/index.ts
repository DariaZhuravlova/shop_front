export const replaceSpace = (str: string) => {
    return str.replace(/\s+/g, '-');
}

export const objectToQueryString = (obj: any) => {

    return Object.keys(obj)
        .map((key) => `${key}=${obj[key]}`)
        .join('&');
}