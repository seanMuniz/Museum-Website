import {useAtom} from 'jotai'; 
import { favouritesAtom } from '@/store';
import { useState } from 'react';
import { Card, Button } from "react-bootstrap";
import Error from "next/error";
import useSWR from "swr";


export default function ArtworkCardDetail({objectID}){

    const [favouriteList, setFavouriteList] = useAtom(favouritesAtom); 

    const [showAdded, setShowAdded] = useState(favouriteList.includes(objectID)); 
    
    const fetcher = (url) => fetch(url).then((res) =>{
        if (res.ok){
            return res.json()
        } else {
            return Promise.reject(res.status)
        }
    });

    function favouritesClicked(){
        if (showAdded){
            setFavouriteList(current=> current.filter(fav => fav != objectID));
            setShowAdded(false)
        } else{
            setFavouriteList(current=>[...current, objectID]);
            setShowAdded(true); 
        }
    }

    const {data, error, isloading} = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null, fetcher)
    if (isloading){
        return null
    } else {
        if (error){
            return <Error statusCode={404}/>
        } else {
            return (
                <>
                <Card>
                    {data?.primaryImage && (<Card.Img src={data?.primaryImage}/>)}
                    <br/>
                    <br/>
                    <Card.Title style={{marginLeft: 20}}>{data?.title ? data?.title : "N/A"}</Card.Title>
                    <Card.Body>
                        <Card.Text>
                            Date: {data?.objectDate? data?.objectDate : "N/A"}
                            Classification: {data?.classification || 'N/A'}<br />
                        Medium: {data?.medium ? (
                                    <>
                                        {data?.medium} <a href={data?.artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a>
                                    </>
                                ) : "N/A"}
                            <br/>
                            <br/>
                            Artist Name: {data?.artistDisplayName ? data?.artistDisplayName : "N/A"} <br/>
                            Credit Line: {data?.creditLine ? data?.creditLine : "N/A"} <br/>
                            Dimensions: {data?.dimensions ? data?.dimensions : "N/A"} <br/>
                            <br/>
                            <Button variant={showAdded? "primary" : "outline-primary"} onClick={favouritesClicked}>
                                {showAdded ? "Added!":"Add to Favourites" }
                            </Button>
                            {console.log(favouriteList)}
                        </Card.Text>
                    </Card.Body>
                </Card>

                </>
            )
        }
    }
}