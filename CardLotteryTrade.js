let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

let abi = [
	{
		"constant": false,
		"inputs": [],
		"name": "getCard",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "cardIndex",
				"type": "uint256"
			}
		],
		"name": "numOfUniqueCard",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "cardToDelete",
				"type": "uint256"
			}
		],
		"name": "deleteCard",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "payout",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalNumOfCards",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "cardOwners",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "reciever",
				"type": "address"
			},
			{
				"name": "cardToSend",
				"type": "uint256"
			}
		],
		"name": "sendCard",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
];

let CardLotteryTradeFactory = web3.eth.contract (abi);
// instance represents instance on Rinkeby testing network
let CardLotteryTradeContractInstance = CardLotteryTradeFactory.at ("0xdd9dfb785484b206d7caf08270e7da30dc0b5f13");

// simple graphics used during presentation of project
var imgArray = [
		'<img src="frogcard00.jpg" alt="Non-Card 00" height="90" width="60">',
		'<img src="frogcard01.jpg" alt="Card 01" height="90" width="60">',
		'<img src="frogcard02.jpg" alt="Card 02" height="90" width="60">',
		'<img src="frogcard03.jpg" alt="Card 03" height="90" width="60">',
		'<img src="frogcard04.jpg" alt="Card 04" height="90" width="60">',
		'<img src="frogcard05.jpg" alt="Card 05" height="90" width="60">',
		'<img src="frogcard06.jpg" alt="Card 06" height="90" width="60">',
		'<img src="frogcard07.jpg" alt="Card 07" height="90" width="60">',
		'<img src="frogcard08.jpg" alt="Card 08" height="90" width="60">',
		'<img src="frogcard09.jpg" alt="Card 09" height="90" width="60">',
		'<img src="frogcard10.jpg" alt="Card 10" height="90" width="60">',
	       ]

function buyCards ()
{
  var buyer = $("#YourAccount").val ();
  CardLotteryTradeContractInstance.getCard
  (
	{ from : buyer,
	  gas : 1000000,
	  value : 2500000000000000
	},
  );
}

function tradeCard ()
{
  var sender = $("#SendFrom").val ();
  var cardNum = $("#cardNumber").val ();
  var reciever = $("#SendTo").val ();
  CardLotteryTradeContractInstance.sendCard
  (
	reciever,
	cardNum,
	{
	  from : sender,
	  gas : 1000000
	},
  );
}

function removeCards ()
{
  var deleter = $("#YourAccount2").val ();
  var cardDeleted = $("#cardDeleteNum").val ();
  CardLotteryTradeContractInstance.deleteCard
  (
	cardDeleted,
        {
	  from : deleter,
          gas : 1000000,
        },
  );
}

//shows if have at least one of each (10) unique cards
function seeCards ()
{
  var viewer = $("#TaxPayer").val ();
  var viewed = $("#ToViewHash").val ();
  var someBigNum = 10;
  let cardArray = new Array(10);
  for (let j = 0; j < 10; j++)
  {
    let num = CardLotteryTradeContractInstance.cardOwners.call
    (
	viewed,
	j,
	{
	  from: viewer,
	  gas: 600000
	}
    );
    cardArray[j] = num;
  }
  let innerHtml = "<tr>ViewCards</tr>";
  for (let i = 0; i < 10; i++)
  {
    let cardNum = cardArray[i];

    if (i % 10 === 0)
    {
	innerHtml = innerHtml + "<tr><td>" + imgArray[cardNum] + "</td>";
    }
    else if (i % 10 === 9)
    {
	innerHtml = innerHtml + "<td>" + imgArray[cardNum] + "</td></tr>";
    }
    else
    {
	innerHtml = innerHtml + "<td>" + imgArray[cardNum] + "</td>";
    }

  }
  $ ("#viewCardsTable").html (innerHtml);

}

$(document).ready (function () {
  // do nothing
});
