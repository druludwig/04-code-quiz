let quizMain = document.querySelector("#quiz-main")
let startButton = document.querySelector("#start-button");
let saveButton = document.querySelector("#save-button");
let timerElement = document.querySelector("#timer-display");
let sectionHead = document.querySelector("#section-head");
let sectionText = document.querySelector("#section-text");
let answerDisplay = document.querySelector("#answer-display");
let answerLine1 = document.querySelector("#answerLine1");
let answerLine2 = document.querySelector("#answerLine2");
let answerLine3 = document.querySelector("#answerLine3");
let answerLine4 = document.querySelector("#answerLine4");
let initialsField = document.querySelector("#initials");

let currentIndex = 0;
let time = 0;
let timer;
let isDone = false;
let score = 0;

let questionsArray=[
    {
       question: "Q1: How much do I love javascript?",
       answer1: "One",
       answer2: "Two",
       answer3: "Three",
       answer4: "Four",
       correctAnswer: "Three"
    },
    {
       question: "Q2: How much do I love CSS?",
       answer1: "Nope",
       answer2: "Some",
       answer3: "So much",
       answer4: "I don't",
       correctAnswer:"Some"
    },
    {
      question: "Q3: Colors",
      answer1: "Red",
      answer2: "Green",
      answer3: "Blue",
      answer4: "Purple",
      correctAnswer:"Blue"
   },
   {
      question: "Q4: Animals",
      answer1: "Cat",
      answer2: "Dog",
      answer3: "Lizard",
      answer4: "Pork",
      correctAnswer:"Lizard"
   },
   {
      question: "Q5: Trees",
      answer1: "Pine",
      answer2: "Alder",
      answer3: "Maple",
      answer4: "Cherry",
      correctAnswer:"Pine"
   }
]

//Start the Game
startButton.addEventListener("click", startQuiz);

function startQuiz(){
   currentIndex = 0
   sectionText.textContent = '';
   startButton.style.display = 'none';
   saveButton.style.display = 'none';
   answerDisplay.style.display = 'block';
   gameTimer();
   renderQuestions();
}

//Start the Timer
function gameTimer() {
      time = 51
      timer = setInterval(function() {
        time--;
        timerElement.textContent = ("Time: " + time);
          if (time >= 0) {
          if (isDone && time > 0) {
            clearInterval(timer);
            endQuiz();}
        }
        if (time <= 0) {
          clearInterval(timer);
          timerOut();
        }
      }, 1000);
}

//Generate and display the questions and answers
function renderQuestions(){  
for (let i = 0; i < questionsArray.length; i++) {
   //Question
   let currentQuestion = questionsArray[currentIndex].question;
   sectionHead.textContent = currentQuestion;
   //Answers
   answerLine1.textContent = questionsArray[currentIndex].answer1
   answerLine2.textContent = questionsArray[currentIndex].answer2
   answerLine3.textContent = questionsArray[currentIndex].answer3
   answerLine4.textContent = questionsArray[currentIndex].answer4
   //Wait for the user to choose
   answerDisplay.addEventListener("click", (checkAnswers));
}
} 

//Check for correct answer
function checkAnswers(event){
   let element = event.target;
   if (element.matches("li")) {
      if (element.textContent == questionsArray[currentIndex].correctAnswer){
      score++;
      sectionText.textContent = ("CORRECT! You've got " + score + " correct answers so far!")}
     else {
      time -= 10;
      sectionText.textContent = ("Not quite. But, maybe this next one won't be too much for you.")}
   }
   currentIndex++;
   checkProgress()
   }

//Check to see if the quiz should continue or not
function checkProgress(){
   if (currentIndex < questionsArray.length){
         renderQuestions()
      } else {
         endQuiz()
      }
   }


 
//This ends the quiz if they complete it in time
function endQuiz(){
   isDone = true;
   sectionText.style.display = '';
   sectionHead.textContent = 'All Done!';
   sectionText.textContent = `You answered ${score} out of 5 correctly and had ${time} seconds left on the clock. Enter your initials to save your score:`;
   initialsField.style.display = 'block';
   saveButton.style.display = 'block';
   answerDisplay.style.display = 'none';
   saveButton.addEventListener("click", (postScores));
}

//This ends the quiz if the timer runs out
function timerOut(){
   sectionHead.textContent = "Oh no!"
   sectionText.textContent = `The timer ran out! You got through ${currentIndex} questions and got ${score} of them correct before time ran out.`;
   startButton.style.display = 'block';
   startButton.innerHTML = "Start Over"
}



function postScores(){
   let savedScores = JSON.parse(localStorage.getItem("savedScores")) || [];
   let player = initialsField.value;
   let currentScore = {
         name : player,
         score : score
   };
   savedScores.push(currentScore);
   localStorage.setItem("savedScores", JSON.stringify(savedScores));

   displayHighscores();
  }
  




//save to local storage
//send to high scores page



