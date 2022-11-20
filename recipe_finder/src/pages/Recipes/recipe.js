import {React, useContext, useState, useMemo} from 'react';
import { Button } from 'react-bootstrap';
import './recipe.css';
import { MyContext } from '../../context';
import swal from 'sweetalert';

function RecipePage() {
    const {user, setUser, meal} = useContext(MyContext);
    const [loading, setLoading] = useState(false);

    // to add meal to favorites
    const handleAddToFavorites = async() => {
        setLoading(true);
        const response = await fetch('http://localhost:5000/add-favorites', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                mealId: meal.idMeal
            })
        })
        
        const data = await response.json();
        setLoading(false);
        setUser(data);
        swal("Added to favorites successfully!", {
            icon: "success",
            buttons: false,
            timer: 2000,
        });
    };

    // to remove meal from favorites
    const handleRemoveFromFavorites = async() => {
        setLoading(true);
        const response = await fetch('http://localhost:5000/remove-favorites', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                mealId: meal.idMeal
            })
        });

        const data = await response.json();
        setLoading(false);
        setUser(data);
    };

    // to reconfirm if user wish to remove meal from favorites
    const confirmRemove = async () => {
        const willDelete = await swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to find this meal on favorites.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            closeOnClickOutside: false,
            closeOnEsc: false,
        });

        if (willDelete) {
            handleRemoveFromFavorites();
            swal("Removed from favorites successfully", {
            icon: "success",
            buttons: false,
            timer: 2000,
            });
        } 
    };


  const ingredients = useMemo(() => {
    const ings = [];
    if(meal) {
        for(let i = 1; i <= 20; i++) {
            if(meal['strIngredient' + i]) {
                const ingredientData = meal['strIngredient' + i] + ": " + meal['strMeasure' + i];
                ings.push(<li key={i}>{ingredientData}</li>);
            }
        }
    }

    return (<ol>{ings}</ol>);
  }, [meal]);

  const instructions = useMemo(() => {
    const insts = [];
    if(meal) {
        meal.strInstructions.split(". ").forEach((instruction, i) => {
            if(meal['strIngredient' + i]) {
               insts.push(<li key={i}>{instruction}</li>);
            }
        })
    }

    return (<ol>{insts}</ol>);
  }, [meal]);

  return (
    <div className='recipe-page'>
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <section>
            <h1>{meal.strMeal}</h1>
        </section>

        <section>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
        </section>

        <section>
            <button href="#" className="fa fa-facebook" />
            <button className='recipePagePrintButton' onClick={() => { window.print(); }} type="button">Print Recipe</button>
            {user && ( // if user is logged in
            <>
                {user.favorites.includes(meal.idMeal) ? ( // if user has favorite meals
                  <Button variant="danger" onClick={confirmRemove} disabled={loading}>Remove from Favorites</Button>
                ) : ( // if user don't have any favorite meals
                  <Button className='modal-button' variant="link" onClick={handleAddToFavorites} disabled={loading}>Add to Favorites</Button>
                 )}
            </>
          )}
        </section>

        <section>
           <h2>Ingredients</h2>
           {ingredients}
        </section>

        <section>
            <h2>Instructions</h2>
            <div>{instructions}</div>
        </section>
    </div>
  );
}

export default RecipePage;