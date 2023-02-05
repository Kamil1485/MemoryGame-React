import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./memory-game-app/src/Components/Card.js";
const cardImages = [
  { src: "/img/a.png" ,name:"a"   ,matched:false},
  { src: "/img/b.png" ,name:"b"   ,matched:false},
  { src: "/img/c.png"   ,name:"c"   ,matched:false},
  { src: "/img/d.png"   ,name:"d"   ,matched:false},
  { src: "/img/e.png"   ,name:"e"   ,matched:false},
  { src: "/img/f.png"   ,name:"f"   ,matched:false},
  { src: "/img/g.png"   ,name:"g"   ,matched:false},
  { src: "/img/h.png"   ,name:"h"   ,matched:false},
];
function App2() {
  //1-Önce  kartların tümünü ve  kopyasını içeren bir degisken olustur.
  const [cards, setCards] = useState([]); //3- rasgtele oluşan kartlar dizisini cards state ile takip et.
  const [turns, setTurns] = useState(0); //4-score bilgisini tutan state.
  const[choiceOne,setChoiceOne]=useState(null);//7-kullanıcının secimlerini tutan  stateler.
  const[choiceTwo,setChoiceTwo]=useState(null);
  const[disabled,setDisabled]=useState(false); //2 den fazla secimi hızlıca yapılmaması için 
  const[cardPair,setCardPair]=useState(cardImages.length);
  console.log(cards);

  const shuffleCards = () => {
    //? 2-Sort ile her bir kartın yerini rasgele degistir,map ile yeni bir obje döndür,tüm cartları ve id özelliği içeren bir objeyi.
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    if (shuffledCards.length === 2 * cardImages.length) {
      //22-
   setChoiceOne(null);
   setChoiceTwo(null);
      setCards(shuffledCards);
      setTurns(0);
    }
  };
  console.log(cards);

const handleChoice=(card)=>{//9
//11 Eğer ilk secim boş deger ise, secilen cardı ilk secime ata dolu oldugunda ise ikinciye ata

//23- Hızlıca 2 defa aynı carda tıklanınca otomatik eşini buluyor engellemek için her cartın id si farklıydı id ye göre kıyaslıyacagız choceOne ve ChoiceTwo 
if(card.id === choiceOne?.id){
  return;
}
choiceOne ?setChoiceTwo(card):setChoiceOne(card);


/*
if(!choiceOne){
  setChoiceOne(card)
}
else{
  setChoiceTwo(card)
}
*/
}
useEffect(()=>{//12-Karşılaştırma işlemi
  
 
if(choiceOne&&choiceTwo){//2secimde yapıldıysa karşılaştırmaya başla
  //19-
  setDisabled(true);

  if(choiceOne.name===choiceTwo.name){
 setCards(prevCards=>{
  return prevCards.map((cardItem)=>{//^ 14-Tüm kartları içinden(cards) seçilen kartı arıyoruz 2 adet eşleşme olacak bunların matched değerini true yapıyoruz kalanlarda değişiklik yokk
    //choiceOne ve choiceTwo aynı hangisini sectiğinin önemi yok if şartında
    if(cardItem.name===choiceOne.name){
      return {...cardItem,matched:true} //  return {...cardItem,matched:!cardItem.matched}
    }
else{
  return cardItem;
}
  })
 })
 resetTurn();
  }
  else{
  //17-
  setTimeout(() => {
    resetTurn();//13 
  }, 1000);
   
  }

}
},[choiceOne,choiceTwo])

console.log(cards)
const resetTurn=()=>{//13- Karşılaştırma Sonrası stateler boşaltılmalı,yeni karşılaştırma yapabilmek için.
  setChoiceOne(null);
  setChoiceTwo(null);
  setTurns(prev=>prev+1);//Score değerini 1 arttırıyoruz her bu fonksiyon calıstıgında, resetTurn fonskiyonu sadece 2 metot karşılaşması bitince çalışıyor.
//21-resetTurn cagrılana kadar herhangi bir secim islemi yapamaz kullanıcı
//resetTurn her iki card arası eşleşme işlemi sonrası veya eşleşme olmadıysa hemen cagrılıyordu.
setDisabled(false);
}
console.log(choiceOne)
console.log(choiceTwo);

//21-Sayfa Yüklenir Yüklenmez shuffle fonksiyonu çalışmalı yani oyun başlamalı
useEffect(()=>{
  shuffleCards();
},[])
  return (
    <div className="App">
      <h1>Hafıza Oyunu</h1>
      <div>
        <h2>Cart Destesini Değiştir</h2>
        <input type="text" />
        <button>Kaydet</button>
      </div>
      <button onClick={shuffleCards}>Yeni Oyun</button>
      <div className="card-grid">
        {cards.map((card) => {//5-card componenti oluştur, tek tek kartları props olarak gönder.
          return (//**15-Kartları ters çevirme işlemi flipped propsuna, tıklanan cardın map ile gezilen cardlardan  hangisiyle eşleşiyorsa onun flipped ozelliğini true yapacağız.Eşleşme yoksa iki cartıda döndürmeyeceğiz */
          <Card key={card.id} card={card} handleChoice={handleChoice}
          flipped={card===choiceOne || card===choiceTwo ||card.matched }
          disabled={disabled}
       
           />
       /* 18- disabled özelliği ekle,2 kart seciminden sonra belli bir süre secim yapılamasın,choiceone ve choicetwo hangisi değiştiği bazen yakalanamıyor   */
          );
        })}
      </div>
      <div>
        Score:{turns}
      </div>
    </div>
  );
}

export default App2;
/* {/*<Card key={card.id} src={card.src} name={card.name} id={card.id}/>*/ 