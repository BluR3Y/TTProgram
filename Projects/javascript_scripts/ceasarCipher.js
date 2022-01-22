
function ceasarCipher(numRotates, message){     //A function which will encrypt a message, given a key
    message = message.toLowerCase();
    alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    possibleRotates = alphabet.length;
    finalMessage = "";

    for(var i=0; i < message.length; i++){  //Outer forloop that will loop through the entire message
        for(var j=0; j < possibleRotates; j++){ //An inner for loop that will loop through all the characters in the alphabet
            if(alphabet[j] === message[i]){     //if the current alphabetical character that is being looped is equal to the current character from the message that is being looped, then the if statement evaluates to true
                if((j + 1) + numRotates <= possibleRotates){    //If the index of the aphabetical character plus the number of rotatations, is less than or equal to the the number of alphabetical characters, if statement evaluates to true 
                    finalMessage += alphabet[j+numRotates];     //The alphabetical character at the index of j plus the number of rotations, will be appended to the finalMessage
                }else{                                  
                    finalMessage += alphabet[numRotates - (possibleRotates - j)];       //If the sum of the index plus the number of rotations is greater than the number of alphabetical characters, start back at index 0 and increment from there
                }
            }
        }
    }
    console.log(finalMessage)
}

ceasarCipher(3, "wxyz");        //Call the function and pass the number of rotations and message as arguments