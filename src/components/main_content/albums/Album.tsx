import React, {lazy, Suspense, useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroller";
import {authRouteApiCallV2} from "../../general/Helper";
import {useSelector} from "react-redux";



const AlbumList = lazy(() => import("./AlbumList"))

const Album = () =>{
    const search_value = useSelector((state:any)=>state.search)
    const [albume,setAlbum] =  useState<string []|null>(null)
    const [cardLoader,setCardLoadder] = useState<boolean>(false)
    const [nextPage,setNextPage] = useState<string|undefined>(undefined)
    const [hasMore,setHasMore] = useState<boolean>(true)




    const searchAlbums = (artist_name:string) =>{
        setCardLoadder(true)
        authRouteApiCallV2(
            (response) => {
                setAlbum(response.data["data"])
                setNextPage(response.data["next"])
                setCardLoadder(false)
            },
            `/search/album?q=${artist_name}&limit=10`

        ).catch((error) => {
            console.log(error);
            setCardLoadder(false)
        });
    }


    const loadMoreAlbums = () =>{
        authRouteApiCallV2(
            (response) => {
                setNextPage(response.data["next"])
                setAlbum( [...albume??[], ...response.data["data"]]);
            },

            nextPage !== undefined ? nextPage.replace("https://api.deezer.com/",""):""

        ).catch((error) => {
            console.log(error);
        });
    }

    useEffect(()=>{
        if (search_value !== null){
            searchAlbums(search_value)
        }
    },[search_value])

    useEffect(()=>{
        if(nextPage !== undefined){
            setHasMore(true)
        }else{
            setHasMore(false)
        } 
    },[albume,nextPage])


    return(
        <>
            <Suspense>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={loadMoreAlbums}
                    hasMore={hasMore}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                >
                    <div className={" grid md:grid-cols-5 gap-4 grid-cols-2"}>
                        {albume &&
                            albume.map((item:any)=>{
                                return(
                                    <>
                                        <AlbumList cover_medium={item.cover_medium
                                        } link={item.link} id={item.id} title={item.title}
                                                   card_loader = {cardLoader}/>

                                    </>

                                )
                            })
                        }
                    </div>
                </InfiniteScroll>
            </Suspense>
        </>
    )
};


export default Album;