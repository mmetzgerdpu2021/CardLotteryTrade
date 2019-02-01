pragma solidity ^0.4.11;

contract CardLotteryTrade {
    address private owner;
    uint256 constant private UNIQUECARDS = 10;
    mapping (address => uint256[UNIQUECARDS]) public cardOwners;

    function CardLotteryTrade() public{
        owner = msg.sender;
        
    }
    
    function totalNumOfCards () view public returns (uint256) {
        uint256[UNIQUECARDS] memory tempArray = cardOwners[msg.sender];
        uint256 j = 0;
        for (uint256 i = 0; i < UNIQUECARDS; i++){
            j = j + tempArray[i];
        }
        return j;
    }

    function numOfUniqueCard (uint256 cardIndex) view public returns (uint256) {
	return cardOwners[msg.sender][cardIndex];
    }
    
    function getCard() public payable {
        require (msg.value == 0.0025 ether);
        uint256 cardWon = getRandom();
        placeCard(msg.sender, cardWon);
    }
    
    function sendCard(address reciever, uint256 cardToSend) public {
        deleteCard(cardToSend);
        placeCard(reciever, cardToSend);
    }
    
    function deleteCard (uint256 cardToDelete) public {
        require(cardOwners[msg.sender][cardToDelete] > 0); 
        cardOwners[msg.sender][cardToDelete] -= 1;
    }
    
    function placeCard(address reciever, uint256 cardToPlace) private{
        cardOwners[reciever][cardToPlace] += 1;   
    }
    
    function getRandom() private returns (uint256){
        uint256 total = (now * uint256(msg.sender)) % 1000000;
        if (total == 999999) return 10;
        else if (999499 <= total && total < 999999) return 9;
        else if (949700 <= total && total < 999499) return 8;
        else if (900000 <= total && total < 949750) return 7;
        else if (800000 <= total && total < 900000) return 6;
        else if (700000 <= total && total < 800000) return 5;
        else if (600000 <= total && total < 700000) return 4;
        else if (400000 <= total && total < 600000) return 3;
        else if (200000 <= total && total < 400000) return 2;
        else return 1;
    }
    
    function payout() public{
        uint256 contractMoney = address(this).balance;
        require (msg.sender == owner);
        require (contractMoney > 0.0125 ether);
        owner.transfer(contractMoney - 0.0125 ether);
    }
}