if(/Version\/(.*)Safari/.test(navigator.userAgent)) return console.error('Messaging not supported');
var config = {
  apiKey: "AIzaSyCNMrIxhegV1xKZrKVnxgFM_x9cjMp67e0",
  authDomain: "besouro-4fbd9.firebaseapp.com",
  databaseURL: "https://besouro-4fbd9.firebaseio.com",
  projectId: "besouro-4fbd9",
  storageBucket: "besouro-4fbd9.appspot.com",
  messagingSenderId: "266133977216"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

export default messaging;
