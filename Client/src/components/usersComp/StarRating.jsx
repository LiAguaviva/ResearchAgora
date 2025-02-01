import React, { useState } from "react";
 
function StarRating({ maxStars = 5, onRatingSelect ,rating,setRating}) {
    const [hoverRating, setHoverRating] = useState(0); 
 
    const handleClick = (value) => {
        setRating(value); 
        if (onRatingSelect) onRatingSelect(value);
    };
 
    const handleMouseEnter = (value) => setHoverRating(value); 
    const handleMouseLeave = () => setHoverRating(0); 
 
    return (
<div>
            {Array.from({ length: maxStars }, (_, index) => {
                const starValue = index + 1; 
                return (
<span
                        key={index}
                        style={{
                            color: starValue <= (hoverRating || rating) ? "gold" : "gray",
                            fontSize: "30px",
                            cursor: "pointer",
                        }}
                        onClick={() => handleClick(starValue)} 
                        onMouseEnter={() => handleMouseEnter(starValue)} 
                        onMouseLeave={handleMouseLeave} 
>
                        ★
</span>
                );
            })}
</div>
    );
}
 
export default StarRating;