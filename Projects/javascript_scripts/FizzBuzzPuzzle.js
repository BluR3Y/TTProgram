
function fizzBuzz(num){     //A function that when called will print fizz or fizz buzz 
    for(var i=1; i <= num; i++){        //Looping through 1 until the value the user provided
        printStmt = '';                 //An empty string that will have the words fizz and buzz appended to it if they are divisible by 3 and 5
        if(i % 3 === 0){                //If divisible by 3 then the word fizz will be appended
            printStmt += "Fizz";        //If divisible by 5 then the word buzz will be appended
            if(i % 5 === 0){
                printStmt += " Buzz";
            }
        }
        console.log(i + ": " + printStmt);      //A print statement that will print the current looping value and the words stored in printStmt
    }
}

fizzBuzz(100);      //Calling the function and passing 100 as an argument in its parameter