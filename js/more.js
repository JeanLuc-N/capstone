var d = new Date();
var t = d.getTime();
var counter = t;
document.addEventListener('DOMContentLoaded',()=>{
    let id = localStorage.getItem("id");

    function oneBlog(id){

        firebase.database().ref('Blogs/'+id).on("value",function(snapshot){
            
            document.querySelector(".blog-more").innerHTML+=`
            <div class="blog-title">
            <h1>${snapshot.val().title}</h1>
            </div>
            <div class="blog-owner">
                <img src="assets/luc.jpeg" alt="admin" width="50px" height="50px">
                <span><small>written by</small> Ndayishimiye Jean Luc</span>
            </div>
            <img src="${snapshot.val().link}" class="blog-image">

            <div class="blog-summary">
                <p>
                ${snapshot.val().summary}
                </p>
            </div>
            <div class="blog-content">
                <p>
                ${snapshot.val().subject}
                </p>
            </div>
            <div class="blog-content">
              <div id="comment-section" class="comment">
              <input type="text" class="contact__email"  id="email" placeholder="enter email">
                <textarea id="adcomment" class="text blog__content" rows="4" cols="50"></textarea>
                <button onclick="add(${snapshot.val().id})"><i class="fas fa-plus-circle">add comment</i></button>
            </div>
            <div id="${snapshot.val().id}">
                </div>
                <button class="readmore" type="submit" onclick="readComment(${snapshot.val().id})">read Comment</button>
            </div>
        `

        })
                
     }

     
    oneBlog(id);
});

//add comment

function add(id){
    com = document.getElementById("adcomment").value;
    email = document.getElementById("email").value;
    console.log(email);
    
    counter+=1;
    firebase.database().ref('Comments/'+id+'/'+counter).set({
        id:counter,
        email:email,
        comment:com

    });
    document.getElementById("adcomment").value="";
    document.getElementById("email").value="";
    alert('Comment added');
}

//read comment

function readComment(id)
{
    var c =id;
    var a =1640190017618;
   var n =0;
     console.log(id);
            var co=firebase.database().ref("Comments/"+id+"/");
            co.on("child_added",function(data){
                var comValue=data.val();
        document.getElementById(id).innerHTML+=`
        <ul id=list class="reply">
            <li id="list-item">
                <div class="col">
                    <div class="col1">
                        <div class="blog-text">
                        <p style="display:none;">${comValue.id}</p>
                            <h2 class="reply-email">${comValue.email}</h2>
                            <h2 class="reply-comment">${comValue.comment}</h2>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        `
        n++;
    })
    
    console.log(n);
}
