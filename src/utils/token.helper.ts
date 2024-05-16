export const getToken = () => {
    return localStorage.getItem('token');
}
export const removeToken = () => {
    return   localStorage.removeItem('token');
}
export const setToken = (token:string|undefined) => {
    return token? localStorage.setItem('token', token):undefined;
}
export const observeToken = ()=>{
    window.addEventListener("storage", (evt)=>{
        console.log(evt)
    });
}