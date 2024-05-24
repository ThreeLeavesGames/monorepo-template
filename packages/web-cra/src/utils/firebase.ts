// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB5LML45XRAaOAc1vMyHoCRfoGQp7C3HbI",
    authDomain: "cotmobile-e1397.firebaseapp.com",
    databaseURL: "https://cotmobile-e1397-default-rtdb.firebaseio.com",
    projectId: "cotmobile-e1397",
    storageBucket: "cotmobile-e1397.appspot.com",
    messagingSenderId: "921133777796",
    appId: "1:921133777796:web:e517a727d8537065dcd3d1",
    measurementId: "G-0LDJ5C7P64"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const storage = getStorage(app);

// const onClick = () => {
//     console.log(storage)
//     const storageRef = ref(storage, `table_final.json`);
//     getDownloadURL(storageRef).then((downloadURL) => {
//       console.log(downloadURL)
//     });
//   }
