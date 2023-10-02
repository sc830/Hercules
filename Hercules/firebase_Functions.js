import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getDatabase, set, ref, child,onValue, get, update } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js";
import { getAuth, RecaptchaVerifier, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD68Gopp4GSGt_eJ2Le427LiaFexj62NR4",
    authDomain: "test-understandings.firebaseapp.com",
    projectId: "test-understandings",
    storageBucket: "test-understandings.appspot.com",
    messagingSenderId: "541135417216",
    appId: "1:541135417216:web:240a3b15ae7c6c9699db65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);


//------------If logged in and user account variables---------//



var QLoggedIn = "false";
var CurrentUser = "";  

// sets session info
window.onload = function(){
    sessionStorage.setItem("LOGGEDIN", QLoggedIn);
    sessionStorage.setItem("USER", CurrentUser);
    sessionStorage.setItem("UID", CurrentUser);
}
    

  // to create/sign up with a a new account
  signUpMail.addEventListener('click',(e) => {
    var email = document.getElementById('signup_Email').value;
    var passwordCandidate = document.getElementById('signup_Pass').value;
    var username = document.getElementById('signup_User').value;
    //password canidate runs through checkpoints for a verified password
    // to make sure password is atleast 8 charaters of length
    if(passwordCandidate.length<8)
    {
        alert("Must be at least 8 characters")
        return
    }
    // to have password contain atleast one capital letter
    if(passwordCandidate.toLowerCase()==passwordCandidate)
    {
        alert("Must contain one Capital Letter")
        return
    }
    // to have password contain on elowercase letter
    if(passwordCandidate.toUpperCase()==passwordCandidate)
    {
        alert("Must contain one Lowercase Letter")
        return
    }
    // to require password to contain one special character
    if(!containsSpecialChars(passwordCandidate))
    {
        alert("Must Contain One Special Character !@#$%+")
        return
    }
    // password candidate completes checkpoints and becomes a valid password
    var password=passwordCandidate

    // if succesfull creates new user acount with uid, password
    // email, and username
    createUserWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
     // created account
     const user = userCredential.user;
     CurrentUser=user;
     const dt = new Date();
        // puts new user info into realtime database
    set(ref(database, 'users/' + user.uid),{
        username: username,
        email: email,
        last_login: dt,
    })
    set(ref(database, 'users/' + user.uid + '/Workouts'),{
        workout: test
    })
    QLoggedIn=true

     alert('Profile Created')
     // change page
    })
    // catches any type of error with either password or email and
    // and tells you whats wrong
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
        // ..
  });

  });


    // to login to created user account
    loginMail.addEventListener('click',(e) => {

        var email = document.getElementById('login_Email').value;
        var password = document.getElementById('login_Pass').value;
    
        // if succesfull logs user into their profile and logs the last time and
        // they logged in
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // if succesfull changes empty user slot to current logged in user
            CurrentUser=user;
            //alert(user)
            const dt = new Date();
            // updates realtime database with newest login time and date of user
            update(ref(database, 'users/' + user.uid),{
            last_login: dt,
            })
            // changes logged in bool to true
            QLoggedIn=true
    
            sessionStorage.setItem("LOGGEDIN", QLoggedIn);
            sessionStorage.setItem("USER", user);
            sessionStorage.setItem("UID", user.uid);

            // switch page
        
            alert('Succesful login')
            // ...
      })
      // catches any type of error with either password or email
      // and tells you whats wrong
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      });
    
      })



    // where all valid special characters are held for password useage
    function containsSpecialChars(str) {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return specialChars.test(str);
      }



      
    
