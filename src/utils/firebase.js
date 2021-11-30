import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';

const config = {
  apiKey: "AIzaSyA4xCCPM59IzyV5ez5TKiPak8p2QwHVDaU",
  authDomain: "srdesign-lab3.firebaseapp.com",
  projectId: "srdesign-lab3",
  storageBucket: "srdesign-lab3.appspot.com",
  messagingSenderId: "334676884785",
  appId: "1:334676884785:web:e7d08015d32347e06e0410",
  measurementId: "G-KDQ4YCYD3D"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config)
}

const firestore = firebase.firestore()

export { firestore }