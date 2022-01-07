
function expandMenu(){
    contentMenu = document.getElementsByClassName("contentMenu")[0];
    contentMenu.classList.add("showContentMenu");
}

var mottoAppend = function(textElements,index){
    this.allEls = textElements;
    this.elementIndex = index;
    this.loopNum = 0;
    this.currentEl = textElements[this.elementIndex];
    this.text = JSON.parse(this.currentEl.getAttribute('data-type'))[0];
    this.tick();
}

mottoAppend.prototype.tick = function(){
    var addingChar = this.text[this.loopNum];

    if(this.currentEl.querySelector('span') != null){
        this.currentEl.querySelector('span').innerHTML += addingChar;
    }else{
        this.currentEl.innerHTML += addingChar;
    }

    if(addingChar === ' '){
        this.currentEl.innerHTML += '<span></span>';
    }

    if(this.loopNum === this.text.length - 1){
        if(this.allEls[this.elementIndex + 1] !== undefined){
            new mottoAppend(this.allEls, this.elementIndex+1);
            return;
        }else{
            return;
        }
    }

    this.loopNum += 1;
    var that = this;
    // var delta = 150 - Math.random() * 150;
    setTimeout(() => {
        that.tick();
    }, 50);
};

function displayMotto(){
    var textCont = document.getElementsByClassName("previewText")[0];
    var textElements = textCont.querySelectorAll('h1');

    new mottoAppend(textElements,0);
}

// var mottoAppend = function(el, elText){
//     this.text = elText;
//     this.el = el;
//     this.loopNum = 0;
//     this.tick();
// }

// mottoAppend.prototype.tick = function(){
//     var addingChar = this.text[this.loopNum];

//     if(this.el.querySelector('span') != null){
//         this.el.querySelector('span').innerHTML += addingChar;
//     }else{
//         this.el.innerHTML += addingChar;
//     }

//     if(addingChar === ' '){
//         this.el.innerHTML += '<span></span>';
//     }

//     if(this.loopNum === this.text.length - 1){
//         return;
//     }

//     this.loopNum += 1;
//     var that = this;
//     var delta = 150 - Math.random() * 50;
//     setTimeout(() => {
//         that.tick();
//     }, delta);
// };

// function displayMotto(){
    // var textCont = document.getElementsByClassName("previewText")[0];
    // var textElements = textCont.querySelectorAll('h1');
    
//     for(var i=0; i < textElements.length; i++){
//         var fullText = JSON.parse(textElements[i].getAttribute('data-type'))[0];
//         new mottoAppend(textElements[i], fullText);
//     }
// }

window.addEventListener("load", ()=>{
    // displayMotto();
});
