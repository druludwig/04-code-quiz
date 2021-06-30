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
let leaderList = document.querySelector("#leader-list")
let leaderBoard = document.querySelector("#leaderboard")
let leaderboardButton = document.querySelector("#view-leaderboard")

let currentIndex = 0;
let time = 0;
let timer;
let isDone = false;
let score = 0;

let questionsArray=[
    {
       question: "What is a Boolean?",
       answer1: "A CSS class that separates elements from styles",
       answer2: "A Javascript variable that is either true or false",
       answer3: "A function in PHP that reticulates splines",
       answer4: "A new race of aliens in Star Trek",
       correctAnswer: "A Javascript variable that is either true or false"
    },
    {
       question: "What is Python?",
       answer1: "A CSS library that allows for rapid development",
       answer2: "A conglomerated SQL method for capturing API data",
       answer3: "A programming language used to create web applications",
       answer4: "Another reason not to go to Florida",
       correctAnswer:"A programming language used to create web applications"
    },
    {
      question: "When will Internet Explorer retire?",
      answer1: "July 30, 2021",
      answer2: "Jan 1, 2022",
      answer3: "June 15, 2022",
      answer4: "Who?",
      correctAnswer:"June 15, 2022"
   },
   {
      question: "What is ''Error trapping?''",
      answer1: "The prediction, finding, and fixing of programming errors",
      answer2: "Logging error messages in an encryped file",
      answer3: "Coding error alerts to automatically hide",
      answer4: "A new kind of music",
      correctAnswer:"The prediction, finding, and fixing of programming errors"
   },
   {
      question: "What is a Javascript operator?",
      answer1: "An in-line command that triggers a function",
      answer2: "A mathematical symbol that produces a result based on two values",
      answer3: "A contatiner that can hold an instruction value",
      answer4: "The people physically connecting the internet together",
      correctAnswer:"A mathematical symbol that produces a result based on two values"
   }
]

//Start the Game
startButton.addEventListener("click", startQuiz);

function startQuiz(){
   currentIndex = 0
   sectionText.textContent = 'Good Luck!';
   startButton.style.display = 'none';
   saveButton.style.display = 'none';
   answerDisplay.style.display = 'block';
   gameTimer();
   renderQuestions();
}

//Start the Timer
function gameTimer() {
      time = 61
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


 
//   This ends the quiz if they complete it in time
function endQuiz(){
   isDone = true;
   timerElement.textContent = '';
   sectionText.style.display = '';
   sectionHead.textContent = 'All Done!';
   sectionText.textContent = `You answered ${score} out of 5 correctly and had ${time} seconds left on the clock. Enter your initials to save your score:`;
   initialsField.style.display = 'inline';
   saveButton.style.display = 'block';
   saveButton.setAttribute('align-self', 'center')
   answerDisplay.style.display = 'none';
   saveButton.addEventListener("click", (postScores));
}

//This ends the quiz if the timer runs out
function timerOut(){
   sectionHead.textContent = "Oh no!"
   sectionText.textContent = `The timer ran out! You got through ${currentIndex} questions and got ${score} of them correct before time ran out.`;
   startButton.style.display = 'block';
   startButton.innerHTML = "Start Over"
   answerDisplay.style.display = "none"
}



function postScores(){
   saveButton.style.display = 'none';
   initialsField.style.display = 'none';
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
  
function displayHighscores(){
   quizMain.style.display = 'none'
   leaderBoard.style.display = 'block';
    let savedScores = JSON.parse(localStorage.getItem("savedScores")) || [];
    for (i=0; i<savedScores.length; i++){
        let displayText = document.createElement("li");
        displayText.textContent = `${savedScores[i].name} scored ${savedScores[i].score} / 5` ;
        leaderList.appendChild(displayText);
    }
    leaderboardButton.style.display = "none"
}


leaderboardButton.addEventListener("click", (displayHighscores));
