
var contentLoop;

// function carouselInterval(){
//     var timer = false;
//     var displayTimer = false;
//     var timeLeft = 10;
//     this.start = function(){
//         if(!this.isRunning()){
//             timer = setInterval(nextBannerImg, 12000);
//             displayTimer = setInterval(this.displayTimer, 1000);
//         }
//     };
//     this.stop = function(){
//         clearInterval(timer);
//         timer = false;
//         clearInterval(displayTimer);
//         displayTimer = false;
//         timeLeft = 10;
//     };
//     this.isRunning = function(){
//         return timer !== false;
//     };
//     this.displayTimer = function(){
//         document.getElementsByClassName("carouselCtrl")[0].style.display = "flex";
//         document.getElementsByClassName("carouselCtrl")[0].querySelector("h1").innerHTML = String(timeLeft--);
//     }
// }

function carouselInterval(){
    var timer = false;
    var contentTimer = false;
    var isPaused = false;
    var timeLeft = 10;
    this.start = function(){
        if(!this.isRunning()){
            timer = setInterval(function(){
                if(!isPaused){
                    nextBannerImg();
                }
            }, 12000);
            contentTimer = setInterval(function() {
                if(!isPaused){
                    displayTimer(timeLeft);
                    timeLeft--;
                }
            },1000)
        }
    };
    this.stop = function(){
        clearInterval(timer);
        timer = false;
        clearInterval(contentTimer);
        contentTimer = false;
        timeLeft = 10;
    };
    this.pause = function(){
        isPaused = true;
        this.stop();
    }
    this.resume = function(){
        isPaused = false;
        this.start();
    }
    this.isRunning = function(){
        return timer !== false;
    }
    this.isPaused = function(){
        return isPaused !== false;
    }
}


function displayTimer(timeLeft){
    var timerText = document.getElementsByClassName("carouselCtrl")[0].querySelector("h1");

    timerText.innerHTML = timeLeft;
}

function nextBannerImg(){
    var imgCont = document.getElementsByClassName("mainContent")[0];
    var content = imgCont.getElementsByClassName("contentItem");
    var audioCtrl = document.getElementsByClassName("audioCtrl")[0];
    var unmuteBtn = document.getElementById("unmuteBtn");
    var muteBtn = document.getElementById("muteBtn");

    if(!contentLoop.isPaused()){
        contentLoop.stop();
        contentLoop.start();
    }

    var currentContentIndex = function(){
        for(var i=0; i < content.length; i++){
            if(content[i].classList.contains("currentContent")){
                return i;
            }
        }
    }();

    var currentContent = content[currentContentIndex];
    var nextContent;
    
    if(currentContentIndex !== content.length - 1){
        nextContent = content[currentContentIndex + 1];
    }else{
        nextContent = content[0];
    }

    currentContent.style.animation = "slideOutLeft 1s ease";
    nextContent.classList.add("currentContent");

    if(nextContent.tagName === "VIDEO"){
        nextContent.play();
        audioCtrl.style.display = "flex";
        
        if(nextContent.muted === false){
            unmuteBtn.style.display = "block";
        }else{
            muteBtn.style.display = "block";
        }
    }else{
        if(audioCtrl.style.display === "flex"){
            audioCtrl.style.display = "none"
        }

        if(unmuteBtn.style.display === "block"){
            unmuteBtn.style.display = "none";
        }else if(muteBtn.style.display === "block"){
            muteBtn.style.display = "none";
        }
    }

    nextContent.style.animation = "slideInLeft 1s ease";

    setTimeout(() => {
        if(currentContent.tagName === "VIDEO"){
            currentContent.pause();
            currentContent.currentTime = 0;
        }
        currentContent.classList.remove("currentContent");
    }, 990);
}

function prevBannerImg(){
    var imgCont = document.getElementsByClassName("mainContent")[0];
    var content = imgCont.getElementsByClassName("contentItem");
    var audioCtrl = document.getElementsByClassName("audioCtrl")[0];
    var unmuteBtn = document.getElementById("unmuteBtn");
    var muteBtn = document.getElementById("muteBtn");

    if(!contentLoop.isPaused()){
        contentLoop.stop();
        contentLoop.start();
    }

    var currentContentIndex = function(){
        for(var i=0; i < content.length; i++){
            if(content[i].classList.contains("currentContent")){
                return i;
            }
        }
    }();

    var currentContent = content[currentContentIndex];
    var prevContent;
    
    if(currentContentIndex !== 0){
        prevContent = content[currentContentIndex - 1];
    }else{
        prevContent = content[content.length - 1];
    }

    currentContent.style.animation = "slideOutRight 1s ease";
    prevContent.classList.add("currentContent");

    if(prevContent.tagName === "VIDEO"){
        prevContent.play();
        audioCtrl.style.display = "flex";
        
        if(prevContent.muted === false){
            unmuteBtn.style.display = "block";
        }else{
            muteBtn.style.display = "block";
        }
    }else{
        if(audioCtrl.style.display === "flex"){
            audioCtrl.style.display = "none"
        }

        if(unmuteBtn.style.display === "block"){
            unmuteBtn.style.display = "none";
        }else if(muteBtn.style.display === "block"){
            muteBtn.style.display = "none";
        }
    }
    
    prevContent.style.animation = "slideInRight 1s ease";

    setTimeout(() => {
        if(currentContent.tagName === "VIDEO"){
            currentContent.pause();
            currentContent.currentTime = 0;
        }
        currentContent.classList.remove("currentContent");
    }, 990);
}


function muteVideo(){
    var unmuteBtn = document.getElementById("unmuteBtn");
    var muteBtn = document.getElementById("muteBtn");
    var video = document.getElementsByClassName("mainContent")[0].getElementsByClassName("currentContent")[0];

    video.muted = true;
    
    unmuteBtn.style.display = "none";
    muteBtn.style.display = "block";
}
function unmuteVideo(){
    var unmuteBtn = document.getElementById("unmuteBtn");
    var muteBtn = document.getElementById("muteBtn");
    var video = document.getElementsByClassName("mainContent")[0].getElementsByClassName("currentContent")[0];

    video.muted = false;
    
    muteBtn.style.display = "none";
    unmuteBtn.style.display = "block";
}

function carouselScrollOff(){
    if(contentLoop.isRunning() === true){
        contentLoop.stop();
    }
    var currentContent = document.getElementsByClassName("mainContent")[0].getElementsByClassName("currentContent")[0];

    if(currentContent.tagName === "VIDEO"){
        currentContent.pause();
    }
}
function carouselScrollOn(){
    if(contentLoop.isRunning() !== true){
        contentLoop.start();
    }

    var currentContent = document.getElementsByClassName("mainContent")[0].getElementsByClassName("currentContent")[0];

    if(currentContent.tagName === "VIDEO"){
        currentContent.play();
    }
}
function pauseCarousel(){
    var timerText = document.getElementsByClassName("carouselCtrl")[0].querySelector("h1");
    var continueBtn = document.getElementsByClassName("carouselCtrl")[0].querySelector("img");

    timerText.style.display = "none";
    continueBtn.style.display = "block";

    // contentLoop.stop();
    contentLoop.pause();
}
function playCarousel(){
    var timerText = document.getElementsByClassName("carouselCtrl")[0].querySelector("h1");
    var continueBtn = document.getElementsByClassName("carouselCtrl")[0].querySelector("img");

    continueBtn.style.display = "none";
    timerText.style.display = "block";
    
    // contentLoop.start();
    contentLoop.resume();
}

function mainContentVisibility(){
    var mainContent = document.getElementsByClassName("mainContent")[0];
    var windowHeight = window.innerHeight;
    var bodyScrollAmount = window.scrollY;

    if(bodyScrollAmount > windowHeight){
        carouselScrollOff();
    }else{
        carouselScrollOn();
    }
}

window.addEventListener("load", function(){
    contentLoop = new carouselInterval();
    contentLoop.start();
});

window.addEventListener("scroll", function(){
    mainContentVisibility();
});