// var cards = ["queen", "queen", "king", "king"];

var cardsInPlay = [];


// var cardOne = cards[0];
// cardsInPlay.push(cardOne);

// var cardTwo = cards[1];
// cardsInPlay.push(cardTwo);


// if (cardsInPlay.length === 2) {
// 	// user flipped two cards
// 	if (cardsInPlay[0] == cardsInPlay[1]) {
// 		alert("You found a match!");
// 	} else {
// 		alert("Sorry, try again.");
// 	}
// }

function checkWin() {
	if (cardsInPlay.length === 2) {
		if (getCardType(cardsInPlay[0]) == getCardType(cardsInPlay[1])) {
			// you win
			alert("You Win!!");
			resetCards();
		} else {
			// you lose
			setTimeout(resetCards, 2000);

		}
		
	} 
	// otherwise do nothing
}

function getCardType(cardElement) {
	var idStr = cardElement.getAttribute('id');
	var dashIdx = idStr.indexOf("-");
	return idStr.substr(0, dashIdx);
}

document.querySelectorAll("img.card").forEach(function(item){
	item.addEventListener('click', function(){
		if (this.classList.contains('flipped')) {
			// already flipped - do nothing
		} else {
			this.classList.remove('card');
			this.classList.add('flipped');
			var frontSrc = "images/" + this.getAttribute('id') + ".png";
			this.setAttribute('src', frontSrc);
			cardsInPlay.push(this);
			checkWin();
		}
	});
});

function resetCards() {
	document.querySelectorAll("#game img").forEach(function(item){
		item.classList.remove('flipped');
		item.classList.add('card');
		item.setAttribute('src', "images/back.png");
	});
	cardsInPlay = [];
}



