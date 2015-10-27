/**
 * Card
 * 
 * A standard playing card consisting of one of four suits (c, d, h, s)
 * and one of thirteen ranks (A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K)
 */

var Card = function (rank, suit) {
	if (this.ranks.indexOf(rank) === -1) {
		throw new Error ("Invalid rank");
	}
	
	if (this.suits.indexOf(suit) === -1) {
		throw new Error ("Invalid suit");
	}
	
	this.rank = rank;
	this.suit = suit;
};

Card.prototype.suits = ['c', 'd', 'h', 's'];

Card.prototype.ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

Card.prototype.toString = function() {
	return this.rank + this.suit;
};

Card.clone = function(obj) {
	var card = new Card(obj.rank, obj.suit);
	return card;
};

module.exports = Card;