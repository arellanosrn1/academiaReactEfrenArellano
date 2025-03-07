import firebaseAcademia from './firebaseconfig';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const auth = getAuth(firebaseAcademia);

export const createUser = async (email, password, name) => {
  const firestore = getFirestore(firebaseAcademia);
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(userCredential);
    const docuRef = doc(firestore, `users/${user.uid}`);
    await setDoc(docuRef, { email: email, name: name, permissions: 'read' });
  } catch (error) {
    console.log(error);
  }
};

export const signinUser = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      console.log(userCredential);
      // ...
    })
    .catch((error) => {
      console.log(error);
    });
};

export const logoutFirebase = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log('cerró sesión');
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
};

export const userListener = (listener) => {
  onAuthStateChanged(auth, (user) => {
    listener(user);
  });
};
