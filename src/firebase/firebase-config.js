import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCZY2Y5RY2-_ZR0miAgHr_qDXlXoWZaCXs',
  authDomain: 'calendar-app-react-a20bf.firebaseapp.com',
  databaseURL: 'https://calendar-app-react-a20bf.firebaseio.com',
  projectId: 'calendar-app-react-a20bf',
  storageBucket: 'calendar-app-react-a20bf.appspot.com',
  messagingSenderId: '874365948132',
  appId: '1:874365948132:web:3742cb9f874495d16e5cf1',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
