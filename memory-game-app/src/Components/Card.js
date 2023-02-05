import React,{useState}from 'react';

const Card = ({card,handleChoice,flipped,disabled}) => {//6- cardların  özelliklerini kullan.
    const handleClick=()=>{//10 arka yüz foto tıklandıgında  handleChoice fonksiyonuna tıklanan cartın bilgilerini gönderiyoruz.
   //20
   if(!disabled){
    handleChoice(card)
   }

   }
    return (//16
        <div className="card">
              <div className={flipped?"flipped":""}>
                <img src={card.src} className="front" alt="card front"  onClick={handleClick}/>
                <img src="/img/arkaplan.png" className="back" alt=" card back"  onClick={handleClick}/>
              </div>
          
            </div>
    );
}

export default Card;
