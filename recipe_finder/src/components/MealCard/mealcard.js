import React from 'react';
import {Card} from 'react-bootstrap';
import MealModal from '../MealModal/mealmodal';
import './mealcard.css';

function MealCard({strMeal, strMealThumb, strInstructions, idMeal}) {
  return (
    // meal cards to show the meal's image, title, and instruction to make
    <div className='meal-card'>
        <Card className='card'>
        <Card.Img className='card-image' variant="top" src={strMealThumb} />
        <Card.Body>
            <Card.Title className='card-title'>{strMeal}</Card.Title>
            <MealModal title={strMeal} description={strInstructions} idMeal={idMeal} />
        </Card.Body>
        </Card>
    </div>
  );
}

export default MealCard;