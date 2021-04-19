// RADI SAMO AKO SE EXPORTUJE OSNOVNI FIREBASE OBJEKAT, BEZ POZIVANJA .database().ref()

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// app contains all submodule database, authentication, firestore...
import "firebase/database";

import { url } from '../utils/constants';

// ovo je OBAVEZAN podatak
var config = {
    databaseURL: url
  };
  
firebase.initializeApp(config);

export default firebase;  