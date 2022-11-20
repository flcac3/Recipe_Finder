import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './mealcard.css';
import {MyContext} from '../../context';
import {useContext} from 'react';
import { useNavigate } from 'react-router-dom';

function MealCard({ meal }) {
  const { setMeal } = useContext(MyContext);
  const navigate = useNavigate();
  
  return (
    // meal cards to show the meal's image, title, and instruction to make
    <div className='meal-card'>
        <Card className='card'>
        <Card.Img className='card-image' variant="top" src={meal.strMealThumb} />
        <Card.Body>
            <Card.Title className='card-title'>{meal.strMeal}</Card.Title>
            <Button className='meal-card-button mb-3' variant='link' size='lg' onClick={() => {
              setMeal(meal);
              navigate('/recipe', { replace: true });
            }}>View Recipe</Button>
        </Card.Body>
        </Card>
    </div>
  );
}

export default MealCard;