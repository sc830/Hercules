  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
  import { getAuth } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js'
  import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
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

  //shortcuts
  const auth = getAuth();


    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const uid = user.uid;
        // change page to start page of the workout
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
