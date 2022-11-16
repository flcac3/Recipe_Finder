import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import MealCard from '../../components/MealCard/mealcard';
import { MyContext } from '../../context';
import './favorites.css';

function FavoritesPage() {
    const {user} = useContext(MyContext);
    const [favorites, setFavorites] = useState([]);
    useEffect(() => {
        if(user.favorites.length){
            // accessing user favorites to pass it to TheMealDB API url to search the meal
            const requests = user.favorites.map((favorite) => fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${favorite}`
                ).then((res) => res.json()));

            Promise.all(requests).then((res) => setFavorites(res));
        }
    }, [user]);

    // show "add new favorites" button if there is no favorites found
    if (!user.favorites.length){
        return (
            <div className='empty-fav'>
                <h2>You don't have any favorites yet</h2>
                <LinkContainer to="/">
                    <Button className='add-fav-btn' variant="link">Add new favorites</Button>
                </LinkContainer>
            </div>
        );
    }

  return (

    <div>
        <h2>Your favorites</h2>
        <div className='meals-container'>
        {favorites.map(({meals: meal}) => (
            // ^ mapping the user favorites from use state to pass into meal cards and display it
            // v using optional chaining to check if the meals exists, if not it will just return as undefined
            <MealCard key = {meal?.[0].idMeal} {...meal?.[0]}/>
      ))}
    </div>
    </div>
  );
}

export default FavoritesPage;