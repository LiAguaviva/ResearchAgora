import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import StarRating from '../usersComp/StarRating';
import { fetchData2 } from '../../helpers/axiosHelper';


const handleRatingSubmit = (rating) => {
};

export const ReviewModal = ({show,setShow, researcher,user,setReview}) => {
  const navigate = useNavigate();
  const [review1, setReview1 ]= useState({})
  const [rating, setRating] = useState(0)
  const [msg, setMsg] = useState('')

  const [refresh, setRefresh] = useState(false);


  const closeModal = () => {
    setShow(!show)
  }

  const handleChange = (e) => {
   const {name, value} = e.target;
   setReview1({...review1, [name]: value })
  }
  
  const onSubmit = async (e) => {
    e.preventDefault();
    let newReview = { ...review1, rating, user, researcher };
  
    if (rating === 0) {
      setMsg("* Choose your rating");
    } else if (!review1.description) {
      setMsg("* Write your review");
    } else {
      try {
        const response = await fetchData2("review/createreview", "post", newReview);
        
        // add new review to the state without reload page 
        setReview((prevReviews) => [newReview, ...prevReviews]);
  
        closeModal();
      } catch (error) {
        const errorMsg = error.response?.data?.message || "";
        if (errorMsg.includes("Duplicate entry")) {
          setMsg("You have already reviewed this user before.");
        } else {
          setMsg(errorMsg || "Review creation failed");
        }
      }
    }
  };
  
  

   

  return (
    
    <div className='modalContainer'>
        <form className='verificationModal'>
        <h4>Write a Review</h4>
        <fieldset className="textareaBig">
          <textarea
            className='reviewTextarea'
            id="description"
            type="text"
            placeholder="Write Your Review"
            value={review1?.description || ""}
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




