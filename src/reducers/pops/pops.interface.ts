export enum PopType{
    Undefined="Undefined",
}
interface Pops {
    type:PopType,
    data:null | object | [] | string | number
}
export type {
    Pops
}