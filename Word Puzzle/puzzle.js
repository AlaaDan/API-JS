const wordsWithMsg = [
    {
        msg: "Raise FOUR to FIVE",
        startWord: "FOUR",
        endWord: "FIVE"
    },
    {
        msg: "Cover EYE with LID",
        startWord: "EYE",
        endWord: "LID"
    },
    {
        msg: "Crown TIGER with ROSES",
        startWord: "TIGER",
        endWord: "ROSES"
    },
    {
        msg: "Make WHEAT into BREAD",
        startWord: "WHEAT",
        endWord: "BREAD"
    }

];



async function gameEngin (object, newWord) {
    const BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
    let postion = 0;
    let allInputs = document.querySelectorAll("input");
    //console.log(newWord)
    
    allInputs.forEach((input, index)=>{
        if(input.value === object.startWord[index])
            postion = index
        
    })
    
    let diff = 0;
    for (let i = 0; i < newWord.length; i++) {
        if(newWord[i] !== object.startWord[i]) {
            diff++;  
        }
    }
    
    if (diff === 1) {
        if(newWord === object.endWord) {
            alert("You win");
            location.reload()
        }
        else{
            let response = await fetch(`${BASE_URL}${newWord}`);
            if(response.status === 404){
                allInputs.forEach((x, index) =>{
                    x.value = object.startWord[index];
        
                })
                alert("This word is not an valid English word ")
            }
            else{
                object.startWord = newWord
                let rightWords = document.createElement('li');
                rightWords.innerHTML = `<li>${object.startWord}</li>`;
                document.querySelector('.right_words').append(rightWords);
                //console.log(rightWords)
                //document.querySelector('.right_words').innerHTML = `<li>${object.startWord}</li>`
                
            }
            //console.log(response);
        }
        
    }
    else{
        allInputs.forEach((x, index) =>{
            x.value = object.startWord[index];
        })
    }
    
}



function gettingNewWord(wordObject){
    let allInputs = document.querySelectorAll('input');
    document.addEventListener('keydown', (event) =>{
        let inputValue = '';
        if (event.key === "Enter"){
            allInputs.forEach((input, index)=>{
                inputValue += input.value.toUpperCase()
                
            })
        gameEngin(wordObject, inputValue)
            //console.log('This is the new output',inputValue)
        }
    });
   
}


function createWordInput(word){
    let wordObject = word;
    let section = document.querySelector('.word-box');
    let message = document.createElement('h2');
    let div = document.querySelector('div');
    message.innerText = `${word.msg}`;
    div.append(message)
    for (let i = 0; i < word.startWord.length; i++) {
        //console.log(i);
        let inputtoHMTL = document.createElement('input');
        inputtoHMTL.setAttribute('type', "text");
        inputtoHMTL.setAttribute('maxlength', "1");  
        inputtoHMTL.setAttribute('onClick', 'this.select()');
        inputtoHMTL.setAttribute('value', word.startWord[i]);
        section.append(inputtoHMTL);
    }  
    gettingNewWord(wordObject)
}

function randomWord(){
    let wordObject = wordsWithMsg[Math.floor(Math.random()* wordsWithMsg.length)];
    createWordInput(wordObject)
}

randomWord()




function checkDifferentString(str1, str2) {
    let diff = 0;
    if (str1 === str2) return true;
    let lengthDiff = Math.abs(str1.length - str2.length)
    if (lengthDiff > 1) return false;
  
    for (let i=0; (i<str1.length || i < str2.length);i++) {
      if (diff > 1) return false;
      if (str1.charAt(i) !== str2.charAt(i)) diff++
      start[index] !== newword[index]
    }
    if (diff <= 1) return true
    else return false;
  }