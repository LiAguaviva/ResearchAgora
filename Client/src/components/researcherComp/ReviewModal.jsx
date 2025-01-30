import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import StarRating from '../usersComp/StarRating';
import { fetchData2 } from '../../helpers/axiosHelper';


const handleRatingSubmit = (rating) => {
  console.log("User selected rating:", rating);
  // Send the rating to your backend or perform other actions
};

export const ReviewModal = ({show,setShow, researcher,user}) => {
  const navigate = useNavigate();
  const [review, setReview ]= useState({})
  const [rating, setRating] = useState(0)
  const [msg, setMsg] = useState('')
  // const [result, setResult] = useState({});


  // hacer funcion que recargue la página y 
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

    if (rating === 0){
      setMsg('* Choose your rating')
    } else if (!review.description) {
      setMsg('* write your review')
    } else {
      
      let result = {...review, rating,user,researcher}
      console.log('result', result);
      const resultFinal = fetchData2('review/createreview','post',result)
      closeModal();
      console.log("------", result);
    }
   }
  
  //  console.log('researcher on reviewModal', researcher);
  //  console.log('user on reviewModal', user);
   console.log('review.text on reviewModal', review.text);
   

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
        <StarRating 
          maxStars={5} onRatingSelect={handleRatingSubmit} 
          rating = {rating} 
          setRating={setRating}
        />
        {msg && <p className='errorMsg'>{msg}</p>}
        <div className='buttons'>
          <button onClick={onSubmit}>Submit</button>
          <button className='cancel' onClick={closeModal}>Cancel</button>
        </div>
        </form>
    </div>

  )
}




