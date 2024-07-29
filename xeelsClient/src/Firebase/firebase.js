import { initializeApp } from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyAfyTch_9oEH9rkkfvOrfblu6i3fus4jz0",
    authDomain: "xeels-f8c75.firebaseapp.com",
    projectId: "xeels-f8c75",
    storageBucket: "xeels-f8c75.appspot.com",
    messagingSenderId: "763035527643",
    appId: "1:763035527643:web:c72ce3c0763c61bb1b9ffe"
}

const app = initializeApp(firebaseConfig)

export default app