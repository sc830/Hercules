import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { db, authInstance } from './firebaseConfig';

const signUp = async (email, password, username) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
    const user = userCredential.user;

    const dt = new Date();

    await setDoc(doc(db, 'users', user.uid), {
      username: username,
      email: email,
      last_login: dt.toISOString(),
    });

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
