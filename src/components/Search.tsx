import React, {useEffect, useState} from "react";
import "../assests/css/seach.css";
import {Autocomplete, TextField} from "@mui/material";
import {authRouteApiCallV2,sleep} from "../components/general/Helper";
import AlbumList from "../components/AlbumList";




const Search = () =>{

    const [artist,setArtist] = useState<string []>([])
    const [dataWithTimeDelay,setDataWithTimeDelay] = useState<string>("")

    const searchRequest = (value:string) =>{
        if (value.length !==0){
            authRouteApiCallV2(
                (response) => {
                    let data_list:any = []
                    response.data["data"].forEach((item:any)=>{
                        data_list.push(item["name"])
                    })
                    setArtist(data_list)
                },
                    `/search/artist?q=${value}&limit=10`
                        // `${BASE_URL}/search/album?q=${query}&limit=5`;

            ).catch((error) => {
                console.log(error);
            });
        }

    };

    const searchAlbums = (artist_name:string) =>{
        authRouteApiCallV2(
            (response) => {
                // let data_list:any = []
                // response.data["data"].forEach((item:any)=>{
                //     data_list.push(item["name"])
                // })
                // setArtist(data_list)
                console.log("-----------------------------------")
                console.log(response.data)
                console.log("-----------------------------------")
            },
            `/search/album?q=${artist_name}&limit=10`

        ).catch((error) => {
            console.log(error);
        });
    }

    // const getArtistData = (id:number)=>{
    //     console.log(id)
    // }
    // useEffect(()=>{
    //     if (selectedArtist){
    //         authRouteApiCallV2(
    //             (response) => {
    //                 // let data_list:any = []
    //                 // response.data["data"].forEach((item:any)=>{
    //                 //     data_list.push({name:item["artist"]["name"],id:item["artist"]["id"]})
    //                 // })
    //                 // setArtist(data_list)
    //                 console.log("-----------------------------------")
    //                 console.log(response.data)
    //                 console.log("-----------------------------------")
    //             },
    //             `/artist/${selectedArtist}/`
    //         ).catch((error) => {
    //             console.log(error);
    //         });
    //     }
    // },[selectedArtist])

    useEffect(() => {
        const timeOutId = setTimeout(() => searchRequest(dataWithTimeDelay), 500);
        return () => clearTimeout(timeOutId);
    }, [dataWithTimeDelay]);


    return(
        <>
            <div className={"search-parent"}>
                <div className={"search-input-parent"}>
                    <Autocomplete
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        filterOptions={x => x}
                        onChange={(event, value) => {
                            console.log(value)
                            searchAlbums(value)
                            // setSelectedArtist(value)
                        }

                    }
                        options={artist}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search input"
                                onChange={(event)=>{
                                    setDataWithTimeDelay(event.target.value)
                                    if (event.target.value.length === 0 ){
                                        setArtist([])
                                    }
                                }}
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                }}
                            />
                        )}
                    />
                </div>
                <div className={"search-albumlist"}>
                    {
                        [1,2,3,4,5].map((item)=>{
                            return(
                                <AlbumList cover_medium={"c"} link={"B"} id={2} title={"S"}/>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
};

export default Search;