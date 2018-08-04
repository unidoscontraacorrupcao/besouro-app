var config = {
  apiKey: "AIzaSyAi9uS0rxpp7nWpNO4TZ8H7F7aCtRTbuyk",
  authDomain: "teste-besouro.firebaseapp.com",
  databaseURL: "https://teste-besouro.firebaseio.com",
  projectId: "teste-besouro",
  storageBucket: "teste-besouro.appspot.com",
  messagingSenderId: "805814933034"
};
firebase.initializeApp(config);


const messaging = firebase.messaging();

export default messaging;
