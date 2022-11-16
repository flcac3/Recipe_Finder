import {React, useContext, useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import { MyContext } from '../../context';
import swal from 'sweetalert';
import './mealmodal.css';

// meal modal to show meal details whenever user click the "view more" button in meal cards
function MealModal({title, description, idMeal}) {
  const [show, setShow] = useState(false);
  const {user, setUser} = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        mealId: idMeal
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
        mealId: idMeal
    })
    })
    const data = await response.json();
      setLoading(false);
      setUser(data);
  };

  // to reconfirm if user wish to remove meal from favorites
  function confirmRemove() {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to find this meal on favorites.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      closeOnClickOutside: false,
      closeOnEsc: false,
    })
    .then((willDelete) => {
      if (willDelete) {
        handleRemoveFromFavorites();
        swal("Poof! Removed from favorites successfully!", {
          icon: "success",
          buttons: false,
          timer: 2000,
        });
      } 
      /* else {
        swal("Your favorite meal is not removed", {
          icon: "error",
          buttons: false,
          timer: 2000,
        });
      } */
    });
  }

  return (
    <>
      <Button className='modal-button mb-3' variant="link" size='lg' onClick={handleShow}>View More
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>How to make "{title}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>{description}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {user && ( // if user is logged in
            <>
            {user.favorites.includes(idMeal) ? ( // if user has favorite meals
            <Button variant="danger" onClick={confirmRemove} disabled={loading}>Remove from Favorites</Button>
            ) : ( // if user don't have any favorite meals
            <Button className='modal-button' variant="link" onClick={handleAddToFavorites} disabled={loading}>
            Add to Favorites
            </Button>
            )}
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MealModal;