var buttonColours=["red", "blue", "green", "yellow"] ;
var gamePattern=[];
var userClickedPattern=[];   
var level=0;
var gameStarted=false ;

//starting the game 
$(document).on("keydown",function(){
    if(!gameStarted){
        $("#level-title").text("Level "+level);

        nextSequence();
        gameStarted=true;
    }
});


$(".btn").on("click",function(){
    userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour) ;
    playSound(userChosenColour);
    animatePress($(this).attr("id"));

    checkAnswer(userClickedPattern.length -1) ;
    
});

function nextSequence(){
    userClickedPattern = [] ;
    level++;
    $("#level-title").text("Level "+ level ) ;
    var randomNumber = Math.round(3.5*Math.random()) ;
    var randomChosenColour=buttonColours[randomNumber] ;
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);

    
}


function animatePress(currentColour){
    var loc=$("#" + currentColour);
    loc.addClass("pressed");

    setTimeout(function() {
        loc.removeClass("pressed");
    }, 100);
    
}



function playSound(name){
    var music = new Audio("sounds/" + name +".mp3");
    music.play();
}


function checkAnswer(currentLevel){

    if (userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        // console.log("success");
        if (gamePattern.length==userClickedPattern.length){
            setTimeout(nextSequence,1000);
        }

    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);


        startOver();
    }
}

function startOver() {
    level=0;
    gamePattern=[];
    gameStarted= false;
    
}



