import React from 'react';
import './notfound.css'

function NotFoundPage() {
  return (
    // display this page if the page targeted is not accessible or not found
    <div className='error-page'>
        <h1>Sorry, this page does not exist or is not accessible.</h1>
    </div>
  );
}

export default NotFoundPage;