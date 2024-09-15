alert("Welcome to Aditya's game!!!");
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedpattern=[];
var started = false;
var level= 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level"+level);
        
        nextSequence();
        started=true;
    }
});
$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedpattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedpattern.length-1);    
});

function checkAnswer(curentLevel){
    if(gamePattern[curentLevel]===userClickedpattern[curentLevel]){
        console.log("success");
    
        if(userClickedpattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Lode lag gye tumhare hehehe!!! press any key to Restart.");
        startOver();
    }

}

function nextSequence(){
    userClickedpattern=[];
    level ++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour  = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
 
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(curentColor){
    $("#"+curentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+curentColor).removeClass("pressed");
    },100);
}

function startOver(){
    level = 0;
    gamePattern=[];
    started=false;
}

