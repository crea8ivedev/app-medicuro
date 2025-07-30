
importScripts("https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js")

const firebaseConfig = {
  apiKey: "AIzaSyA2l6WLHfRO3ojo97HLuinnn6Z_WIlx6eY",
  authDomain: "medicuro-72eb4.firebaseapp.com",
  projectId: "medicuro-72eb4",
  storageBucket: "medicuro-72eb4.firebasestorage.app",
  messagingSenderId: "827064676481",
  appId: "1:827064676481:web:9825e1abcc3d1f2f165d80",
  measurementId: "G-56GC382FE4"
};

firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
    const { title, body } = payload.notification || {}
    const options = {
        body: body || "",
        data: payload.data || {}
    }
    self.registration.showNotification(title || "New Notification", options)
})
