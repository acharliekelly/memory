
const RANKS = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];
const SUITS = ["Clubs", "Diamonds", "Hearts", "Spades"];
const NUMBER_OF_SUITS = 4;
const NUMBER_OF_RANKS = 13;

function rankName(rankIndex) {
	return RANKS[rankIndex];
}
function suitName(suitIndex) {
	return SUITS[suitIndex];
}

class Card {

	constructor(rank, suit) {
		this.rank = rank;
		this.suit = suit;
	}

	getName() {
		return rankName(this.rank) + " of " + suitName(this.suit);
	}

	// image src (if there were one image for each card)
	getImageSrc() {
		return "images/" + this.rankName().toLowerCase() + "_" + this.suitName().toLowerCase() + ".png";
	}

	// image background position
	getBkgPosition() {
		// TODO: calculate position on standard-deck.png
		// each card is 167x240, deck is 2178x976 (13x4)
		var leftPos = (this.rank + 1) * 167;
		var topPos = (this.suit + 1) * 240;
		return leftPos + ' ' + topPos; 
	}
}


class Deck {

	// generate deck of 52 cards in sequential order
	constructor() {
		this.cards = Array();

		for (var iSuit = 0; iSuit < NUMBER_OF_SUITS; iSuit++) {
			for (var iRank = 0; iRank < NUMBER_OF_RANKS; iRank++) {
				var nextCard = new Card(iRank, iSuit);
				this.cards.push(nextCard);
			}
		}

	}

	shuffle() {
		// based on Fisher-Yates algorithm
		var currentIndex = this.cards.length;
		var temporaryValue, randomIndex;

		// while there are elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// swap it with current element
			temporaryValue = this.cards[currentIndex];
			this.cards[currentIndex] = this.cards[randomIndex];
			this.cards[randomIndex] = temporaryValue;
		}
	}

}


class Layout {

	constructor(rows, columns) {
		this.numRows = rows;
		this.numColumns = columns;
		this.grid = [numRows][numColumns];
	}

	arrange(deck) {
		var cardIndex = 0;
		for (var rowCounter=0; rowCounter<this.numRows; rowCounter++) {
			for (var colCounter=0; colCounter<this.numColumns; colCounter++) {
				var currentCard = deck.cards[cardIndex];
				this.grid[rowCounter][colCounter] = currentCard;
			}

		}
	}

	getCard(rowIndex, colIndex) {
		return this.grid[rowIndex][colIndex];
	} 
}



