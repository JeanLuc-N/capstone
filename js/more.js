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
        `

        })
                
     }

    oneBlog(id);
})