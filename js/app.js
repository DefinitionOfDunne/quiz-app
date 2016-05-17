$(document).ready(function (){
"use strict";

var score = 0;
var tries = 0;
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
$("#start-button").click(function  () {
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
    		$('#welcome-overlay').fadeOut(100);
  	
    	gamePlay();
    	generateQuestion();
    	checkAnswer();
    	questionCounter();
})
});
 	
 	
 	
function gamePlay(){
	$('.answer-list').on('click', 'li', userSelection)
	$('#submit-button').click(function(){
	checkAnswer();
	})
	}

function userSelection() {
	$(this).removeClass("list-answer-item").addClass("selectedAnswer");
	}

function generateQuestion() {
		questionCounter();
		clearQuizItem();
 		if (currentQuestion < allQuestions.length) {
     	$('.question-text').text(allQuestions[currentQuestion].question);
     	}
     		else {
			showResults();
		}
     		for (var i = 0; i < allQuestions[currentQuestion].answers.length; i++) {
        	$('.answer-list').append('<li class="list-answer-item">' + allQuestions[currentQuestion].answers[i] + '</li>');
		}
		
	}


function questionCounter(){
	if (currentQuestion < allQuestions.length) {
		$("#current-question-title").text(currentQuestion + 1);
}
}

function checkAnswer() {
    	if ($('.selectedAnswer').text() != allQuestions[currentQuestion].correct) {
    	$('.selectedAnswer').addClass("wrong-answer").removeClass("selectedAnswer");
    	tries++;
    } 	else if ($('.selectedAnswer').text() === allQuestions[currentQuestion].correct) {
    	addScore();
        nextQuestion();
    }

}
function addScore() {
		if (tries == 1) {
		score = (score + 4);
		}
		else if (tries == 2) {
		score = (score + 3);
		}
		else if (tries == 3) {
		score = (score + 2);
		}
		else if (tries == 4) {
		score = (score + 1);
		}
	$("#point-total").append('<li>' + score + '</li>');	
}	

function nextQuestion () {
	clearQuizItem();
	currentQuestion++;
	generateQuestion();
	var tries = 0;
}

function clearQuizItem (){
	$("#current-question-title").empty;
	$(".question-text").empty();
	$(".answer-list").empty();
	}

function showResults() {
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
	$('#point-total').empty();                                             
    score = 0;
    currentQuestion = 0;
    clearQuizItem();
    generateQuestion();                                             
}
});
