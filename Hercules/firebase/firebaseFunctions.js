import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, doc, setDoc, getDoc } from 'firebase/firestore';
//import { db, authInstance } from './firebaseConfig';
import { Alert } from 'react-native';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCoxkZvQiNLd-wZrqSJB8dKE2EyHJ11O8U",
  authDomain: "hercules-fc42e.firebaseapp.com",
  projectId: "hercules-fc42e",
  storageBucket: "hercules-fc42e.appspot.com",
  messagingSenderId: "501456721475",
  appId: "1:501456721475:web:7cc30d4a6c8f34320826f6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const authInstance = getAuth();

let userid = '';
// where all valid special characters are held for password useage
function containsSpecialChars(str) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}

export const getUserID = () => {
  return user ? user.uid : null;
};

const signUp = async (email, password, username) => {
  
  
  try {
    //console.log("Password:", password);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]).{8,}$/;
    //console.log("Regex Test Result:", passwordRegex.test(password));
    const isPasswordValid = passwordRegex.test(password);

    if (!isPasswordValid) {
      let errorMessage = "Password must contain:";
      
      if (password.length < 8) {
        errorMessage += "\n- At least 8 characters";
      }
      if (!/(?=.*[a-z])/.test(password)) {
        errorMessage += "\n- At least one lowercase letter";
      }
      if (!/(?=.*[A-Z])/.test(password)) {
        errorMessage += "\n- At least one uppercase letter";
      }
      if (!/(?=.*\d)/.test(password)) {
        errorMessage += "\n- At least one number";
      }
      if (!/(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])/.test(password)) {
        errorMessage += "\n- At least one special character";
      }

      Alert.alert("Error", errorMessage);
      throw new Error(errorMessage);
    }
    
    const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
    Alert.alert("Signup Succesfull!");
    const user = userCredential.user;
    
    userid = user.uid;
    const dt = new Date();

    await setDoc(doc(db, 'userData', user.uid), {
      username: username,
      email: email,
      last_login: dt.toISOString(),
    });

        // made basic format for saving data here, 
        // can access buttons and add more for each day and whatnot
        // thinking a collection for each day can add in a function for days
        // calls day checks if a collection for day is made already if so
        // add the data to that day collection, if not crates a new day 
        // under that collection
        // or we can have a string with it as (food, calories, day)
        // and just split the string at the commas and work with that
    /*const workoutsData = {
     exampleField: 'Example Workouts Data'
    };
    await setDoc(doc(db, 'workouts', user.uid), workoutsData);

    const mindData = {
      exampleField: 'Example Mind Data'
    };
    await setDoc(doc(db, 'mind', user.uid), mindData);

    const munchiesData = {
      exampleField: 'Example Moooonchies Data'
    };
    await setDoc(doc(db, 'munchies', user.uid), munchiesData);
    */
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};


const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(authInstance, email, password);
    const user = userCredential.user;

    userid = user.uid;

    const dt = new Date();

    await setDoc(doc(db, 'userData', user.uid), {
      last_login: dt.toISOString(),
    });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const pullDocData = async(docPath, fieldName) => {
  try {
    console.log(docPath);
    const docRef = doc(db, docPath)
    const docPoint = await getDoc(docRef);

    if (docPoint.exists()) {
      console.log("Document data:", docPoint.data());
      let fieldData = docPoint.get(fieldName);
      return fieldData;
    }
  }
  catch (error) {
    throw new Error(error.message);
    return null;
  }
}

const saveMeal = async (mealData, mealType) => {
  try {
    const dt = new Date();
    const mealsCollectionRef = collection(db, 'userData', userid, 'munchies', mealType, dt.toISOString());
    await addDoc(mealsCollectionRef, mealData);
    return "Meal saved successfully";
  } catch (error) {
    throw new Error(error.message);
  }
};



export { signUp, login, saveMeal };