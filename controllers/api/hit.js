var Game = require('../../models/game.js');
var Hand = require('../../models/hand.js');
var router = require('express').Router();

router.post('/', function(req, res, next) {
	var session = req.session;
	
	//check to see if we're trying to hit before the deal
	if (session.game === null) {
		res.status(400).json("{ message: HIT action is not available at this time }");
	} else {
		var game = Game.clone(session.game);
		
		game.playerHand.hit(game.deck.draw());
	
		//if the player busts, run out the rest of the dealer hand
		if (game.playerHand.isBusto()) {
			do {
				game.dealerHand.hit(game.deck.draw());
			} while (game.dealerHand.score() < Hand.DEALER_STAND);
		}
		
		//put the game into the session for the next interaction
		session.game = game;
		
		// if the player busts, let them know they lost
		var message = game.getGamestate();
		if (game.playerHand.isBusto()) {
			message += " Bust! You lose $" + game.bet;
			// and clear the game from the session
			session.game = null;
		}
		
		res.status(200).json("{ message: " + message + " }");
	}
});

module.exports = router;
