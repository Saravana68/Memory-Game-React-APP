import React from 'react'
import './SingleCard.css';

function SingleCard({ card, handleChoice, cover, disabled ,flipped }) {
	

	const handleClick = () => {
		if (!disabled) {
			handleChoice(card);
		}
     }

     


  return (
	  <div className="card">
		  <div className={flipped ? "flipped" : ""}>
			  <img className="front" src={card.src} alt="img" />
			  <img className="back"
				   onClick ={handleClick}
				   src={cover} alt="img" />
		  </div>
	</div>
  )
}

export default SingleCard



