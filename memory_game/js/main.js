
const USE_LOCAL_IMAGES = true;


var deck = ["jack-diamonds","queen-diamonds","king-diamonds","ace-diamonds",
			"jack-clubs","queen-clubs","king-clubs","ace-clubs",
			"jack-hearts","queen-hearts", "king-hearts","ace-hearts",
			"jack-spades","queen-spades","king-spades","ace-spades"];
var cardsInPlay = [];


/**
 * lookup image source from cloud storage
 */
var imgSrcLookup = function(cardName) {
  if (cardImgSrc) {
    return cardImgSrc[cardName];
  } else {
    console.log('missing file: flickr-img.js');
    return '';
  }
}

/**
 * get image path
 */
var getImagePath = function(cardName) {
  var src = "";
  if (USE_LOCAL_IMAGES) {
    src = "images/" + cardName + ".jpg";
  } else {
    src = imgSrcLookup(cardName);
  }
  return src;
}


var getBackImage = function() {
	return getImagePath('back');
}


/**
 * flip a card over
 */
var flipCard = function() {
	var src = getImagePath(this.getAttribute('data-name'));
	this.setAttribute('src', src);
	this.className = 'flipped';
	cardsInPlay.push(this);
	checkMatch();
}

/**
 * check if flipped cards match
 */
var checkMatch = function() {
	if (cardsInPlay.length === 2) {
		var rank1 = cardsInPlay[0].getAttribute('data-rank');
		var rank2 = cardsInPlay[1].getAttribute('data-rank');
		if (rank1 == rank2) {
			// match found
			setTimeout(matchFound, 1000);
			
		} else {
			// no match
			setTimeout(noMatch, 1000);
		}
		
	} 
	
	if (isWin()) {
		
		var matchElem = document.querySelector("#match");
		matchElem.className = 'show';
		matchElem.innerHTML = "YOU WIN!!"

	}
}


/**
 * check if win condition is met
 */
var isWin = function() {
	var foundCards = document.querySelectorAll("img.matched");
	return (foundCards.length == deck.length);
}

/**
 * turn cards back over after failing to find match
 */
var noMatch = function() {
	matchCondition(false);
}

/**
 * let player know that match was found
 */
var matchFound = function() {
	matchCondition(true);
}

/**
 * change board based on whether match was found
 */
var matchCondition = function(boolMatch) {
	// only show if found - otherwise just annoying
	if (boolMatch)
		showMatchMessage(boolMatch);

	setTimeout(function(){
		hideMatchMessage();
		clearInPlay(boolMatch);
	}, 1000);
}

var clearInPlay = function(boolMatch) {
	while (cardsInPlay.length > 0) {
		var cardElement = cardsInPlay.pop();
		if (boolMatch) {
			// match was found
			cardElement.classList.add('matched');
			cardElement.removeEventListener('click', flipCard);
		} else {
			// no match
			cardElement.classList.remove('flipped');
			cardElement.setAttribute('src', getBackImage());
		}
	}
}

/**
 * show message indicating match found
 */
var showMatchMessage = function(boolMatch) {
	var matchElem = document.querySelector("#match");
	matchElem.className = 'show';
	setTimeout(hideMatchMessage, 2000);
	matchElem.innerHTML = boolMatch ? "Match Found!" : "No Match";
}

var hideMatchMessage = function() {
	var matchElem = document.querySelector("#match");
	matchElem.className = '';
	matchElem.innerHTML = 'No Match';
}

/**
 * re-create the board
 */
var resetBoard = function() {
	document.getElementById('game-board').innerHTML = "";
	createBoard();
}

/**
 * shuffle the deck
 */
var shuffle = function() {
	// based on Fisher-Yates algorithm
	var currentIndex = deck.length;
	var temporaryValue, randomIndex;

	// while there are elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// swap it with current element
		temporaryValue = deck[currentIndex];
		deck[currentIndex] = deck[randomIndex];
		deck[randomIndex] = temporaryValue;
	}
}


/**
 * initialize the board
 */
var createBoard = function() {
	shuffle();
	for (var i=0; i<deck.length; i++) {
		var cardName = deck[i];
		var dash = cardName.indexOf('-');
		var rank = cardName.substring(0,dash);
		var suit = cardName.substring(dash+1);
		var cardElement = document.createElement('img');
		cardElement.setAttribute('src', getBackImage());
		cardElement.setAttribute('data-id', i);
		cardElement.setAttribute('data-name', cardName);
		cardElement.setAttribute('data-rank', rank);
		cardElement.setAttribute('data-suit', suit);
		cardElement.addEventListener('click', flipCard);
		document.getElementById('game-board').appendChild(cardElement);
	}
	
	
}


var init = function() {
	var $resetBtn = document.querySelector('#resetBtn');
	$resetBtn.addEventListener('click', resetBoard);

	createBoard();
}

init();