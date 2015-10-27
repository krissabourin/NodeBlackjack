//imports the Card module into the current file
var Card = require('./card.js');

/**
 * A standard 52 Card deck consisting of one of each 
 * combination of rank and suit 
 */
var Deck = function() {
	
	this.cards = [];
	var self = this;

	//populates the deck with one of each card
	Card.prototype.suits.forEach (function (suit) {
		Card.prototype.ranks.forEach (function (rank) {
			self.cards.push(new Card (rank, suit));
		});
	});
};

/**
 * Draws a card off the top
 */
Deck.prototype.draw = function () {
	return this.cards.pop();
};

/**
 * Fisher-Yates shuffle as per Mike Bostock (http://bost.ocks.org/mike/shuffle/)
 */
Deck.prototype.shuffle = function () {
	var m = this.cards.length;
	var t, i;
	
	while (m) {
		//pick a remaining card
		i = Math.floor(Math.random() * m--);
		
		//and swap with the current card
		t = this.cards[m];
		this.cards[m] = this.cards[i];
		this.cards[i] = t;
	}
	return this;
};

//produces a clone of the Deck as unfortunately when we pull a Deck object from the
// session, the data is all there but the methods don't work.
Deck.clone = function (obj) {
	var deck = new Deck();
	deck.cards = [obj.cards.length];
	for (var i = 0; i < obj.cards.length; i++) {
		deck.cards[i] = Card.clone(obj.cards[i]);
	}
	return deck;
};

// export the module so that it can be imported (require()) elsewhere.
module.exports = Deck;
