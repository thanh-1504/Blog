import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const requestDataFromUserPost = async (idPost) => {
  const docRef = doc(db, "user's post", idPost);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};
