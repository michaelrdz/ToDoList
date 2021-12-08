// Import firebase
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration, you have to paste here the object that comes from firebase
const firebaseConfig = {

  apiKey: "AIzaSyCfSXSAT1UEFTIpq1ST5iI6bk8YtAMQl5o",

  authDomain: "todolist-312f8.firebaseapp.com",

  databaseURL: "https://todolist-312f8-default-rtdb.firebaseio.com",

  projectId: "todolist-312f8",

  storageBucket: "todolist-312f8.appspot.com",

  messagingSenderId: "1074818563677",

  appId: "1:1074818563677:web:0a9e6e9f425c68401117b4"

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
