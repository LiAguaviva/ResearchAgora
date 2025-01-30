import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import StarRating from '../usersComp/StarRating';
import { fetchData2 } from '../../helpers/axiosHelper';


const handleRatingSubmit = (rating) => {
  console.log("User selected rating:", rating);
};

export const ReviewModal = ({show,setShow, researcher,user}) => {
  const navigate = useNavigate();
  const [review, setReview ]= useState({})
  const [rating, setRating] = useState(0)
  // const [result, setResult] = useState({});


  const closeModal = () => {
    setShow(!show)
  }

  const handleChange = (e) => {
   const {name, value} = e.target;
   setReview({...review, [name]: value })
  }
  console.log("ratinggggggggggggggg",rating);
  console.log("revieeeeew", review);
  
   const onSubmit = async(e) => {
    e.preventDefault();
    // setResult({...result, review, rating})
    // setResult((prevResult) => ({...prevResult, review, rating}));
    let result = {...review, rating,user,researcher}
    const resultFinal = fetchData2('review/createreview','post',result)
    closeModal();
    console.log("------", result);
   }
  
   console.log('researcher on reviewModal', researcher);
   console.log('user on reviewModal', user);
   

  return (
    
    <div className='modalContainer'>
        <form className='verificationModal'>
        <h4>Write a Review</h4>
        <fieldset className="textareaBig">
         {/*  <label htmlFor="description">Description</label> */}
          <textarea
            className='reviewTextarea'
            id="description"
            type="text"
            placeholder="Write Your Review"
            value={review.text}
            onChange={handleChange}
            name="description" 
          />
        </fieldset>
        <StarRating maxStars={5} onRatingSelect={handleRatingSubmit} rating = {rating} setRating={setRating}/>
        <div className='buttons'>
          <button onClick={onSubmit}>Submit</button>
          <button className='cancel' onClick={closeModal}>Cancel</button>
        </div>
        </form>
    </div>

  )
}




