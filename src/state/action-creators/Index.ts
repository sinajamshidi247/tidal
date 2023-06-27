export const pageChanger = (mode:string) =>{
    return (dispatch:any) =>{
        dispatch({
            type:mode,
        })
    }
};

export const searchChanger = (value: string, action: any) => {
    return (dispatch: any) => {
        dispatch({
            type: action, // Set the action type based on the value passed
            value: value,
        });
    };
};
