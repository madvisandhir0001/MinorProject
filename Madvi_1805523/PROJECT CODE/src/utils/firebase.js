import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBHzIYS9dSKSxyL9sbcRkSkVhw5RR7osaI",
    authDomain: "waytosuccess-india.firebaseapp.com",
    projectId: "waytosuccess-india",
    storageBucket: "waytosuccess-india.appspot.com",
    messagingSenderId: "647288904473",
    appId: "1:647288904473:web:0b8be1a75bf0ca7f07c388",
    measurementId: "G-L9TMWGSKBG"
};

const app = !firebase.apps.length ?
    firebase.initializeApp(firebaseConfig)
    :
    firebase.app()

const db = app.firestore();
const auth = app.auth();
const storage = app.storage();
const users = db.collection('users');
const companies = db.collection('companies');
const admin = db.collection('admin');
const products = db.collection('products');

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, products, storage, users, companies, admin }