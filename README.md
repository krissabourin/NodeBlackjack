# NodeBlackjack
An HTTP API for playing blackjack implemented with Node.js

USAGE

Starting the Server:
1. Open a terminal and navigate into the root of the Blackjack application.
2. Run 'nodemon server.js' (if nodemon is not installed run 'npm install -g nodemon).
3. Server should start as localhost and listen on 8888

Setup:
Blackjack uses session cookies to persist gamestate between requests (a more robust system
might persist gamestate in a db).
1. To get curl to use cookies, run 'curl --cookie-jar cookies localhost:8888/api'
2. ignore 'Cannot GET /api' message

Playing Blackjack:
1. Start with a DEAL command like so:
'curl -v -H "Content-Type: application/json" -XPOST --cookie cookies --data "{\"bet\":\"100\"}" localhost:8888/api/deal'
Note that cookie is used and bet is set in the --data json

2. Note the message in the response of the advises available actions of: doubledown, hit, or stand. Use the following curl commands respectively:

DOUBLEDOWN:
curl -v -H "Content-Type: application/json" -XPOST --cookie cookies localhost:8888/api/doubledown'

HIT:
curl -v -H "Content-Type: application/json" -XPOST --cookie cookies localhost:8888/api/hit

STAND:
curl -v -H "Content-Type: application/json" -XPOST --cookie cookies localhost:8888/api/hit


Have fun! Please tip your dealer!