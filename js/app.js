$(document).ready(function(){
"use strict";
var score = [];
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
	$('#car-image').show().animate(
  	{'left': '-800px'}, 10000,
  		function() {
  		$(this).hide().css('left', '750px');
});	
	$('#bunny-image').show().animate(
  	{'left': '-800px'}, 10000,
  		function() {
   		$(this).hide().css('left', '775px');
    	$('#welcome-overlay').fadeOut(100);
})

score = 0;
currentQuestion = 0;
generateQuestion();

});


	
$('#answer-list').on('click', 'li', userSelection);

$('#submit-button').click(function(){
	checkAnswer();
});	

$('#continue-button').click(function(){
	currentQuestion++;
   	addScore();
	nextQuestion();
});



function userSelection() {
	$(this).removeClass("list-answer-item").addClass("selectedAnswer");
}

function generateQuestion() {
	questionCounter();
 		if (currentQuestion < allQuestions.length) {
     		$('.question-text').text(allQuestions[currentQuestion].question);
     		$('#answer-list').append('<li class="list-answer-item">' + allQuestions[currentQuestion].answers[0] + '</li>');
     		$('#answer-list').append('<li class="list-answer-item">' + allQuestions[currentQuestion].answers[1] + '</li>');
     		$('#answer-list').append('<li class="list-answer-item">' + allQuestions[currentQuestion].answers[2] + '</li>');
     		$('#answer-list').append('<li class="list-answer-item">' + allQuestions[currentQuestion].answers[3] + '</li>');
     	}
     	else {
			showResults();
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
	}
	else if ($('.selectedAnswer').text() === allQuestions[currentQuestion].correct) {
    	$('.selectedAnswer').addClass("right-answer").removeClass("selectedAnswer");
    	$('#continue-button').show();
    	}
	}

function addScore(){
	var partialScore = 0;
	var wrongAttempts = $('.wrong-answer').length;
        wrongAttempts == 3 ? partialScore = 1 : false;
        wrongAttempts == 2 ? partialScore = 2 : false;
        wrongAttempts == 1 ? partialScore = 3 : false;
        wrongAttempts == 0 ? partialScore = 4 : false;
	$("#point-total").append('<li class="score-total">' + partialScore + '</li>');
}

function nextQuestion () {
	clearQuizItem();
	generateQuestion();
}

function clearQuizItem (){
	$("#continue-button").hide();
	$("#current-question-title").empty;
	$(".question-text").empty();
	$(".list-answer-item, .wrong-answer, .right-answer").remove();
	}


function showResults() {
	$("#results").show();
	$("#quiz").hide();
	computeFinalScore ();
	$('#new-game').click(gameReset);
	}


function computeFinalScore() {	
var sum = 0;
$('li.score-total').each(function(){
sum += parseInt(this.innerHTML, 10)
})
$('#results-input').text(sum);
if (sum >= 11) {
$(".bootsie-or-ballin").append("<p class='placement'>" + "Ballin'!" + '</p>');
}
else {
	$(".bootsie-or-ballin").append("<p class='placement'>" + "Bootsie" + '</p>');	
  	}		  	
  }
function gameReset() {
	$("#welcome-overlay").show();
	$("#quiz").show();
	$(".placement").empty();
	$("#results").hide();
	$("#results-input").empty();
	$('#point-total').empty();                                                                                  
}
});
