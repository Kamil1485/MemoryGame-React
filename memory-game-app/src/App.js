import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./Components/Card.js";
import GameOver from "./Components/GameOver";
import cardImages from "./CardImages";
function App() {
    
  //1-Önce  kartların tümünü ve  kopyasını içeren bir degisken olustur.
  const [cards, setCards] = useState([]); //3- rasgtele oluşan kartlar dizisini cards state ile takip et.
  const [turns, setTurns] = useState(0); //4-score bilgisini tutan state.
  const [choiceOne, setChoiceOne] = useState(null); //7-kullanıcının secimlerini tutan  stateler.
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false); //2 den fazla secimi hızlıca yapılmaması için
  const [cardPair, setCardPair] = useState(2); //Kullanıcı cart çifti sayısı belirleyebilmesi için;
  const [gameCount, setGameCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selectedOption, setSelectedOption] = useState("oyun"); //Başlangıçta ilk seçeneğin değerini içermeli
  const [pair,setPair]=useState(0);
  console.log(selectedOption)

  useEffect(() => {
    if (pair === parseInt(cardPair) && pair !== 0) {
      setGameCount(0);
      setPair(0);
      setGameOver(true);
      }
       
  }, [gameCount,pair, cardPair]);

  const shuffleCards = (katergori) => {

    const shuffledCards3 = [...cardImages].filter((card)=>card.category===katergori)
    console.log(shuffledCards3)
    //? 2-Sort ile her bir kartın yerini rasgele degistir,map ile yeni bir obje döndür,tüm cartları ve id özelliği içeren bir objeyi.
    if(katergori ){
    const shuffledCards2 = [...cardImages].filter((card)=>card.category===katergori).sort(() => Math.random() - 0.5);
    const randomshuffledCards = [
      ...shuffledCards2.slice(0, cardPair),
      ...shuffledCards2.slice(0, cardPair),
    ]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    /*

    const shuffledCards = [...cardImages.slice(0,cardPair), ...cardImages.slice(0,cardPair)]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
   */
  
    //22-
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(randomshuffledCards);
    setTurns(0);
  };
  console.log(cards);
  }
  const handleChoice = (card) => {
    //9
    //11 Eğer ilk secim boş deger ise, secilen cardı ilk secime ata dolu oldugunda ise ikinciye ata
    //23- Hızlıca 2 defa aynı carda tıklanınca otomatik eşini buluyor engellemek için her cartın id si farklıydı id ye göre kıyaslıyacagız choceOne ve ChoiceTwo
    if (card.id === choiceOne?.id) {
      return;
    }
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);

    /*
if(!choiceOne){
  setChoiceOne(card)
}
else{
  setChoiceTwo(card)
}
*/
  };
  
  useEffect(() => {
    //12-Karşılaştırma işlemi

    if (choiceOne && choiceTwo) {
      //2 secimde yapıldıysa karşılaştırmaya başla
      //19-
      setGameCount((prev)=>prev+1);
      setDisabled(true);

      if (choiceOne.name === choiceTwo.name) {
        setPair((prev)=>prev+1);
        setCards((prevCards) => {
          
          return prevCards.map((cardItem) => {
            //^ 14-Tüm kartları içinden(cards) seçilen kartı arıyoruz 2 adet eşleşme olacak bunların matched değerini true yapıyoruz kalanlarda değişiklik yokk
            //choiceOne ve choiceTwo aynı hangisini sectiğinin önemi yok if şartında
            if (cardItem.name === choiceOne.name) {
              return { ...cardItem, matched: true }; //  return {...cardItem,matched:!cardItem.matched}
            } else {
             
              return cardItem;
            }
          });
        });
        resetTurn();
      } else {
        //17-
        setTimeout(() => {
          resetTurn(); //13
        }, 1000);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choiceOne, choiceTwo]);
console.log(pair)

  console.log(cards);
  const resetTurn = () => {
    //13- Karşılaştırma Sonrası stateler boşaltılmalı,yeni karşılaştırma yapabilmek için.
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1); //Score değerini 1 arttırıyoruz her bu fonksiyon calıstıgında, resetTurn fonskiyonu sadece 2 metot karşılaşması bitince çalışıyor.
    //21-resetTurn cagrılana kadar herhangi bir secim islemi yapamaz kullanıcı
    //resetTurn her iki card arası eşleşme işlemi sonrası veya eşleşme olmadıysa hemen cagrılıyordu.
    setDisabled(false);
  };
    //21-Sayfa Yüklenir Yüklenmez shuffle fonksiyonu çalışmalı yani oyun başlamalı.
 
 

  const restartGame=()=>{
    setGameOver(false);
    setGameCount(0);
    setPair(0);
    shuffleCards();
    }

    const handleChange = (event) => {
      setSelectedOption(event.target.value);
   
    };
 
  
    const handleSubmit= (event) => {
      event.preventDefault();
      shuffleCards(selectedOption)
      restartGame();
    }
    
  
    console.log(gameOver)
    
    const handleInput=(e)=>{
      setCardPair(e.target.value);
    }
    console.log(gameOver)
    console.log(gameCount)
    console.log(cardPair)
  return (
    <div className="App">
      
        <div>
        {gameOver ? <GameOver turns={turns} cardPair={cardPair} handleSubmit={handleSubmit}/>:(
<>
    <h1>Hafıza Oyunu</h1>
          <form >
          <div>Kategori Belirleyiniz</div>
          <div>
            <select onChange={handleChange} required >
              <option  value="oyun">Oyun</option>
              <option value="giysi" >Giyim</option>
            </select>
          </div>

          <div className="cardPair">
            <h2>Cart Destesi Miktarı</h2>
            <input
            required
              type="number"
              min="2"
              max={cardImages.length}
              placeholder="Kart Çifti"
              value={cardPair}
              onChange={(e)=>handleInput(e)}
            />
           
          </div>
      <button type="submit" style={{color:"orange"}}  onClick={handleSubmit}>{gameOver ? "Yeniden Başlat":"Başlat"}</button>
          </form>
          <div className="card-grid">
            {cards.map((card) => {
              //5-card componenti oluştur, tek tek kartları props olarak gönder.
              return (
                //**15-Kartları ters çevirme işlemi flipped propsuna, tıklanan cardın map ile gezilen cardlardan  hangisiyle eşleşiyorsa onun flipped ozelliğini true yapacağız.Eşleşme yoksa iki cartıda döndürmeyeceğiz */
                <Card
                  key={card.id}
                  card={card}
                  handleChoice={handleChoice}
                  flipped={
                    card === choiceOne || card === choiceTwo || card.matched
                  }
                  disabled={disabled}
                />
                /* 18- disabled özelliği ekle,
                2 kart seciminden sonra belli bir süre secim yapılamasın,
                choiceone ve choicetwo hangisi değiştiği bazen yakalanamadığından  */
              );
            })}
          </div>
          <div>Score:{turns}</div>
          <div>Başarı Dur:{2*cardPair}</div>
         
</>
          
        )}
         
       
        </div>
    </div>
  );
}

export default App;
/* {/*<Card key={card.id} src={card.src} name={card.name} id={card.id}/>*/
