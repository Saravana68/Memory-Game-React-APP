/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import SingleCard from './Components/SingleCard';
import './App.css';

import helmet from './Images/helmet-1.png';
import potion from './Images/potion-1.png';
import ring   from './Images/ring-1.png';
import scroll from './Images/scroll-1.png';
import shield from './Images/shield-1.png';
import sword  from './Images/sword-1.png';
import cover  from './Images/cover.png';

const cardImages = [
	{ src: helmet, matched: false, name: 'helmet-1' },
	{ src: potion, matched: false, name: 'potion-1' },
	{ src: ring,   matched: false, name: 'ring-1' },
	{ src: scroll, matched: false, name: 'scroll-1' },
	{ src: shield, matched: false, name: 'shield-1' },
	{ src: sword,  matched: false, name: 'sword-1' }
];

function App() {

  
	const [ cards, setCards ] = useState([]);
	const [ turns, setTurns ] = useState(0);
	const [ choiceOne, setChoiceOne ] = useState(null);
	const [ choiceTwo, setChoiceTwo ] = useState(null);
	const [ disabled, setDisabled ] = useState(false);

	// returns dozen of shuffled cards 
  const shuffleCards = () => {     
		const FinalCards = [ ...cardImages, ...cardImages ]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({ ...card, id: Math.random() }));

		console.log(FinalCards);
		setChoiceOne(null);
		setChoiceTwo(null);
		setCards(FinalCards);
		setTurns(0);
  };
  
  
  // calling shuffleCards() automatically when site Loaded or Refreshed
  useEffect(() => { shuffleCards(); }, []);     

  
 // Responsible for storing card selected by user
	const handleChoice = (card) => {
		// console.log(card);
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
	};

  // whenever user selects  two card it compares them & shows result i.e if same then no more covered else covered back 
	useEffect( () => {
			if (choiceOne && choiceTwo) {
				setDisabled(true);
        if (choiceOne.name === choiceTwo.name) {
          console.log('cards matched -', choiceOne.name);
          setCards((prevCards) => {
            return prevCards.map((card) => {
              if (card.name === choiceOne.name)
                return { ...card, matched: true };
              else return card;
            });
          });
          resetTurn();
        }
        else {
          setTimeout(() => {
            resetTurn();
          }, 1000);
        }
      }
		},  [ choiceOne, choiceTwo ]
	);

// when one turn completed it sets the state to ready for storing upcoming two cards	
	const resetTurn = () => {
		console.log('resetTurn called');
		setDisabled(false);
		setChoiceOne(null);
		setChoiceTwo(null);
		setTurns((prevTurns) => prevTurns + 1);
	};

	return (
		<div className="App">
			<h1 className="header ">Magic Match</h1>
      <button className="newgame-button"
        onClick={shuffleCards}> New Game
      </button>
			<div className="card-grid">
				{cards.map((card) => (
					<SingleCard
						cover={cover}
						key={card.id}
						handleChoice={handleChoice}
						disabled={disabled}
						card={card}
						flipped ={card === choiceOne || card === choiceTwo || card.matched}
					/>
				))}
			</div>
			<h1 className="footer"> Number of Turns - {turns}</h1>
			<h2>Made with ❤️ by Saravanakumar</h2>
		</div>
	);
}

export default App;
