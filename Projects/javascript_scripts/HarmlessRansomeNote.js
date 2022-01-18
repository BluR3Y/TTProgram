
var ransomeNote = "Worlds";
var magazine = "Hello World There Worlds";

function canbeConstructed(passedMag, passedNote){
    var magazine = passedMag.toLowerCase();
    var note = passedNote.toLowerCase();
    var magLength = magazine.length;
    var noteLength = note.length;
    var matchedChars = "";

    for(var i=0; i < magLength; i++){
        if(magazine[i] === note[matchedChars.length]){
            matchedChars += magazine[i];
            if(matchedChars == note){
                break;
            }
        }else{
            matchedChars = [];
        }
    }
    if(matchedChars === note){
        return true;
    }else{
        return false;
    }
}

console.log(canbeConstructed(magazine, ransomeNote))