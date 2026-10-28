const messageArray = [];
let deck = {};
let playArea = {};
let game = {};
let table = {};
class BaseGame {
	constructor() {
		this.deals = 0;
		this.sizeWidth = 15;
		this.sizeHeight = 15;
		this.layout = [];
		this.center = null;
		this.stackSelect1 = null;
		this.stackSelect2 = null;
		this.stacks = [];
		this.layoutInfo = [
			{ path: ["final"],
			  initialDeal: 1,
			  deal: 0 },
			{ path: ["out", "out", "side", "out", "side", "out", "side", "out", "side", "out", "side", "out", "side"],
			  initialDeal: 4,
			  deal: 4,
			  extend: 1 },
			{ path: ["out", "out", "out", "side", "out", "side", "out", "side", "out", "side", "out", "side"],
			  initialDeal: 5,
			  deal: 5,
			  extend: 1 },
			{ path: ["out", "out", "side", "out", "side", "out", "side", "out", "side", "out", "side", "out", "side"],
			  initialDeal: 4,
			  deal: 4,
			  extend: 1 },
			{ path: ["out", "out", "out", "side", "out", "side", "out", "side", "out", "side", "out", "side"],
			  initialDeal: 5,
			  deal: 5,
			  extend: 1 }
		];
/*		this.stackBase0 = ["final"];
		this.stackBase1 = ["out", "out", "side", "out", "side", "out", "side", "out", "side", "out", "side", "out", "side"];
		this.stackBase2 = ["out", "out", "out", "side", "out", "side", "out", "side", "out", "side", "out", "side"];
		this.stackBase3 = ["out", "out", "side", "out", "side", "out", "side", "out", "side", "out", "side", "out", "side"];
		this.stackBase4 = ["out", "out", "out", "side", "out", "side", "out", "side", "out", "side", "out", "side"]; */
	}
	findCenter() {
		let centerFound = ((this.sizeWidth * this.sizeHeight) - 1 ) / 2;
		this.center = centerFound;
		return centerFound;
	}
	buildLayout() {
		for (let i = 0; i < 5; i++) {
			let newArm = [];
			let refArm = this.layoutInfo[i].path;
			let out;
			let side;
			let currentSpot = this.center;
			switch(i) {
				case 0:
					break;
				case 1:
					out = -this.sizeWidth;
					side = -1;
					break;
				case 2:
					out = 1;
					side = -this.sizeWidth;
					break;
				case 3:
					out = this.sizeWidth;
					side = 1;
					break;
				case 4:
					out = -1;
					side = this.sizeWidth;
			}			
			for (let j = 0; j < refArm.length; j++) {
				let nextSpot;

				if (refArm[j] == "out") {
					nextSpot = currentSpot + out;
				} else if (refArm[j] == "side") {
					nextSpot = currentSpot + side;
				} else if (refArm[j] == "final") {
					table.spaces[currentSpot].type = "final";
					nextSpot = currentSpot;
				}
				newArm.push(nextSpot);
				currentSpot = nextSpot;
			}
			this.layout.push(newArm);
		}
		//having built the layout, apply cross-reference materials to the grid.
		msg("number of layouts: " + this.layout.length);
		for (let k = 0; k < this.layout.length; k++) {
			let refLayout = this.layout[k];
			let displayLayout = refLayout.toString();
			msg(displayLayout);

			for (let l = 0; l < refLayout.length; l++) {
				let space = refLayout[l];
				table.spaces[space].layout = k;
				table.spaces[space].position = l;
			}
		}
	}
	setTypes() {
		for (let i = 0; i < game.layout.length; i++) {
			let targetLayout = game.layout[i];
			for (let j = 0; j < targetLayout.length; j++) {
				let targetSpace = table.spaces[targetLayout[j]];
				if (targetSpace.type == "final") { 
					continue; 
				} else {
					targetSpace.type = "stack";
				}
			}
		}
	}
}

class BaseTable {
	constructor() {
		this.spaces = [];
	}
}

class BaseDeck {
	constructor() {
		this.cards = [];
		for (let s = 0; s < 4; s++) {
			let suit = "";
			switch(s) {
				case 0:
					suit = "clubs";
					break;
				case 1:
					suit = "diamonds";
					break;
				case 2:
					suit = "hearts";
					break;
				case 3:
					suit = "spades";
					break;
			}
			for (let v = 0; v < 13; v++) {
				let val = v + 1;
				let cardOutput = {};
				let nameVal = suit.charAt(0);
				switch(val) {
					case 1:
						nameVal += "A";
						break;
					case 11:
						nameVal += "J";
						break;
					case 12:
						nameVal += "Q";
						break;
					case 13:
						nameVal += "K";
						break;
					default:
						nameVal += val;
				}
				cardOutput.name = nameVal;
				cardOutput.suit = suit;
				cardOutput.value = val;
				this.cards.push(cardOutput);
			}
		}

		this.order = [];
		for (let i = 0; i < this.cards.length; i++) {
			this.order.push(i);
		}
	}
	drawNextCard() {		//draws the next card in preparation for placing; removes card from deck order list.
		return deck.order.shift();
	}
}

function deal(type) {				//ISSUE IS SOMEWHERE IN HERE OR IN DRAWNEXTCARD ABOVE
	if (type == "initial") {
		msg("initial deal called");
		for (let i = 0; i < game.layout.length; i++) {
			let layoutLength = game.layout[i].initialDeal;
			msg("layout length is " + layoutLength);
			let newStack = [];
			for (let k = 0; k < layoutLength; k++) {
				let newCard = deck.drawNextCard();
				msg("new card is " + newCard);
				newStack.push(newCard);
			}
			msg("new stack is " + newStack.toString());
			game.stacks[i].push(newStack);
		}
	} else { msg("only initial deal set up yet"); }

	// need to calculate where to deal
}

function refreshDisplay() {
	msg("refreshDisplay called");
	for (let i = 0; i < game.layout.length; i++) {
		for (let j = 0; j < game.layout[i].length; j++) {
			let layoutCheck = game.layout[i];
			let targetSpace = "g" + layoutCheck[j];
			let targetStack = game.stacks[i][j];
			msg("targetStack is: " + targetStack.toString());
			let cardValue;

			if (targetStack.length == 1) {
				cardValue = targetStack[0];
			}

			let cardDisplay = getCard(cardValue);
			msg ("card value acquired is " + cardDisplay);

			document.getElementById(targetSpace).innerText = cardDisplay;
		}
	}
}

function initializeGame() {
	deck = new BaseDeck();
	game = new BaseGame();
	table = new BaseTable();
//	shuffle();
	let deckorder = deck.order.toString();
	let getCardTest = deck.order[5];
	let specificCard = getCard(getCardTest);
	getScreenSize();	
	let displayText = "width: " + playArea.width + ", height: " + playArea.height + " / " + deckorder + " -- " + specificCard + "/";
	
	let displayBlock = document.getElementById("displayBlock");

	let cardOrder = showOrder();
	displayText += cardOrder;
	
	msg(displayText);
	displayBlock.style.width = playArea.width;
	displayBlock.style.height = playArea.height;

	game.findCenter();
	buildSpaceTable(game.sizeWidth, game.sizeHeight);

	game.buildLayout();
	game.setTypes();

	buildGrid(game.sizeWidth, game.sizeHeight);

	let targetDiv = document.getElementById("playGrid");
	targetDiv.addEventListener("click", function(event){ tapTest(event.target.id); });

}

function getScreenSize() {
	playArea.width = window.innerWidth;
	playArea.height = window.innerHeight;
}

function buildSpaceTable(tilesWide, tilesHigh) {
	let spaceCount = tilesWide * tilesHigh;
	let columnCounter = 0;
	let rowCounter = 0;

	//build dataset
	for (let i = 0; i < spaceCount; i++) {
		let addSpace = {};
		addSpace.row = rowCounter;
		addSpace.column = columnCounter;
		addSpace.valueTest = "r" + i;
		addSpace.type = "blank";
		table.spaces.push(addSpace);

		// this text to iterate for next tile.
		columnCounter += 1;
		if (columnCounter >= tilesWide) {
			columnCounter = 0;
			rowCounter += 1;
		}
	}
}
function buildGrid(columns, rows) {
	let count = columns * rows;
	let output = "";

	for (let i = 0; i < count; i ++) {
		let classy = table.spaces[i].type;			
		let addDiv = `<div id="g${i}" class="${classy}"></div>`;
		output += addDiv;
	}
	let targetDiv = document.getElementById("playGrid");
	targetDiv.innerHTML = output;

	//set style based upon size
	let columnStyle = "columns" + columns;
	let rowStyle = "rows" + rows;
	
	targetDiv.classList.add(columnStyle, rowStyle);	

}

/* figure this out later, how to remove classes

	let classes = targetDiv.classList.length;
	if (classes > 0) {
		targetDiv.classList.forEach()
	}
	targetDiv.classList.remove();
	
	targetDiv.classList.add(columnStyle, rowStyle);	
	targetDiv.innerHTML = output;
	targetDiv.addEventListener("click", function(){ 
		tapTest(event.target.id); 
	});
} */




function tapTest(id) {
	if (!id || !id.startsWith("g")) { return; }
	let spaceId = id.slice(1);
	let checkValues = table.spaces[spaceId];
	
	
	let message = `you have clicked on a space identified as ${id}. The space ID is ${spaceId}. The check value is ${checkValues.valueTest}. This space is located on row ${checkValues.row} and column ${checkValues.column}. The space type is ${checkValues.type}, the layout number is ${checkValues.layout} and position is ${checkValues.position}.` ;
	msg(message);

	if (spaceId == 0) {
		//highlightArms();
		deal("initial");
		msg("initial deal completed");
		refreshDisplay();
	}

}

function highlightArms() {
	for (let i = 0; i < game.layout.length; i++) {
		let targetLayout = game.layout[i];
		for (let j = 0; j < targetLayout.length; j++) {
			let targetSpace = "g" + targetLayout[j];
			document.getElementById(targetSpace).classList.add("highlight");
		}
	}
}



function shuffle() {
	for (let i = deck.order.length - 1; i > 0; i--) {
		let pickCard = Math.floor(Math.random() * (i + 1));
		let targetCard = deck.order[i];
		deck.order[i] = deck.order[pickCard];
		deck.order[pickCard] = targetCard;
	}
}

function showOrder() {
	let deckArray = [];
	for (let i = 0; i < deck.order.length; i++){
		let thisCard = getCard(deck.order[i]);
		deckArray.push(thisCard);
	}
	return deckArray;
}

function getCard(value, reqSplit = false) {
	let card = deck.cards[value];
	if (reqSplit == true) {
		let cardInfo = {};
		cardInfo.suit = card.suit;
		cardInfo.value = card.value;
		return cardInfo;
	} else {
		return card.name;
	}
}


function msg(messagetext) {
	messageArray.unshift(messagetext);
	if (messageArray.length > 25) {
		messageArray.pop();
	}
	let finalArray = "";
	for (let i = 0; i < messageArray.length; i++) {
		finalArray += "<p>" + messageArray[i] + "</p>";
	}
	document.getElementById("messageBlock").innerHTML = finalArray;
}

