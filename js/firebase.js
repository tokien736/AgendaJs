//Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getFirestore,collection,addDoc,getDocs,deleteDoc,onSnapshot,doc,getDoc,updateDoc,query,where } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_GCBt0_tbQMmlUZiTfXtZNwsZSs1oJmc",
  authDomain: "fir-js-crud-agenda.firebaseapp.com",
  projectId: "fir-js-crud-agenda",
  storageBucket: "fir-js-crud-agenda.appspot.com",
  messagingSenderId: "811774654876",
  appId: "1:811774654876:web:db1a92a86f3158705c3059"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//
const db = getFirestore()

export const saveTask = (nombre,apellidoP,apellidoM,fechaN,email,direccion,telefono) => {
     addDoc(collection(db,'task'),{nombre,apellidoP,apellidoM,fechaN,email,direccion,telefono})
}
export const getTasks = () => getDocs(collection(db,'task'))
export const onGetContacto = (callback) => onSnapshot(collection(db,'task'),callback)
export const deleteContacto = id => deleteDoc(doc(db,'task',id))
export const getContacto = id => getDoc(doc(db,'task',id))
export const editContacto = (id,nuevoContacto) => updateDoc(doc(db,'task',id),nuevoContacto)
//Función para buscar coincidencias por nombre en la colección "task"
export const searchByName = async (name) => {
    const q = query(collection(db, "task"), where("nombre", "==", name));
    const querySnapshot = await getDocs(q);
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, data: doc.data() });
    });
    return results;
  };
export const searchByPhone = async (phone) => {
    const q = query(collection(db, "task"), where("telefono", "==", phone));
    const querySnapshot = await getDocs(q);
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, data: doc.data() });
    });
    return results;
  };
