<h1>Hafıza Oyunu</h1>
<div className="cardPair">
  <h2>Cart Destesi Miktarı</h2>
  <input type="number"  min="2" max="10" placeholder="Cart Destesi Giriniz" value={cardPair} onChange={(e)=>setCardPair(e.target.value)}/>
<button  className="btn" style={{color:"green",background:"white"}} onClick={shuffleCards}>Onayla</button>
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