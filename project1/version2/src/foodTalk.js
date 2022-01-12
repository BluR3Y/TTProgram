
function displayBackDrop(){     //A function that will display or hide a blur container which covers the entire page
    var blur = document.getElementsByClassName("pageBackDrop")[0];      //creates a temporary variable which is set to the blur element
    
    if(!blur.classList.contains("displayBackDrop")){       //if the blur element does not contain the class "displayBackDrop", then it is currently hidden and must be shown
        blur.classList.add("displayBackDrop");      //adds the class "displayBackDrop", which will make the blur element shown
    }else{                                           //if the element contains the class "displayBackDrop", the it is already showing, thus it must now be hidden
        blur.classList.remove("displayBackDrop");   //removes the class "displayBackDrop" from the element
    }
}
function clickedBackDrop(){         //A function which allows the blur backdrop to be hidden if clicked on by user
    var blur = document.getElementsByClassName("pageBackDrop")[0];      //A temporary variable which is set to the blur element
    var sideMenu = document.getElementsByClassName("sideMenu")[0];      //A temporary variable which is set to the side menu element

    blur.classList.remove("displayBackDrop");       //The user being able to click on the blur element signifies that it was displayed, and must now be hidden

    if(sideMenu.classList.contains("showSideMenu")){    //If the side menu contains the class "showSideMenu", then it is open and must now be closed
        sideMenu.classList.remove("showSideMenu");  //removes the class "showSideMenu" from the menu element
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

function showSideMenu(){        //A function that displays and hides the side menu
    var sideMenu = document.getElementsByClassName("sideMenu")[0];  //A temporary variable which is set to the side menu element
    var btnCont = document.getElementsByClassName("headerMenuBtn")[0];  //A temporary variable which is set to the side menu button container

    if(!btnCont.classList.contains('openMenu')){    //if the side menu button container does not contain the class "openMenu", then the animation is set to closed, and should be changed to
        btnCont.classList.add('openMenu');          //Add the class "openMenu" to the container to change the animation from closed to open
    }else{                                          //if the side menu button container contains the class "openMenu", then the animation is set to open and should be changed to close
        btnCont.classList.remove('openMenu');       //Remove the class "openMenu" from the container to change the animation to closed
    }

    if(!sideMenu.classList.contains("showSideMenu")){   //If the side menu does not contain the class "showSideMenu", the it is currently closed and should be opened
        sideMenu.classList.add("showSideMenu");         //Add the class "showSideMenu", to the side menu to open it
    }else{                                              //If the side menu does contain the class, then it is currently open and should be changed to closed
        sideMenu.classList.remove("showSideMenu");      //Remove the class to close the side menu
    }
    displayBackDrop();      //Call the function displayBackDrop() to hide or show the blur backdrop
}

function displayRecipes(){          //A crucial function that displays recipes based on user selected filters
    var recipeCont = document.getElementsByClassName("recipeContainer")[0];     //A variable set to the container where the recipes are housed
    var recipeItems = recipeCont.getElementsByClassName("recipeItem");          //An array of recipe elements

    var filterCont = document.getElementsByClassName("filterBtns")[0];          //A variable set to the container where the filter buttons are housed
    var filterBtns = filterCont.getElementsByTagName('button');                 //An array of all the possible filter buttons
    var filterIndex = (()=>{                                            //A variable set to the return item of a function which loops through every filter button to check which filter was chosen by the user
        for(var i=0; i < filterBtns.length; i++){                       //loops through every button in the variable filterBtns
            if(filterBtns[i].classList.contains('selectedFilter')){     //if the button contains the class "selectedFilter", it is the chosen filter
                return i;                                               //return the index of the selected filter button
            }
        }
        return -1;                                                      //if no filter button is chosen, return -1
    })();

    if(!filterIndex){                                                   //if the filterIndex is 0, then the filter chosen is All, so all recipes should be displayed
        for(var j=0; j < recipeItems.length; j++){                      //loop through every recipe in the array recipeItems
            if(!recipeItems[j].classList.contains('displayRecipe')){    //if the recipeItem doesn't have the class 'displayRecipe', then add it to make the recipe shown
                recipeItems[j].classList.add('displayRecipe');          //add the class "displayRecipe" to the recipeItem to be shown
            }
        }
    }else{                                                              //for every other filter that isn't 0, must hide and show only certain recipes
        var selectedFilter = (()=>{                                         //A variable which is set to the return item of a function which returns a class name, correlating to the filterIndex
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

        for(var j=0; j < recipeItems.length; j++){                  //loop throght every recipeItem in recipeItems
            if(recipeItems[j].classList.contains(selectedFilter)){          //if the recipeItem contains the class assigned to selectedFilter, then make that recipe shown
                if(!recipeItems[j].classList.contains('displayRecipe')){    //If the recipe that should be shown, is not currently shown, then add the class "displayRecipe", to make it shown
                    recipeItems[j].classList.add('displayRecipe');
                }
            }else{                                                  //if the recipeItem does not contain the class assigned to selectedFilter, then hide the recipe
                if(recipeItems[j].classList.contains('displayRecipe')){     //If the recipe is currently shown, remove the class "displayRecipe" to make it hidden
                    recipeItems[j].classList.remove('displayRecipe');
                }
            }
        }
    }
}

function updateFilter(element){                                         //A function that updates the selected filter. The argument passed in the function is the element that called the function
    var filterCont = document.getElementsByClassName("filterBtns")[0];  //A variable that is set to the container housing all the filter buttons
    var filterBtns = filterCont.getElementsByTagName('button');         //An array that contains all the filter buttons

    for(var i=0; i < filterBtns.length; i++){                           //loop through every button in filterBtns
        if(filterBtns[i] === element){                                  //if a looping filter button is equal to the element that called the function, then that button should be set to the new filter
            if(!filterBtns[i].classList.contains('selectedFilter')){    //if the selected filter button is not already set to be the selected filter button then make it so
                filterBtns[i].classList.add('selectedFilter');          //add the class "selectedFilter" to the button that equals to the called element, essentially making it the new selected filter button
            }
        }else{                                                          //if the looping element is not equal to the element that called the function, then make sure it isn't set to selected filter
            if(filterBtns[i].classList.contains('selectedFilter')){     //if the looping element contains the class "selectedFilter", then remove it, no longer making it the selected filter button
                filterBtns[i].classList.remove('selectedFilter');       //remove the class "selectedFilter" from the looping element
            }
        }
    }
    displayRecipes();                                                   //After the new selected filter button is set, call the function displayRecipes()
}

function collapseSideFilters(){                                        //A function that will expand and collapse the filter selection in the side menu
    var filterCont = document.getElementsByClassName("sideFilterBtns")[0];      //A variable set to the container housing all the buttons in the side menu

    if(!filterCont.classList.contains('showSideFilters')){          //if the filter container does not contain the class "showSideFilters", then it is currently collapsed and should be expanded
        filterCont.classList.add('showSideFilters');                //add the class "showSideFilters"  to expand the container
    }else{                                                          //if the container currently has the class "showSideFilters", then it is currently expanded and should be collapsed
        filterCont.classList.remove('showSideFilters');             //Remove the class "showSideFilters" to collapse the container
    }
}

function sideFilterSelected(elem){                       //A function that changes the current selected filter button. The element that called the function is passed as an argument
    var filterText = elem.innerHTML;                    //A variable which is set to the text inside the passed element

    var filterCont = document.getElementsByClassName("filterBtns")[0];      //A variable which is set to the container that houses all the filter buttons in the side menu
    var filterBtns = filterCont.getElementsByTagName('button');             //An array that contains all the filter buttons in the side menu

    for(var i=0; i < filterBtns.length; i++){               //loop through all the filter buttons in filterBtns
        if(filterBtns[i].innerHTML === filterText){         //if the text inside the current looping element is equal to the text in the element that called the function
            if(!filterBtns[i].classList.contains('selectedFilter')){            //If the looping element does not contain the class "selectedFilter", add it
                filterBtns[i].classList.add('selectedFilter');                  //Add the class "selectedFilter" to the filter button
            }
        }else{                                                                  //If the text inside the looping element is not equal to the text in the element that called the function
            if(filterBtns[i].classList.contains('selectedFilter')){              //if the looping element contains the class "selectedFilter", then remove it, no longer making it the selected filter button
                filterBtns[i].classList.remove('selectedFilter');               //remove the class "selectedFilter" from the looping element
            }
        }
    }
    collapseSideFilters();                                                      //call the function collapseSideFilter() - collapsing the side menu filter buttons
    showSideMenu();                                                             //call the function showSideMenu() - closes side menu
    displayRecipes();                                                           //call the function displayRecipes() - updates the new recipes that should be shown
}

window.addEventListener("load", ()=>{           //creates an eventlistener which is called when the page loads
    displayMotto();                 //call the function displayMotto()
    displayRecipes();               //call the function displayRecipes()
});
