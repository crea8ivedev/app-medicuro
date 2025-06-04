import { initializeApp } from 'firebase/app'
import { getToken, getMessaging } from 'firebase/messaging'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
}

const firebaseApp = initializeApp(firebaseConfig)
const messaging = getMessaging(firebaseApp)

export const getOrRegisterServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
        const serviceWorker = await window.navigator.serviceWorker.getRegistration('/');
        if (serviceWorker) return serviceWorker;

        return window.navigator.serviceWorker.register('/firebase-messaging-sw.js', {
            scope: '/',
        })
    }
    throw new Error('The browser doesn`t support service worker.')
}

export const getFirebaseToken = () =>
    getOrRegisterServiceWorker().then((serviceWorkerRegistration) =>
        getToken(messaging, {
            vapidKey: import.meta.env.VITE_VAPID_KEY,
            serviceWorkerRegistration,
        }),
    )
