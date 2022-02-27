
document.addEventListener('DOMContentLoaded',()=>{
    function validateEmail(email){
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        
        if(!validRegex.test(email)){
            return false;
        } else {
            return true;
        }};

    function allLetter(myValue){
        let letters = /^[A-Za-z\s]+$/;
        if(!letters.test(myValue)) {
            return false;
        } else{
            return true;
        }
    }

    function validateRange(myValue, minLength, maxLength){
        let myValueLength = myValue.length;
        if(myValueLength == 0 || myValueLength < minLength || myValueLength > maxLength){
            return false;
        } else {
            return true;
        }
    }
    
    
    
    function subscribe(email){
        if(!validateEmail(email)){
            alert("please enter valid email");
        }
        else{
            alert("thanks for your subscription");
        }
    }

    function showError(errorMessage, elemClass){
        let newDiv = document.createElement("div");
        let message = document.createTextNode(errorMessage);

        newDiv.appendChild(message);
        newDiv.setAttribute('class', 'error');
        let currentDiv = document.querySelector("."+elemClass);
        currentDiv.prepend(newDiv);

        setTimeout(function(){
            newDiv.remove();
          }, 5000);

    }

    document.querySelector(".footer__form").addEventListener('submit', (event)=>{
        event.preventDefault();

        let email = document.querySelector('.footer__email').value;
        subscribe(email);
    })

    document.querySelector('.contact__form').addEventListener('submit', (event)=>{
        event.preventDefault();

        let counter = 0;

        let name = document.querySelector('.contact__name').value;
        let email = document.querySelector('.contact__email').value;
        let subject = document.querySelector('.contact__subject').value;
        let message = document.querySelector('.contact__message').value;

        if(!allLetter(name)){
            showError('name must contain characters only', 'contact--name');
            counter ++;
        }
        if(!validateEmail(email)){
            showError('Please enter correct email', 'contact--email');
            counter ++;
        }
        if(!validateRange(subject, 5, 20)){
            showError('Subject must be between range of 5 to 20 characters', 'contact--subject');
            counter ++;
        }
        if(message.length == 0){
            showError('Please insert your message', 'contact--message');
            counter ++;
        }
        if(counter == 0){
            alert('all good');
        }
    })

    
})
