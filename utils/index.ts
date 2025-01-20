export const replaceSpace = (str: string) => {
    return str.replace(/\s+/g, '-');
}

export const objectToQueryString = (obj: any) => {

    return Object.keys(obj)
        .map((key) => `${key}=${obj[key]}`)
        .join('&');
}

export function generateFingerPrint() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }