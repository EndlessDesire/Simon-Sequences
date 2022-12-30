
alert("The Simon game is the exciting electronic game of lights and sounds in which players must repeat random sequences of lights by pressing the colored pads in the correct order. It's fast-paced play, with lights and sounds that can challenge you. Experience the fun as you repeat the patterns and advance to higher levels.")
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
 var userClickedPattern=[];
 var started=false;
 var level =0;
 
 $(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
    nextSequence();
    started=true;
}  
});


$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playsound(userChosenColour);

    animationPress(userChosenColour);
  // we want to check the last level of user array not last element 
    checkAnswer(userClickedPattern.length-1);

});
function checkAnswer(currentLevel){
 if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
          console.log("success");

    if(userClickedPattern.length===gamePattern.length){

      setTimeout(function(){

        nextSequence();
        
      },1000);
    }
    
 }
 
 else{
    console.log("wrong");

    playsound("wrong");

    $("body").addClass("game-over");

    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key To Restart");
    startover();
 }
}
function nextSequence() {
    userClickedPattern=[];
    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playsound(randomChosenColour);
   
}
function playsound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animationPress(currentColour) {

    $("#"+currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}
function startover(){
    level =0;
    gamePattern=[];
    started=false;
}


