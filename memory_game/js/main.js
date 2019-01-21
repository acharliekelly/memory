
var deck = ["queen-of-diamonds", "queen-of-hearts", "king-of-diamonds", "king-of-hearts"];
var cardsInPlay = [];


var createBoard = function() {
	for (var i=0; i<deck.length; i++) {
		var cardElement = document.createElement('img');
		cardElement.setAttribute('src', "images/back.png");
		cardElement.setAttribute('data-id', i);
		cardElement.setAttribute('data-name', deck[i]);
		cardElement.addEventListener('click', flipCard);
		document.getElementById('game-board').appendChild(cardElement);
	}
}

var flipCard = function() {
	var src = "images/" + this.getAttribute('data-name') + ".png";
	this.setAttribute('src', src);
	cardsInPlay.push(this);
	checkWin();
}

var getRank = function(cardElement) {
	var cardName = cardElement.getAttribute('data-name');
	var n = cardName.indexOf("-");
	return cardName.substring(0, n);
}

var checkWin = function() {
	if (cardsInPlay.length === 2) {
		if (getRank(cardsInPlay[0]) == getRank(cardsInPlay[1])) {
			// you win
			setTimeout(function(){
				alert("You Win!");
				resetCards();
			}, 1000);
			
		} else {
			// you lose
			setTimeout(resetCards, 2000);

		}
		
	} 
	// otherwise do nothing
}

var resetCards = function() {
	document.querySelectorAll("#game-board img").forEach(function(img){
		img.setAttribute('src', 'images/back.png');

	});
	cardsInPlay = [];
}

createBoard();


