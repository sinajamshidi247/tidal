import React, {useEffect, useState} from "react";
import "../assests/css/seach.css";
import {Autocomplete, TextField} from "@mui/material";
import {authRouteApiCallV2,sleep} from "../components/general/Helper";
import AlbumList from "../components/AlbumList";
import CircularProgress from '@mui/material/CircularProgress';




const Search = () =>{

    const [artist,setArtist] = useState<string []>([])
    const [dataWithTimeDelay,setDataWithTimeDelay] = useState<string>("")
    const [albume,setAlbum] =  useState<string []|null>(null)
    const [loader,setLoader] = useState<boolean>(false)
    const [cardLoader,setCardLoadder] = useState<boolean>(false)

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

    const searchAlbums = (artist_name:string) =>{
        setCardLoadder(true)
        authRouteApiCallV2(
            (response) => {
                setAlbum(response.data["data"])
                setCardLoadder(false)
            },
            `/search/album?q=${artist_name}&limit=10`

        ).catch((error) => {
            console.log(error);
            setCardLoadder(false)
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

    return(
        <>
            <div className={"search-parent"}>
                <div className={"search-input-parent"}>
                    <Autocomplete
                        freeSolo
                        loading={loader}
                        id="free-solo-2-demo"
                        disableClearable
                        filterOptions={x => x}
                        onChange={(event, value) => {
                            console.log(value)
                            searchAlbums(value)
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
                <div className="mt-2">
                    {!albume && cardLoader &&
                        <div className="h-screen flex items-center justify-center">
                            <CircularProgress/>
                        </div>
                    }
                    {albume &&
                        <div className={" grid md:grid-cols-5 gap-4 grid-cols-2"}>
                            {
                                albume.map((item:any)=>{
                                    return(
                                        <>
                                            <AlbumList cover_medium={item.cover_medium
                                            } link={item.link} id={item.id} title={item.title} card_loader = {cardLoader}/>

                                        </>

                                    )
                                })
                            }
                        </div>
                    }
                </div>

            </div>
        </>
    )
};

export default Search;