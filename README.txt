CardLotteryTrade contract

DESCRIPTION
This contract allows a user to create a collection, deterministically increase counts of unique indices in
the collection, delete counts of unique indices in the collection, and trade counts of unique indices in
the collection.

ERRORS
The solidity function sendCard() may exceed the gas limit with a larger deck of unique cards, but the basics 
of every function works.

TESTING AND DEPLOYMENT
This was originally tested on Ganache CLI with the command "ganache-cli --port 8545 --accounts 4 --seed
project". It is now deployed on the Rinkeby (Ethereum) network.
