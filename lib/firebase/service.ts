import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

export const retrieveData = async (collactionName: string) => {
  const snapshot = await getDocs(collection(firestore, collactionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
};

export const retrieveDataById = async (collactionName: string, id: string) => {
  const snapshot = await getDoc(doc(firestore, collactionName, id));
  const data = snapshot.data();

  return data;
};

export const signUp = async (userData: {
  email: string;
  fullName: string;
  phone: string;
  password: string;
  role?: string;
}, callback: (status: boolean) => void) => {
  const q = query(collection(firestore, "users"), where("email", "==", userData.email));

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.length > 0) {
    callback(false);
  } else {
    if(!userData.role) userData.role = "member";
    userData.password = await bcrypt.hash(userData.password, 10);
    await addDoc(collection(firestore, "users"), userData)
      .then(() => {
        callback(true);
      })
      .catch(() => {
        callback(false);
      });
  }
};
