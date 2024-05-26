export enum PopType{
    Undefined="Undefined",
    ThemesMenu = "Themes_Menu",

}
interface Pops {
    type:PopType,
    data:null | object | [] | string | number
}
export type {
    Pops
}