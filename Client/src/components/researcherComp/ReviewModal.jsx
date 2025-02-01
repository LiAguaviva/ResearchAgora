import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import StarRating from '../usersComp/StarRating';
import { fetchData2 } from '../../helpers/axiosHelper';


const handleRatingSubmit = (rating) => {
};

export const ReviewModal = ({show,setShow, researcher,user}) => {
  const navigate = useNavigate();
  const [review, setReview ]= useState({})
  const [rating, setRating] = useState(0)
  const [msg, setMsg] = useState('')
  // const [result, setResult] = useState({});


  const closeModal = () => {
    setShow(!show)
  }

  const handleChange = (e) => {
   const {name, value} = e.target;
   setReview({...review, [name]: value })
  }
  
   const onSubmit = async(e) => {
    e.preventDefault();
    // setResult({...result, review, rating})
    // setResult((prevResult) => ({...prevResult, review, rating}));

    let result = {...review, rating,user,researcher}
    
    if (rating === 0){
      setMsg('* Choose your rating')
    } else if (!review.description) {
      setMsg('* write your review')
    } else {

    try {
      await fetchData2('review/createreview', 'post', result);
      closeModal();
    } catch (error) {
      setMsg(error.response?.data?.message);
    }
  }
  };
  

   

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
            value={review?.text || ""}
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




