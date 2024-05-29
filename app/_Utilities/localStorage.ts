export const setInLocalStorage = (key: string, values: any) =>{
    return localStorage.setItem(key, JSON.stringify(values))
}

export const getFromLocalStorage = (key: string) =>{
    return JSON.parse(localStorage.getItem(key) as string)
}