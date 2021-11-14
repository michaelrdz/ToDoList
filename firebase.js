// Import firebase
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration, you have to paste here the object that comes from firebase
const firebaseConfig = {

  apiKey: "AIzaSyA3jcuUPHIG06DxPOobq-Jo_eflCEjy-E0",

  authDomain: "fir-auth-a3a71.firebaseapp.com",

  databaseURL: "https://fir-auth-a3a71-default-rtdb.firebaseio.com",

  projectId: "fir-auth-a3a71",

  storageBucket: "fir-auth-a3a71.appspot.com",

  messagingSenderId: "466562936098",

  appId: "1:466562936098:web:be9520fa1294cc26a3097b"


};


// Initialize Firebase
/*let app;
if (firebase.apps.length === 0) {
  console.info({ firebase });
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}*/

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
//const storage = firebase.storage();
const database = firebase.database();

export { auth, database, firebase };
