import React from "react";

const GameOver = ({ turns,cardPair,handleSubmit}) => {
  
  return (
    <div className="gameOver">
       <div> <h1>Oyun Bitti</h1></div>
      <div>

        <h2>{turns<=2*cardPair ?`Tebrikler ${cardPair} desteyi ${turns} adımda bitirdiniz`:`Maalesef ${cardPair} desteyi ${turns} adımda bitirdiniz`}</h2>
      </div>
      <div>
      <button className="btn-restart" onClick={(handleSubmit)}>Tekrar Oyna</button>
      </div>
    </div>
  );
};

export default GameOver;
