import React from "react";
import {useSelector} from "react-redux";
import Album from "./albums/Album";



const MainContent = () =>{
    const page = useSelector((state:any)=>state.page)
    if (page === "album"){
        return <Album/>
    }else if (page=== "track") {
        return <>trackList</>
    }else{
        return <>Home Land! ohhh CANADA</>
    }
};

export default MainContent;