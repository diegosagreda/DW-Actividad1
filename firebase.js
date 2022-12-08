// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDahJbAXnMHqoJJIRqXQ7dOPQAZi_OrnZ4",
  authDomain: "test-ba341.firebaseapp.com",
  databaseURL: "https://test-ba341-default-rtdb.firebaseio.com",
  projectId: "test-ba341",
  storageBucket: "test-ba341.appspot.com",
  messagingSenderId: "108317138180",
  appId: "1:108317138180:web:67c7e2c3d117033a46c451",
  measurementId: "G-3J4EJR76HD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

/**
 * Save a New Task in Firestore
 * @param {string} codigo the title of the Task
 * @param {string} nombre the description of the Task
 * @param {string} correo the description of the Task
 * @param {string} direccion the description of the Task
 * @param {string} telefono the description of the Task
 * 
 */
export const saveEstudiante = (codigo,nombre,correo,direccion,telefono) =>
  addDoc(collection(db, "estudiantes"), {codigo,nombre,correo,direccion,telefono });

export const onGetEstudiantes = (callback) =>
  onSnapshot(collection(db, "estudiantes"), callback);

/**
 *
 * @param {string} id Task ID
 */
export const deleteEstudiante = (id) => deleteDoc(doc(db, "estudiantes", id));

export const getEstudiante = (id) => getDoc(doc(db, "estudiantes", id));

export const updateEstudiante = (id, newFields) =>
  updateDoc(doc(db, "estudiantes", id), newFields);

export const getEstudiantes = () => getDocs(collection(db, "estudiantes"));
