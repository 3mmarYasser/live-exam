export interface User {
    id:string;
    name:string;
    email:string;
}
interface Auth {
    user:User|null;
    token:string |null;
    isLoginIn:boolean;
    isLoading:boolean;
}

export type {
    Auth
}