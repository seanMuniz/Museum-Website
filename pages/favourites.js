import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import {Row, Col, Card} from 'react-bootstrap'; 
import ArtworkCard from "@/components/ArtworkCard";

export default function Favourites(){
    const [favouriteList, setFavouriteList] = useAtom(favouritesAtom)
    
    if (favouriteList.length > 0 ){
        return (
            <>
            <Row className="gy-4">
               {favouriteList.map((index) => (
                <Col lg={3} key={index}><ArtworkCard objectID={index} /></Col>
               ))}
            </Row>
            </>
        )
    } else{
        return (
            <>
            <Card.Body>
                <h4>Nothing here...</h4>
                <br/>
                <br/>
                <p>Try adding some art to your favourites!</p>
                {console.log(favouriteList)}

            </Card.Body>
            </>
        )
    }
}