// import { showError } from '../../js/index.js';

document.addEventListener('DOMContentLoaded',()=>{

    function validateRange(myValue, minLength, maxLength){
        let myValueLength = myValue.length;
        if(myValueLength == 0 || myValueLength < minLength || myValueLength > maxLength){
            return false;
        } else {
            return true;
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

    function allLetter(myValue){
        let letters = /^[A-Za-z\s]+$/;
        if(!letters.test(myValue)) {
            return false;
        } else{
            return true;
        }
    }


    document.querySelector('.add-blog').addEventListener('click', ()=>{
        document.querySelector('.modal').style.display = 'block';
    });

    document.querySelectorAll('.action').forEach(function(action){
        action.addEventListener('mouseover', ()=>{
            action.children[1].style.visibility = 'visible'
        });

        action.addEventListener('mouseout', ()=>{
            action.children[1].style.visibility = 'hidden'
        });
    });


    document.querySelector('.blog--add').addEventListener('submit', (event)=>{
        event.preventDefault();

        let title = document.querySelector('.blog__title').value;
        let summary = document.querySelector('.blog__summary').value;
        let content = document.querySelector('.blog__content').value;

        if(!validateRange(title, 5, 30)){
            showError('Please enter title with character between 5 and 30', 'blog--title');
        }
        if(!validateRange(summary, 5, 50)){
            showError('Please enter summary with characters between 5 and 50', 'blog--summary');
        }
        if(content.length == 0){
            showError('Please enter your blog content', 'blog--content');
        }
    });

    document.querySelector('.close').addEventListener('click', ()=>{
        document.querySelector('.modal').style.display = 'none';
    })

    
})