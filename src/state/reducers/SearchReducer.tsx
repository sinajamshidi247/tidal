const reducer = (value = null, action:any) => {
    switch (action.type) {
        case "change":
            return action.value;
        case "delete":
            return null;
        default:
            return value;
    }
};

export default reducer;