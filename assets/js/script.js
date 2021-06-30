let quizMain = document.querySelector("#quiz-main")
let startButton = document.querySelector("#start-button");
let timerElement = document.querySelector("#timer-display");
let sectionHead = document.querySelector("#section-head");
let sectionText = document.querySelector("#section-text");
let answerDisplay = document.querySelector("#answer-display");
let answerLine1 = document.querySelector("#answerLine1");
let answerLine2 = document.querySelector("#answerLine2");
let answerLine3 = document.querySelector("#answerLine3");
let answerLine4 = document.querySelector("#answerLine4");

let currentIndex = 0;
let score = 0;
let time = 0;
let timer;
let isDone = false;

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
    }
]

//01 Start the Game
startButton.addEventListener("click", startQuiz);

function startQuiz(){
   time = 0;
   gameTimer();
   renderQuestions();
//hide start button
}

//02 Start the Timer
function gameTimer() {
      time = 60
   // Sets timer
      timer = setInterval(function() {
        time--;
        timerElement.textContent = ("Time: " + time);
          if (time >= 0) {
          // Tests if win condition is met
          if (isDone && time > 0) {
            // Clears interval and stops timer
            clearInterval(timer);
            endQuiz();
          }
        }
        // Tests if time has run out
        if (time <= 0) {
          // Clears interval
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

   answerDisplay.addEventListener("click", (checkAnswers));
   
}
} 
// endQuiz()

//Check for correct answer
function checkAnswers(event){
   var element = event.target;
  
   if (element.matches("li")) {
      if (element.textContent == questionsArray[currentIndex].correctAnswer){
      score++;
      console.log('you are right!');}
     else {
      time -= 10;
      console.log('you are wrong!');}
      }
   currentIndex++;
   console.log('Progress is: ' + currentIndex)
   console.log('Score is: ' + score)
   checkProgress()
   }

   function checkProgress(){
   if (currentIndex < questionsArray.length){
         renderQuestions()
      } else {
         endQuiz()
      }
   }



   
 





//This ends the quiz if the timer runs out
function timerOut(){
sectionHead.textContent = "You lose."
}

//This ends the quiz if they complete it in time
function endQuiz(){
sectionHead.textContent = "The game ended because you finished."
}

//isDone -- if the quiz is done then set isdone to true
