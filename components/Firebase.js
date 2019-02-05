import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDTnOhEpccxPYstMmKh4FnHeEWX_FBHLKI",
    authDomain: "trippy-1548284778836.firebaseapp.com",
    databaseURL: "https://trippy-1548284778836.firebaseio.com",
    projectId: "trippy-1548284778836",
    storageBucket: "trippy-1548284778836.appspot.com",
    messagingSenderId: "122876265361"
};

export default class Firebase {
    static auth;

    // Initialize Firebase
    static init() {
        firebase.initializeApp(config);
        Firebase.auth = firebase.auth();
    }
    
}