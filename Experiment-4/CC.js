//This will take the elem from text area from htlm using its id;
let textarea = document.getElementById("textInput");

//elem where we will display our char count bascially ID = CharacterCount;
let counter = document.getElementById("charCount");

// this part run every time the event happens :D
textarea.addEventListener("input", function(){
    let length = textarea.value.length;
    counter.textContent = length;
});
