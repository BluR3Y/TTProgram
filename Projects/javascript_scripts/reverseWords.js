



function reverseWords(str) {      //A function that will reverse every word in a given string
    var words = str.split(" ");     //taking the string and using ' ' as a delimiter to only collect the words
    var reverseStr = "";        //A variable that will hold the reverse words

    for(var j = words.length - 1; j >= 0; j--) {    //loop through words in reverse order 
        reverseStr += `${words[j].split("").reverse().join("")} `;      //append the word in reverse
    }
    return reverseStr   //return the reverse string
}

console.log(reverseWords("Hello There my name is Rey"));