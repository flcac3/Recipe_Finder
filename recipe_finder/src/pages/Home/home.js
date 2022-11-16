import React, {useContext, useEffect, useState} from 'react';
import AppJumbotron from '../../components/Jumbotron/jumbotron';
import MealsContainer from '../../components/MealsContainer/mealscontainer';
import { MyContext } from '../../context';
import Card from 'react-bootstrap/Card';
import './home.css'

function HomePage() {
  const {meals, setMeals} = useContext(MyContext);
  const apiKey = 'eaea0dae677149da94e80cc7314e6276'; // eaea0dae677149da94e80cc7314e6276

  // calling TheMealDB API to display several meals
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s")
    .then((res) => res.json())
    .then((data) => {setMeals(data.meals);})
    .catch(error => console.log(error));
  }, []);
  return (
    <div>
        {/* passing the jumbotron and search bar to home page  */}
        <AppJumbotron/>
        {/* passing the meals property from meals container to home page */}
        <MealsContainer meals={meals}/> 
    </div>
  );
}

export default HomePage;