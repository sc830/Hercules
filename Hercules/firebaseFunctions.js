import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { db, authInstance } from './firebaseConfig';
import { Alert } from 'react-native';

// where all valid special characters are held for password useage
function containsSpecialChars(str) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}

const signUp = async (email, password, username) => {
  
  
  try {
    console.log("Password:", password);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]).{8,}$/;
    console.log("Regex Test Result:", passwordRegex.test(password));
    if (!passwordRegex.test(password)) {
      const errorMessage = "Password must be at least 8 characters, contain one lowercase letter, one uppercase letter, one number, and one special character.";
      Alert.alert("Error", errorMessage);
      throw new Error(errorMessage);
    }
    
    const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
    Alert.alert("Signup Succesfull!");
    const user = userCredential.user;

    const dt = new Date();

    await setDoc(doc(db, 'users', user.uid), {
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
    const workoutsData = {
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

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};


const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(authInstance, email, password);
    const user = userCredential.user;

    const dt = new Date();

    await setDoc(doc(db, 'users', user.uid), {
      last_login: dt.toISOString(),
    });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { signUp, login };
