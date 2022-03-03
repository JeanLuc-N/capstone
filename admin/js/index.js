
var title,summary,subject,file;
var ImgUrl;
var files=[];
var reader = new FileReader();
var d = new Date();
var t = d.getTime();
var count = t;
var today = new Date();
var dat = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

function readForm (){
    
    title = document.getElementById("title").value;
    summary = document.getElementById("summary").value;
    subject = document.getElementById("subject").value;
    file = document.getElementById('file').files[0];
    console.log(title,summary,subject);
}
function resetForm (){
    title = document.getElementById("title").value="";
    summary = document.getElementById("summary").value="";
    subject = document.getElementById("subject").value="";
    file = document.getElementById('file').value="";
}


document.addEventListener('DOMContentLoaded',()=>{

    auth.onAuthStateChanged(user => {
        if(user)
        {
            console.log(user.email + " is logged in");
       

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


    function readBlog() {

        var blog=firebase.database().ref("Blogs/");
        blog.on("child_added",function(data){
            var blogValue=data.val();
            var cat = blogValue.title;   
            console.log("hello");
        document.getElementById("row-table").innerHTML+=`
                        <tr>    
                            <td><input type="checkbox"></td>
                            <td>${blogValue.title}</td>
                            <td>${blogValue.summary}</td>
                            <td>${blogValue.date}</td>
                            <td>
                                <div class="action">
                                   <button type="submit" id="del" onclick="DeleteBlog(${blogValue.id})"><i class="fa fa-trash"></i></button>
                                   <button class="edit-blog" onClick="editBlog(${blogValue.id},'${blogValue.title}','${blogValue.summary}','${blogValue.subject}','${blogValue.link}')"><i class="fa fa-pencil-square-o" aria-hidden="false"></i></button>
                                    </div>
                                </div>
                            </td>
                        </tr>       
                    `
        })    
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

        let counter = 0;

        if(!validateRange(title, 5, 100)){
            showError('Please enter title with character between 5 and 30', 'blog--title');
            counter ++;
        }
        if(!validateRange(summary, 5, 300)){
            showError('Please enter summary with characters between 5 and 50', 'blog--summary');
            counter ++;
        }
        if(content.length == 0){
            showError('Please enter your blog content', 'blog--content');
            counter ++;
        }
        if(counter == 0){
           readForm();
           count+=1;
           let storageRef = firebase.storage().ref('blog');
           let file = document.getElementById('file').files[0];
           let thisRef = storageRef.child(file.name);
           thisRef.put(file).then(res=> {
               console.log('upload success');
               console.log(thisRef);
               //alert("upload success");
           }).catch(e=> {
               console.log('Error'+e);
           })
           storageRef.child(file.name).getDownloadURL().then(url=> {
               console.log(url)
           firebase.database().ref('Blogs/'+count).set({
                       id:count,
                       title:title,
                       summary: summary,
                       link:url,
                       date: dat,
                       subject: subject,

                   });
                   resetForm();
               }).catch(e=> {
                   console.log(e)});
        } 
    });

    document.querySelector('.close').addEventListener('click', ()=>{
        document.querySelector('.modal').style.display = 'none';
    });


    function searchFunc() {

        var input, filter, table, tr, td, i, txtValue;
        input = document.querySelector('.search');
        filter = input.value;
        table = document.querySelector('.blogs');
        tr = table.getElementsByTagName("tr");
      

        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td");

            for(let j = 1; j < td.length -1; j++){
                
                if(td[j]){
                    txtValue = td[j].textContent || td[j].innerText;
                    if (txtValue.indexOf(filter) > -1) {
                        tr[i].style.display = "";
                        break;
                    } else {
                        tr[i].style.display = "none";
                    }
                    
                }
            }

        }
    }

    document.querySelector('.search').addEventListener('keyup', ()=>{
        searchFunc();
    });

    readBlog();

} else{
        window.location.replace('../index.html')
     }
})

    
});

function editBlog(id, title, summary, subject, link){

    document.querySelector('.modal1').style.display="block";

    document.getElementById("etitle").value=title;
    document.getElementById("esummary").value=summary;
    document.getElementById("esubject").value=subject;
    document.getElementById("eid").value=id;
    document.getElementById("efile").files[0]=link;
}


function DeleteBlog(id){
        var blog=firebase.database().ref("Blogs/"+id);
        blog.remove();
        document.getElementById("row-table").innerHTML="";
        location.reload();
        alert('BLog deleted');
    }

  

document.getElementById("update").addEventListener("click",(e)=>{
    e.preventDefault();
});
function updateBlog(id,title,summary,subject,link){
    
    var id=document.getElementById("eid").value;
    var title=document.getElementById("etitle").value;
    var summary=document.getElementById("esummary").value;
    var subject=document.getElementById("esubject").value;
    var link= "https://firebasestorage.googleapis.com/v0/b/test-javascript-20767.appspot.com/o/Images%2Ftest1.png?alt=media&token=3f61447d-6d7f-45b8-ac84-750e99c8866b";
    alert(id);
   firebase.database().ref("Blogs/"+id).update({
        id:id,
        title:title,
        summary: summary,
        link:link,
        date: dat,
        subject: subject
   });
   location.reload();
}

const logoutBtn = document.querySelector('#logout-btn');
logoutBtn.addEventListener('click', e=> {
    e.preventDefault();
    auth.signOut();
    console.log("User signout!");
    window.location.replace('../index.html');
})
