import {React, useContext, useState} from 'react';
import './jumbotron.css';
import {Button, Form, InputGroup} from 'react-bootstrap';
import { MyContext } from '../../context';

// jumbotron component that will be displayed on home page
function AppJumbotron() {
  const [searchInput, setSearchInput] = useState("");
  const {setMeals} = useContext(MyContext);
  
  // search meal from TheMealDB API based on user type input
  function handleSearch(){
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
    .then((res) => res.json())
    .then((data) => setMeals(data.meals))
    .catch(error => console.log(error));
  }

  // call handleSearch function if "enter" key is pressed
  const handleKeypress = e => {
  if (e.key === "Enter") {
    handleSearch();
  }
};

  return (
    <div className='jumbotron'>
      <h2>Find your next favorite recipe here!</h2>
      <div className='search-input'>
        <InputGroup className="mb-3" size='lg'>
          <Form.Control
            placeholder="Search recipe..."
            aria-label="Recipe Search Input"
            aria-describedby="search-recipe-button"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeypress}
          />
          <Button className='search-button' variant='link' type="submit" id="search-recipe-button" onClick={handleSearch}>
            Search
          </Button>
        </InputGroup>
      </div>
    </div>
  );
}

export default AppJumbotron;