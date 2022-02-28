
document.addEventListener('DOMContentLoaded',()=>{

    // validate email
    function validateEmail(email){
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        
        if(!validRegex.test(email)){
            return false;
        } else {
            return true;
        }};

    // check if value is all letter
    function allLetter(myValue){
        let letters = /^[A-Za-z\s]+$/;
        if(!letters.test(myValue)) {
            return false;
        } else{
            return true;
        }
    }

    // check if value is between a given range
    function validateRange(myValue, minLength, maxLength){
        let myValueLength = myValue.length;
        if(myValueLength == 0 || myValueLength < minLength || myValueLength > maxLength){
            return false;
        } else {
            return true;
        }
    }


    // display error on screen
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
    
    
    // subscribe to the blog
    function subscribe(email){
        if(!validateEmail(email)){
            alert("please enter valid email");
        }
        else{
            alert("thanks for your subscription");
        }
    }

    document.querySelector(".footer__form").addEventListener('submit', (event)=>{
        event.preventDefault();

        let email = document.querySelector('.footer__email').value;
        subscribe(email);
    });



    function readBlog(){
        var blog=firebase.database().ref("Blogs/");
        blog.on("child_added",function(data){
            var blogValue=data.val();
            var cat = blogValue.title;  
        document.querySelector(".container").innerHTML+=`
                        <article class="card">
                            <div class="card__image">
                                <img src="${blogValue.link}" alt="">
                            </div>
                            <div class="card__content">
                                <h1 class="card__title">${blogValue.title}</h1>
                                <p class="card__description">${blogValue.summary}</p>
                                <a href="more.html" class="card--more">Read More</a>
                            </div>
                        </article>
                    `
        })    
    }

    readBlog();
    
})
