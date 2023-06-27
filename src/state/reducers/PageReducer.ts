const reducer = (mode:string,action:any) =>{
    switch (action.type) {
        case "album":return mode = "album"
        case "track":return mode = "track"
        default:return mode = "land"
    }
};
export default reducer