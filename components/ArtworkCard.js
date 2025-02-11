import useSWR from "swr"
import Error from "next/error"
import { Card, Button } from "react-bootstrap";
import Link from "next/link";

export default function ArtworkCard({objectID}){
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const {data, error, isLoading} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`, fetcher);

    if(isLoading){
        return null
    } else {
        if (error){
            return <Error statusCode={404}/>
        } else {
            return(
                <>
                <Card key={data.objectID} style={{width: "100%"}}>
                    {console.log({objectID})}
                    <Card.Img src={data.primaryImageSmall? data.primaryImageSmall : 
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019"}/>
                    <br/>
                    <Card.Body>
                        <Card.Title>{data.title? data.title : "N/A"}</Card.Title>
                        <br/>
                        <Card.Text>
                            Date: {data.objectDate ? data.objectDate : "N/A"} <br/>
                            Classification: {data.classification ? data.classification : "N/A"} <br/>
                            Medium: {data.medium ? data.medium : "N/A"} <br/>
                        </Card.Text>
                        <Link href={`/artwork/${objectID}`} passHref>
                            <Button variant="outline-primary">ID: {objectID}</Button>{' '}
                        </Link>
        
                    </Card.Body>
                </Card>
                </>
            )
        }
    }

}