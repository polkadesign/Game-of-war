
let deckId;
const cardsContainer=document.getElementById("cards");
const newDeckBtn = document.getElementById("new-deck");
const drawCardBtn = document.getElementById("draw");
const gameInfo=document.getElementById("announcement");
let remainingCards;
const cardsLeft=document.getElementById("cardsLeft");
const playerPoints=document.getElementById("playerScore");
const computerPoints=document.getElementById("computerScore");
const player=document.getElementById("player");
const computer=document.getElementById("comp");
let playerScore=0;
let computerScore=0;


async function handleClick(){
    const resp= await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    const data= await resp.json()
    console.log(data)
    deckId=data.deck_id;
    cardsLeft.innerHTML=`Remaining cards:52`}
    

async function drawTwo(){
const resp=await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
const data= await resp.json()
console.log(data)

playerPoints.textContent="";
computerPoints.textContent="";

    cardsContainer.children[0].innerHTML=`
    <img src='${data.cards[0].image}' class="card"/>
`
    cardsContainer.children[1].innerHTML=`
    <img src='${data.cards[1].image}' class="card"/>
`
const winnerText = whichCardWon(data.cards[0], data.cards[1]);

gameInfo.textContent=winnerText;
console.log(winnerText);
remainingCards=data.remaining;

cardsLeft.innerHTML=`Remaining cards: ${remainingCards}`;

if(remainingCards===0){
    drawCardBtn.disabled=true;
    drawCardBtn.classList.add("disabled");
    drawCardBtn.innerHTML="Game is over";

    if(playerScore>computerScore){
        gameInfo.textContent="You won the game, congratulations!!!"
    }
    else if(computerScore>playerScore){gameInfo.textContent="Computer won, try again!"}
    else {gameInfo.textContent="It's a tie! You were so close!"}

console.log(remainingCards)
}
}

newDeckBtn.addEventListener("click", handleClick);
drawCardBtn.addEventListener("click", drawTwo)


function whichCardWon (card1, card2){

    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"];

    const card1ValueIndex = valueOptions.indexOf(card1.value);
    const card2ValueIndex = valueOptions.indexOf(card2.value);

    if(card1ValueIndex>card2ValueIndex){
        computerPoints.textContent="1 point for Computer";
        computerScore++;
        computer.textContent=`Computer: ${computerScore}`;
        console.log(computerScore);
        
        return "Card 1 wins";
 
    }
    else if(card1ValueIndex<card2ValueIndex){
        playerPoints.textContent="1 point for you";
        playerScore++;
        player.textContent=`Player: ${playerScore}`;
    
        return "Card 2 wins";
    }
    else{return "It's a tie!"}

};
