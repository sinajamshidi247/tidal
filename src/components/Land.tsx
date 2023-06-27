import React from "react";
import Search from "./header/Search";
import MainContent from "./main_content/MainContent";
import Player from "./footer/Player";


const Land = () => {

    return (
        <>
            <div className={"search-parent"}>
                <div className={"search-input-parent"}>
                    <Search/>
                    <div className={"mt-2"}>
                        <MainContent/>
                    </div>
                    <Player/>
                </div>
            </div>
        </>
    )
};

export default Land;