importScripts("https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js")

const firebaseConfig = {
    apiKey: "AIzaSyCAujOiJTaSOy4Hm9ioGpNDrBK-zsLOVMI",
    authDomain: "notification-7bdf0.firebaseapp.com",
    projectId: "notification-7bdf0",
    storageBucket: "notification-7bdf0.firebasestorage.app",
    messagingSenderId: "727355685130",
    appId: "1:727355685130:web:9c422ae9b4ce21852d22f3",
    measurementId: "G-P8JG6MYFTW"
}

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
