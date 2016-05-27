/* ------PAGE LOAD------ */
$(document).ready(function() {
    "use strict";
    var score = 0;
    var currentQuestion = 0;
    var allQuestions = [{
        question: "If you ever plan to run with his team, which of the follow artists finds it important to practice good hygeine?",
        answers: ["Rappin 4 Tay", "MC Hammer", "Spice 1", "Del The Funky Homosapien"],
        correct: "Del The Funky Homosapien"
    }, {
        question: "In 2008, this artist released a collaborative album with the then-late Mac Dre, featuring songs like Fillmore - Vallejo, Bay Thang, and I'm A Sav,?",
        answers: ["Andre Nickatina", "Smoov E", "The Jacka", "Mistah F.A.B."],
        correct: "Andre Nickatina"
    }, {
        question: "Which artist is widely credited as being the creator of the Hyphy movement?",
        answers: ["Too $hort", "Keak Da Sneak", "Lil Jon", "E-40"],
        correct: "Keak Da Sneak"
    }, {
        question: "Who is The BasedGod?",
        answers: ["Lil B", "B-Legit", "The Big Badass Ant Banks", "Jay Biz"],
        correct: "Lil B"
    }, {
        question: "Which of the following is a common nickname for rapper E-40?",
        answers: ["40-Watah", "Charlie Hustle", "E Fonzarelli", "All The Above"],
        correct: "All The Above"

    }];


    /*-----START SCREEN & ANIMATIONS------*/
    $("#start-button").click(function() {
        $('#car-image').show().animate({ 'left': '-800px' }, 8000,
            function() {
                $(this).hide().css('left', '750px');
            });
        $('#bunny-image').show().animate({ 'left': '-800px' }, 8000,
                function() {
                    $(this).hide().css('left', '775px');
                    $('#welcome-overlay').fadeOut(100);
                })
            /*----LOADS 1ST QUESTION SET DUE TO VAR CURRENTQUESTION = 0 ---*/
        generateQuizContent();
    });

    /*----RUN GAME FUNCTIONALITY---*/
    gamePlay();



    /*----TAKES USER SELECTION, 
        --COMPARES TEXT OF SELECTION TO CORRECT ANSWER, 
        --RUNS NEXT QUESTION FUNCTION WHEN BUTTON ID OF CONTINUE-BUTTON IS CLICKED--*/
    function gamePlay() {
        $('#answer-list').on('click', 'li', userSelection);
        $('#submit-button').click(function() {
            checkAnswer();
        });
        $('#continue-button').click(function() {
            nextQuestion();
        });
    }

    /*--INSERTS CONTENT FROM ALLQUESTIONS ARRAY USING .KEY & CURRENTQUESTION VAR TO SPECIFY VALUES ---*/
    function generateQuizContent() {
        if (currentQuestion < allQuestions.length) {
            $("#current-question-title").text(currentQuestion + 1);
            $('.question-text').text(allQuestions[currentQuestion].question);
            for (var i = 0; i < allQuestions[currentQuestion].answers.length; i++) {
                $('#answer-list').append('<li class="answers-text">' + allQuestions[currentQuestion].answers[i] + '</li>');
            }
        } else {
            /*---ONCE CURRENTQUESTION IS GREATER THAN ARRAY LENGTH, RESULTS PAGE IS PRESENTED ---*/
            showResults();
        }
    }


    /*---EVENT HANDLER IS SHUT OFF TO PREVENT MULTIPLE GUESSES
        -USER SELECTION CLASS IS CHANGED (HIGHLIGHTED YELLOW) --*/
    function userSelection() {
        $('#answer-list').off('click', 'li', userSelection);
        $(this).removeClass("answers-text").addClass("selected-answer");
    }

    /*  -EVENT HANDLER IS TURNED BACK ON FOR NEXT QUESTION 
        -TEXT OF SELECTION IS ISOLATED/COMPARED TO CORRECT ANSWER
        -SELECTION CLASS CHANGES ACCORDINGLY (HIGHLIGHTED RED/GREEN) 
        -BUTTON CLASS OF CONTINUE BUTTON APPEARS--*/
    function checkAnswer() {
        $('#answer-list').on('click', 'li', userSelection);
        if ($('.selected-answer').text() != allQuestions[currentQuestion].correct) {
            $('.selected-answer').addClass("wrong-answer").removeClass("selected-answer");
        } else if ($('.selected-answer').text() === allQuestions[currentQuestion].correct) {
            $('.selected-answer').addClass("right-answer").removeClass("selected-answer");
            $('#continue-button').show();
        }
    }
    /* --SCORE FOR EACH QUESTION IS TABULATED BY COUNTING # OF WRONG ATTEMPTS PRESENT--*/
    function addScore() {
        var partialScore = 0;
        var wrongAttempts = $('.wrong-answer').length;
        wrongAttempts == 3 ? partialScore = 1 : false;
        wrongAttempts == 2 ? partialScore = 2 : false;
        wrongAttempts == 1 ? partialScore = 3 : false;
        wrongAttempts == 0 ? partialScore = 4 : false;
        /*-- SCORE FOR INDIVIDUAL QUESTION IS ADDED TO SCORE VARIABLE--*/
        score = score + partialScore;
        /*--POINTS ALLOTTED FOR THAT QUESTION ARE PRESENTED IN QUIZ TRACKER DIV--*/
        $("#point-total").append('<li class="score-total">' + partialScore + '</li>');

    }

    /*---CONTENT FROM ARRAY IS CLEARED FOR NEXT QUESTION
        -NEXT BUTTON IS HIDDEN TO ENSURE SELECTION PROCESS OCCURS --*/
    function clearQuizItem() {
        $("#continue-button").hide();
        $(".question-text").empty();
        $(".answers-text, .wrong-answer, .right-answer").remove();
    }

    /*  -VAR IS INCREMENTED SO NEXT SET OF ARRAY VALUES ARE SELECTED
        -SCORE FOR PREVIOUS QUESTION IS TABULATED AND POSTED
        -PREVIOUS QUESTION/ANSWER VALUES ARE CLEARED
        -NEW QUIZ ITEM IS PRESENTED --*/
    function nextQuestion() {
        currentQuestion++;
        addScore();
        clearQuizItem();
        generateQuizContent();
    }

    /*---SCORE VAR (TOTAL OF ALL INDIVIDUAL QUESTION SCORES) IS PRESENTED
        -RESULTS PAGE IS PRESENTED
        -GAMERESET FUNCTION IS INITIALIZED AS NEW GAME BUTTON CLICK EVENT--*/
    function showResults() {
        computeFinalScore();
        $("#results").show();
        $("#quiz").hide();
        $('#new-game').click(gameReset);
    }

    /*---SCORE VARIABLE IS PRESENTED AS TEXT CONTENT
        -1 OF 2 FEEDBACK OPTIONS IS PRESENTED BASED ON GOOD SCORE VARIABLE--*/
    function computeFinalScore() {
        $('#results-input').text(score);
        if (score >= 11) {
            $(".bootsie-or-ballin").append("<p class='placement'>" + "Ballin'!" + '</p>');
        } else {
            $(".bootsie-or-ballin").append("<p class='placement'>" + "Bootsie" + '</p>');
        }
    }
    /*---WHEN CLICK EVENT OCCURS ON BUTTON WITH ID OF NEW-GAME
        -THIS FUNCTION RESETS VARIABLES, EMPTIES NECESSARY CONTENT
        -AND PRESENTS START SCREEN TO USER FOR A BRAND NEW GAME--*/
    function gameReset() {
        currentQuestion = 0;
        score = 0;
        $("#welcome-overlay").show();
        $("#quiz").show();
        $(".placement").empty();
        $("#results").hide();
        $('#point-total').empty();
    }
});
