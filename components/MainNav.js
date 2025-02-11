import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import {useRouter} from "next/router";
import Link from 'next/link';
import { useState } from 'react';


export default function MainNav() {
  const router = useRouter()
    
  const [searchField, setSearchField] = useState();
    
  const [isExpanded, setIsExpanded] = useState(false);

  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)

  function submitForm(e){
    e.preventDefault()
    setIsExpanded(false); 
    router.push(`/artwork?title=true&q=${searchField}`);
    setSearchHistory(current => [...current, `title=true&q=${searchField}`]);
    console.log(searchHistory)
  }
  function handleToggle(){
    setIsExpanded(!isExpanded)
  }

  function handleNavLink(){
    setIsExpanded(false);
  }

  return (
    <>
    <Navbar expand="lg" expanded={isExpanded} className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Metropolitan Musem of Art</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" onClick={handleToggle}/>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >

            <Link href="/" passHref legacyBehavior>
              <Nav.Link active={router.pathname === "/"} onClick={handleNavLink}>Home</Nav.Link>
            </Link>

            <Link href="/search" passHref legacyBehavior>
              <Nav.Link active={router.pathname === "/search"} onClick={handleNavLink}>Advanced Search</Nav.Link>
            </Link>

            {/* <Link href="/favourites" passHref legacyBehavior><Nav.Link>Stuff</Nav.Link></Link> */}
          </Nav>
          <Form onSubmit={submitForm} className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
            />
            <Button type="submit"className="btn-primary" >Search</Button>
          </Form>
          <Nav>
            <NavDropdown title="User Name" id="basic-nav-dropdown">
              
              <Link href="/favourites" passHref legacyBehavior>
                <NavDropdown.Item active={router.pathname === "/favourites"} onClick={handleNavLink}>Favourites</NavDropdown.Item>
              </Link>
              <Link href="/history" passHref legacyBehavior>
                <NavDropdown.Item active={router.pathname === "/history"} onClick={handleNavLink}>Search History</NavDropdown.Item>
              </Link>
              
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <br/>
    <br/>
    </>

  );
}

