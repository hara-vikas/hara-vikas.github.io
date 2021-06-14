//DOM elements
const passwordLength = document.getElementById("length");
const haveUppercaseLetter = document.getElementById("uppercase");
const haveLowercaseLetter = document.getElementById("lowercase");
const haveNumbers = document.getElementById("numbers");
const haveSymbols = document.getElementById("symbols");
const resultArea = document.getElementById("result");
const clipBoard = document.getElementById("clipboard");

//An object to store functions
const randomFunc = {
    upper: getUppercaseLetters,
    lower: getLowercaseLetters,
    number: getNumbers,
    symbol: getSymbols
};

//function to call generatePassword
function generate() {
    const length = parseInt(passwordLength.value);
    const includeUpper = haveUppercaseLetter.checked;
    const includeLower = haveLowercaseLetter.checked;
    const includeNumber = haveNumbers.checked;
    const includeSymbol = haveSymbols.checked;
    resultArea.innerText = generatePassword(length,includeUpper,includeLower,includeNumber,includeSymbol);
}
//Generating Password
function generatePassword(length,upper,lower,number,symbol){
    let generatedPassword = '';//Initialising the password string
    const typesCount = upper + lower + number + symbol;
    const typesArray = [{upper},{lower},{number},{symbol}].filter(item => Object.values(item)[0]);
    if(typesCount == 0)//return nothing if nothing given
    {
        return '';
    }
    else{
        // for(let i = 0;i < length;i++)
        // {
        //     let c = Math.floor(Math.random() * typesArray.length);
        //     var mFunc = Object.keys(typesArray[c])[0];
        //     generatedPassword += randomFunc[myFunc]();
        // }
        for(let i = 0;i < length;i += typesCount)
        {
            typesArray.forEach(getvalue);
            //forEach value takes in a callback method which iterates through every value of the array
            function getvalue(value)
            {
                myFunc = Object.keys(value)[0];//Object is a type which contains keys and values as methods and it takes 
                //1 argument which is the object name
                generatedPassword += randomFunc[myFunc]();//getting the character and assigning it to password string
            }
        }
        return generatedPassword.slice(0,length);
    }
}
// Copy password to clipboard 
clipBoard.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultArea.innerText;

    if(!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert("Password copied to clip board");
})
//Functions to generate password characters
//there are 4 types of characters:
/*
1: Uppercase Letters
2: Lowercase Letters
3: SpecialSymbols
4: Numbers
*/

function getLowercaseLetters() {
    return String.fromCharCode(Math.floor(Math.random()*26) + 97);
}

function getUppercaseLetters() {
    return String.fromCharCode(Math.floor(Math.random()*26) + 65);
}

function getNumbers() {
    return String.fromCharCode(Math.floor(Math.random()*10)+48);
}

function getSymbols() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random()*symbols.length)];
}
