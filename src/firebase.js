import firebase from 'firebase';

const app = firebase.initializeApp({
    apiKey: "AIzaSyA2P6hbWv7IEwZmVu_k7YpP4OBjJRMk41c",
    authDomain: "erc-routine-project.firebaseapp.com",
    databaseURL: "https://erc-routine-project.firebaseio.com",
    projectId: "erc-routine-project",
    storageBucket: "erc-routine-project.appspot.com",
    messagingSenderId: "546747429259"
});
const db =app.database();

const auth = app.auth();

export {auth,db} ;