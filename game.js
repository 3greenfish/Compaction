let deck = {};
let layout = {};
let game = {};
class BaseGame {
	sizeWidth;
	sizeHeight;
	layout;
	constructor() {
		this.sizeWidth = 5;
		this.sizeHeight = 5;
	}
}
class BaseDeck {
	cards;
	order;
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
		/*
		this.cards = [
			{ name: "cA", suit: "clubs", value: 1 },
			{ name: "c2", suit: "clubs", value: 2 },
			{ name: "c3", suit: "clubs", value: 3 },
			{ name: "c4", suit: "clubs", value: 4 },
			{ name: "c5", suit: "clubs", value: 5 },
			{ name: "c6", suit: "clubs", value: 6 },
			{ name: "c7", suit: "clubs", value: 7 },
			{ name: "c8", suit: "clubs", value: 8 },
			{ name: "c9", suit: "clubs", value: 9 },
			{ name: "c10", suit: "clubs", value: 10 },
			{ name: "cJ", suit: "clubs", value: 11 },
			{ name: "cQ", suit: "clubs", value: 12 },
			{ name: "cK", suit: "clubs", value: 13 },
			{ name: "dA", suit: "diamonds", value: 1 },
			{ name: "d2", suit: "diamonds", value: 2 },
			{ name: "d3", suit: "diamonds", value: 3 },
			{ name: "d4", suit: "diamonds", value: 4 },
			{ name: "d5", suit: "diamonds", value: 5 },
			{ name: "d6", suit: "diamonds", value: 6 },
			{ name: "d7", suit: "diamonds", value: 7 },
			{ name: "d8", suit: "diamonds", value: 8 },
			{ name: "d9", suit: "diamonds", value: 9 },
			{ name: "d10", suit: "diamonds", value: 10 },
			{ name: "dJ", suit: "diamonds", value: 11 },
			{ name: "dQ", suit: "diamonds", value: 12 },
			{ name: "dK", suit: "diamonds", value: 13 },
			{ name: "hA", suit: "hearts", value: 1 },
			{ name: "h2", suit: "hearts", value: 2 },
			{ name: "h3", suit: "hearts", value: 3 },
			{ name: "h4", suit: "hearts", value: 4 },
			{ name: "h5", suit: "hearts", value: 5 },
			{ name: "h6", suit: "hearts", value: 6 },
			{ name: "h7", suit: "hearts", value: 7 },
			{ name: "h8", suit: "hearts", value: 8 },
			{ name: "h9", suit: "hearts", value: 9 },
			{ name: "h10", suit: "hearts", value: 10 },
			{ name: "hJ", suit: "hearts", value: 11 },
			{ name: "hQ", suit: "hearts", value: 12 },
			{ name: "hK", suit: "hearts", value: 13 },
			{ name: "sA", suit: "spades", value: 1 },
			{ name: "s2", suit: "spades", value: 2 },
			{ name: "s3", suit: "spades", value: 3 },
			{ name: "s4", suit: "spades", value: 4 },
			{ name: "s5", suit: "spades", value: 5 },
			{ name: "s6", suit: "spades", value: 6 },
			{ name: "s7", suit: "spades", value: 7 },
			{ name: "s8", suit: "spades", value: 8 },
			{ name: "s9", suit: "spades", value: 9 },
			{ name: "s10", suit: "spades", value: 10 },
			{ name: "sJ", suit: "spades", value: 11 },
			{ name: "sQ", suit: "spades", value: 12 },
			{ name: "sK", suit: "spades", value: 13 }		
		]; */

		this.order = [];
		for (let i = 0; i < this.cards.length; i++) {
			this.order.push(i);
		}
  }
}

function initializeGame() {
	deck = new BaseDeck;
	game = new BaseGame;
//	shuffle();
	let deckorder = deck.order.toString();
	let getCardTest = deck.order[5];
	let specificCard = getCard(getCardTest);
	getScreenSize();	
	let displayText = "width: " + layout.width + ", height: " + layout.height + " / " + deckorder + " -- " + specificCard + "/";
	
	let displayBlock = document.getElementById("displayBlock");
	let messagesHere = document.getElementById("messageBlock");

	let cardOrder = showOrder();
	displayText += cardOrder;
	
	messagesHere.innerText = displayText;
	messagesHere.style.border = "1px solid blue";
	displayBlock.style.width = layout.width;
	displayBlock.style.height = layout.height;

	buildGrid(game.sizeWidth, game.sizeHeight);
}

function getScreenSize() {
	layout.width = window.innerWidth;
	layout.height = window.innerHeight;
}

function buildGrid(tilesWide, tilesHigh) {
	let targetDiv = document.getElementById("playGrid");
	let totalSpaces = tilesWide * tilesHigh;
	let columnCounter = 1;
	let rowCounter = 1;
	let output = "";
	
	for (let i = 0; i < totalSpaces; i++) {
		let spaceId = rowCounter.toString(16) + columnCounter.toString(16);
		let addDiv = `<div id="${spaceId}">${i}</div>`;
		columnCounter += 1;
		if (columnCounter > tilesWide) {
			columnCounter = 1;
			rowCounter += 1;
		}
		output += addDiv;
	}

	columnStyle = "columns" + tilesWide;
	rowStyle = "rows" + tilesHigh;

/* figure this out later, how to remove classes

	let classes = targetDiv.classList.length;
	if (classes > 0) {
		targetDiv.classList.forEach()
	}
	targetDiv.classList.remove();
*/
	
	targetDiv.classList.add(columnStyle, rowStyle);	
	targetDiv.innerHTML = output;
	targetDiv.addEventListener("click",tapTest());
}


function tapTest(id) {
	let message = "you have clicked on a space identified as " + id;
	document.getElementById("messageBlock").innerText = message;	
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


