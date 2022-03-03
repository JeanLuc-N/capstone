document.addEventListener('DOMContentLoaded', ()=>{

    auth.onAuthStateChanged(user => {
        if(user)
        {
            console.log(user.email + " is logged in")
       

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

    function readMessage() {

        var message=firebase.database().ref("message/");
        message.on("child_added",function(data){
            var message=data.val();
        document.querySelector(".dash-content").innerHTML+=`
                        <div class="message-cart">
                            <div class="message__header">
                                <span>${message.name}</span>
                                <div><i class="fa fa-calendar" aria-hidden="true"></i><span>${message.nowDate}</span></div>
                            </div>
                            <div class="message__content">
                                <p>${message.message}</p>
                                <button class="message__btn">Reply</button>
                            </div>
                        </div>      
                    `
        })    
    }

    readMessage();

    document.querySelectorAll('.message__btn').forEach(function(button){
        button.addEventListener('click', ()=>{
            document.querySelector('.modal').style.display = 'block';
        });

    });

    
    document.querySelector('.close').addEventListener('click', ()=>{
        document.querySelector('.modal').style.display = 'none';
    });

    document.querySelector('.blog-form').addEventListener('submit', (event)=>{
        event.preventDefault();

        let content = document.querySelector('.blog__content').value;

        if(content.length == 0){
            showError('Please enter your message', 'blog--content');
        }
    });
}
else {
    window.location.replace('../index.html')
}
})

})

const logoutBtn = document.querySelector('#logout-btn');
logoutBtn.addEventListener('click', e=> {
    e.preventDefault();
    auth.signOut();
    console.log("User signout!");
    window.location.replace('../index.html');
})
