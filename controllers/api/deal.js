var Game = require('../../models/game.js');
var Hand = require('../../models/hand.js');
var router = require('express').Router();

router.post('/', function(req, res, next) {
	var session = req.session;
	
	//check to see if deal has already been called
	if (req.session.game) {
		res.status(400).json("{ message: DEAL action is not available at this time }");
	} else {
		
		//create a new game
		var game = new Game(req.body.bet);
		
		//deal two Cards to the player
		game.playerHand.hit(game.deck.draw());
		game.playerHand.hit(game.deck.draw());
		
		//deal one Card to the dealer
		game.dealerHand.hit(game.deck.draw());
		
		//if the player has a blackjack, run the dealer hand out
		if (game.playerHand.isBlackjack()) {
			do {
				game.dealerHand.hit(game.deck.draw());
			} while (game.dealerHand.score() < Hand.DEALER_STAND);
		}
		
		//put the game into the session for the next interaction
		session.game = game;
		
		var message = game.getGamestate();
		if (game.playerHand.isBlackjack()) {
			message += "Blackjack! You win $" + (game.bet * 3)/2;
		}
		
		res.status(200).json("{ message: " + message + " }");
	}
});

module.exports = router;