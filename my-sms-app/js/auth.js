import { auth } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const message = document.getElementById("message");

loginBtn.addEventListener("click", async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    message.textContent = "Login berhasil!";
    window.location.href = "chat.html";
  } catch (err) {
    message.textContent = "Login gagal: " + err.message;
  }
});

registerBtn.addEventListener("click", async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    message.textContent = "Pendaftaran berhasil!";
  } catch (err) {
    message.textContent = "Gagal daftar: " + err.message;
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "chat.html";
  }
});
