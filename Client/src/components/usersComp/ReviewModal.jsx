import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import StarRating from './StarRating';

const initialValue = {
  test: "",
  rate: 1
}
const handleRatingSubmit = (rating) => {
  console.log("User selected rating:", rating);
  // Send the rating to your backend or perform other actions
};

export const ReviewModal = ({show,setShow}) => {
  const navigate = useNavigate();
  const [review,setReview ]= useState(initialValue)
   const [rating, setRating] = useState(0)


  // hacer funcion que recargue la página y 
  const closeModal = () => {
    setShow(!show)
  }

  const handleChange = () => {

  }
  console.log("ratinggggggggggggggg",rating);
  

  return (
    
    <div className='modalContainer'>
      <div className='verificationModal'>
        <form>
        <h4>Write a Review</h4>
        <fieldset className="textareaBig">
         {/*  <label htmlFor="description">Description</label> */}
          <textarea
            id="description"
            type="text"
            placeholder="Write Your Review"
            value={review.text}
            onChange={handleChange}
            name="description" 
          />
        </fieldset>
        <StarRating maxStars={5} onRatingSelect={handleRatingSubmit} rating = {rating} setRating={setRating}/>
        </form>
          <button onClick={closeModal}>Submit</button>
          <button onClick={closeModal}>Cancel</button>
      </div>
    </div>

  )
}




