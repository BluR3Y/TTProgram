
function expandMenu(){
    contentMenu = document.getElementsByClassName("contentMenu")[0];
    contentMenu.classList.add("showContentMenu");
}

function displayBackDrop(){
    var blur = document.getElementsByClassName("pageBackDrop")[0];
    
    if(!blur.classList.contains("displayBackDrop")){
        blur.classList.add("displayBackDrop");
    }else{
        blur.classList.remove("displayBackDrop");
    }
}
function clickedBackDrop(){
    var blur = document.getElementsByClassName("pageBackDrop")[0];
    var sideMenu = document.getElementsByClassName("sideMenu")[0];

    blur.classList.remove("displayBackDrop");

    if(sideMenu.classList.contains("showSideMenu")){
        sideMenu.classList.remove("showSideMenu");
    }
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

function showSideMenu(){
    var sideMenu = document.getElementsByClassName("sideMenu")[0];

    if(!sideMenu.classList.contains("showSideMenu")){
        sideMenu.classList.add("showSideMenu");
    }else{
        sideMenu.classList.remove("showSideMenu");
    }
    displayBackDrop();
}

function displayRecipes(){
    var recipeCont = document.getElementsByClassName("recipeContainer")[0];
    var recipeItems = recipeCont.getElementsByClassName("recipeItem");

    var filterCont = document.getElementsByClassName("filterBtns")[0];
    var filterBtns = filterCont.getElementsByTagName('button');
    var filterIndex = (()=>{
        for(var i=0; i < filterBtns.length; i++){
            if(filterBtns[i].classList.contains('selectedFilter')){
                return i;
            }
        }
        return -1;
    })();

    if(!filterIndex){
        for(var j=0; j < recipeItems.length; j++){
            if(!recipeItems[j].classList.contains('displayRecipe')){
                recipeItems[j].classList.add('displayRecipe');
            }
        }
    }else{
        selectedFilter = (()=>{
            switch (filterIndex) {
                case 1:
                    return "breakfastRecipe";
                case 2:
                    return "lunchRecipe";
                case 3:
                    return "dinnerRecipe";
                case 4:
                    return "dessertRecipe";
                default:
                    break;
            }
        })();

        for(var j=0; j < recipeItems.length; j++){
            if(recipeItems[j].classList.contains(selectedFilter)){
                if(!recipeItems[j].classList.contains('displayRecipe')){
                    recipeItems[j].classList.add('displayRecipe');
                }
            }else{
                if(recipeItems[j].classList.contains('displayRecipe')){
                    recipeItems[j].classList.remove('displayRecipe');
                }
            }
        }
    }
}

function updateFilter(element){
    var filterCont = document.getElementsByClassName("filterBtns")[0];
    var filterBtns = filterCont.getElementsByTagName('button');

    for(var i=0; i < filterBtns.length; i++){
        if(filterBtns[i] === element){
            if(!filterBtns[i].classList.contains('selectedFilter')){
                filterBtns[i].classList.add('selectedFilter');
            }
        }else{
            if(filterBtns[i].classList.contains('selectedFilter')){
                filterBtns[i].classList.remove('selectedFilter');
            }
        }
    }
    displayRecipes();
}

function collapseSideFilters(){
    var filterCont = document.getElementsByClassName("sideFilterBtns")[0];

    if(!filterCont.classList.contains('showSideFilters')){
        filterCont.classList.add('showSideFilters');
    }else{
        filterCont.classList.remove('showSideFilters');
    }
}

function sideFilterSelected(elem){
    var filterText = elem.innerHTML;

    var filterCont = document.getElementsByClassName("filterBtns")[0];
    var filterBtns = filterCont.getElementsByTagName('button');

    for(var i=0; i < filterBtns.length; i++){
        if(filterBtns[i].innerHTML === filterText){
            if(!filterBtns[i].classList.contains('selectedFilter')){
                filterBtns[i].classList.add('selectedFilter');
            }
        }else{
            if(filterBtns[i].classList.contains('selectedFilter')){
                filterBtns[i].classList.remove('selectedFilter');
            }
        }
    }
    collapseSideFilters();
    showSideMenu();
    displayRecipes();
}

window.addEventListener("load", ()=>{
    displayMotto();
    displayRecipes();
});
