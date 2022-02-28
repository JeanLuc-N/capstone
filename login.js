const firebaseConfig = {
    apiKey: "AIzaSyASZPTQHB9L9XvZHstMGioNLl7m-Q-uH9M",
    authDomain: "capstone-68204.firebaseapp.com",
    projectId: "capstone-68204",
    storageBucket: "capstone-68204.appspot.com",
    messagingSenderId: "924665178332",
    appId: "1:924665178332:web:cc3add0cad0a3ec6c56c19",
    measurementId: "G-Q5P7E82L23"
  };
  firebase.initializeApp(firebaseConfig);
  const auth =firebase.auth();
  app_firebase = firebase;

  const loginForm = document.querySelector('#login-form');
 loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // get user info
  var email =  document.getElementById('email').value;
   var password= document.getElementById('password').value;
   
  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    console.log(auth);
    loginForm.reset();
    window.location.replace('admin/index.html');
}).catch(error => {
  alert(error.message);
})

});
