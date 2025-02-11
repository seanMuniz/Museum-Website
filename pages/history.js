import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { useRouter } from "next/router";
import { Card } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import {Button} from "react-bootstrap";
import styles from '@/styles/History.module.css';

export default function History (){
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    
    const router = useRouter(); 

    let parsedHistory = [];

    searchHistory.forEach(h=>{
        let params = new URLSearchParams(h); 
        let entries = params.entries(); 
        parsedHistory.push(Object.fromEntries(entries));
    });

    const historyClicked = (e, index) => {
        router.push(`/artwork?${searchHistory[index]}`)
    }

    const removeHistoryClicked = (e, index) =>{
        e.stopPropagation(); //stop the event from triggering other events. 
        setSearchHistory(current => {
            let x = [...current]; 
            x.splice(index, 1); 
            return x; 
        }); 
    }

    if (parsedHistory.length == 0){
        return (
            <>
                <Card.Body>
                    <h4>Nothing here...</h4>
                    <br/>
                    <br/>
                    <p>Try searching for something new!</p>
                        
                </Card.Body>
            </>
        )
    } else {
        return (
            <>
                <ListGroup>
                    {console.log("Hello " + parsedHistory.length)}
                    {parsedHistory.map((historyItem, index) =>(
                        <ListGroup.Item onClick={(e) => historyClicked(e, index)} className={styles.historyListItem}>
                            {Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp; </>))}
                            <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </>
        )
    }
}