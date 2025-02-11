import validObjectIdList from '@/public/data/validObjectIdList.json'
import { useState, useEffect } from "react";
import { Card, Pagination, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import useSWR from "swr";
import Error from "next/error";
import ArtworkCard from "@/components/ArtworkCard";


export default function Artwork() {
  const PER_PAGE = 12
  const [artworkList, setArtworkList] = useState([]); 
  const [page, setPage] = useState(1); 
  const router = useRouter();
  let finalQuery = router.asPath.split('?')[1];
  const {data, error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`, (url) =>fetch(url).then(res => res.json()))

  const previousPage = () => {
    if (page > 1){
      setPage(page - 1)
    }
  }

  const nextPage = () => {
    if (page < artworkList.length){
      setPage(page + 1)
    }
  }

  useEffect(()=> {
    if (data) {
      let filteredResults = validObjectIdList.objectIDs.filter(x=> data.objectIDs?.includes(x))
      let results = []
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1)
    }
  }, [data])

  if (error){
    return <Error statusCode={404}/>
  }

  if (artworkList) {
    return(
      <>
        <Row className="gy-4">
          {artworkList.length > 0 ? (
            artworkList[page-1].map((artwork) => (
              <Col lg={3} key={artwork}><ArtworkCard objectID={artwork} /></Col>
            ))
          ) : (
            <Card>
              <Card.Body>
              <h4>Nothing here...</h4> 
              <br/>
              <p>Try searching for something else!</p>
            </Card.Body>
            </Card>
          )} 
        </Row>
        <br/>
        <br/>
        
        {artworkList.length > 0 && (
          <Row>
            <Col>
              <Pagination>
                <Pagination.Prev onClick={previousPage}/>
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={nextPage}/>
              </Pagination>
            </Col>
          </Row>
        )}
      </>
    )
  }
}
