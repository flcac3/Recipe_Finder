import React from 'react';
import MealCard from '../MealCard/mealcard';
import './mealscontainer.css';
import Alert from 'react-bootstrap/Alert';

// container for meal cards
function MealsContainer({meals}) 
{
  return (
    /* using map to loop and show something for each meal */
    <div className='meals-container'>
      {!meals && // if meals inserted in search input cannot be found from the API
      <Alert className="mt-5" variant='warning'>
          Sorry, could not find this recipe
      </Alert>
      }
      {meals?.map((meal) => ( // map meals and populate the meal properties if meals can be found
        <MealCard key = {meal.idMeal} {...meal}/>
      ))}
    </div>
  );
}

export default MealsContainer;