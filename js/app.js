'use strict';

var score = 0;
var currentQuestion = 0;
var allQuestions = [{
	question: "If you ever plan to run with his team, which of the follow artists finds it important to practice good hygeine?" ,
	answers: ["Rappin 4 Tay", "MC Hammer", "Spice 1", "Del The Funky Homosapien"],
	correct: "Del The Funky Homosapien"
	},
	{
	question: "In 2008, this artist released a collaborative album with the then-late Mac Dre, featuring songs like Fillmore - Vallejo, Bay Thang, and I'm A Sav,?",
	answers: ["Andre Nickatina", "Smoov E", "The Jacka", "Mistah F.A.B."],
	correct: "Andre Nickatina"
	},
	{
	question: "Which artist is widely credited as being the creator of the Hyphy movement?",
	answers: ["Too $hort", "Keak Da Sneak", "Lil Jon", "E-40"],
	correct: "Keak Da Sneak"
	},
	{
	question: "Who is The BasedGod?",
	answers: ["Lil B", "B-Legit", "The Big Badass Ant Banks", "Jay Biz"],
	correct: "Lil B"
	},
	{
	question: "Which of the following is a common nickname for rapper E-40?",
	answers: ["40-Watah", "Charlie Hustle", "E Fonzarelli", "All The Above"],
	correct: "All The Above"
}];

	/*-----Start Screen & Animations------*/
	$("#start-button").click(function() {
		$('#car-image').show();
		$('#car-image').animate(
  		{'left': '-800px'}, 10000,
  		function() {
    		$(this).hide();
  		}
      	);
		$('#bunny-image').show();
		$('#bunny-image').animate(
  		{'left': '-800px'}, 10000,
  		function() {
    	$(this).hide();
    	$('#welcome-overlay').fadeOut(1000);
  		});
  		});

quizStart();

function quizStart() {
  $("#start-button").click(generateQuestion);          
  $('.answer-list').on('click', 'li', function () {
    validateAnswer.apply(this); 
  	});
	}


function clearQuizItem (){
	$(".question-text").empty();
	$(".answer-list").empty();
	}

function generateQuestion() {          

  if (currentQuestion < allQuestions.length) {     
    $('.question-text').text(allQuestions[currentQuestion].question);            
    var i = 0;                                                                
    while(i < allQuestions[currentQuestion].answers.length)                  
    {
    $('.answer-list').append("<li>" + allQuestions[currentQuestion].answers[i] + "</li>");
    i ++;
    }
  	} else {
    endGame();
 	}
	}


function validateAnswer() {
 	if (currentQuestion > allQuestions.length) { 
    return 0;                                     
  	}
  	else if ($(this).html() === allQuestions[currentQuestion].correct) {
    score++;    
  	}
		currentQuestion++; 
		clearQuizItem();           
		generateQuestion();        
	}

function endGame() {
$("#results").show();
$("#quiz").hide();
$("#results-input").append(score);
$('#new-game').click(newGame);
}


function newGame(){
	$("#welcome-overlay").show();
	$("#quiz").show();
	$("#results").hide();
	$("#results-input").empty();                                             
    score = 0;
    currentQuestion = 0;
    clearQuizItem();
    generateQuestion();                                             
}
