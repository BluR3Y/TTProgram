
function displayHeader(event){
    if(event.deltaY > 0){
        document.getElementsByClassName("pageHeader")[0].style.top = "-60px";
    }else{
        document.getElementsByClassName("pageHeader")[0].style.top = "0";
    }
    document.getElementsByClassName("pageHeader")[0].style.transition = "top 0.5s";
}