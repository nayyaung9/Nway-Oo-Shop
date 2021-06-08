import firebase from "firebase/app";
import "firebase/analytics";

var firebaseConfig = {
  apiKey: "AIzaSyAGHNWms5j0qedN-f4l-B-NMgmXEzG8jI4",
  authDomain: "nweoo-snacks.firebaseapp.com",
  projectId: "nweoo-snacks",
  storageBucket: "nweoo-snacks.appspot.com",
  messagingSenderId: "284055875787",
  appId: "1:284055875787:web:df9fd72780579ab0426b4e",
  measurementId: "G-4Y2PXMEX4L",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const analytics = firebase.analytics;

export { firebase, analytics };
