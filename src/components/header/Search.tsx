import React, {useEffect, useState} from "react";
import "../../assests/css/seach.css";
import {Autocomplete, TextField} from "@mui/material";
import {authRouteApiCallV2} from "../general/Helper";
import {useDispatch,useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../../state/Index"
import {pageChanger, searchChanger } from "../../state/action-creators/Index";






const Search = () =>{
    const dispatch = useDispatch()
    const search_value = useSelector((state:any)=>state.search)
    const {pageChanger,searchChanger} = bindActionCreators(actionCreators, dispatch)
    const [artist,setArtist] = useState<string []>([])
    const [dataWithTimeDelay,setDataWithTimeDelay] = useState<string>("")
    const [loader,setLoader] = useState<boolean>(false)

    const searchRequest = (value:string) =>{
        if (value.length !==0){
            authRouteApiCallV2(
                (response) => {
                    setLoader(false)
                    let data_list:any = []
                    response.data["data"].forEach((item:any)=>{
                        data_list.push(item["name"])
                    })
                    setArtist(data_list)
                },
                    `/search/artist?q=${value}&limit=10`
                        // `${BASE_URL}/search/album?q=${query}&limit=5`;

            ).catch((error) => {
                setLoader(false)
                console.log(error);
            });
        }

    };


    useEffect(() => {
        const timeOutId = setTimeout(() => {
            console.log("sina")
            searchRequest(dataWithTimeDelay)
        }, 500);
        return () => clearTimeout(timeOutId);
    }, [dataWithTimeDelay]);

    useEffect(() => {
        if(artist.length === 0){
            setLoader(false)
        }
    }, [artist]);

    useEffect(()=>{
        if (search_value !== null){
            pageChanger("album")
        }
    },[search_value])


    return(
        <>
            <div>
                <div>
                    <Autocomplete
                        freeSolo
                        loading={loader}
                        id="free-solo-2-demo"
                        disableClearable
                        filterOptions={x => x}
                        onChange={(event, value) => {
                            if (value.length === 0) {
                                searchChanger(value, "delete");
                            } else {
                                if(value !== null){
                                    searchChanger(value, "change");
                                }
                            }
                        }

                    }
                        options={artist}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search input"
                                onChange={(event)=>{
                                    setDataWithTimeDelay(event.target.value)
                                    console.log(event.target.value)
                                    console.log("here!")
                                    if (event.target.value.length === 0 ){
                                        setArtist([])
                                    }
                                    setLoader(true)
                                }}
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                }}
                            />
                        )}
                    />
                </div>
            </div>
        </>
    )
};

export default Search;