

document.getElementById("guess").addEventListener("click", function theGuess(){
  let guess = 0
  guess = prompt("How Many flowers do you think are in this picture?")*1;
  
  for(let i = 0; i<1; i++){
  if(guess > 213){
    guess = prompt("Too high! Guess again")
    i--;
  }else if(guess < 213 && guess != 0){
    guess=prompt("Too low! Guess again")
    i--;
  }else if(guess == 213){
    alert("That's right!")
  } else if(guess ==0){
    i++
  }
}
});
