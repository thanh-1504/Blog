import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyD97xQwQci7kJ9eFowx7Zp3GAFFpZtsmk0",
  authDomain: "blog-app-42b59.firebaseapp.com",
  projectId: "blog-app-42b59",
  storageBucket: "blog-app-42b59.appspot.com",
  messagingSenderId: "849606320460",
  appId: "1:849606320460:web:177f8e44a3b8f11535efe9",
  measurementId: "G-NTX589KWKX",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const handleSendImgToFirebase = (img) => {
  if (!img) return;
  return new Promise((resolve, reject) => {
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + img.name);
    const uploadTask = uploadBytesResumable(storageRef, img);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            resolve(downloadURL);
          })
          .catch((error) => {
            reject(error);
          });
      }
    );
  });
};
