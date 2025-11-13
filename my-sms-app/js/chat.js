import { auth, db, storage } from "./firebase-config.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import {
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-storage.js";

const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const logoutBtn = document.getElementById("logoutBtn");
const imageInput = document.getElementById("imageInput");

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    loadMessages();
  }
});

logoutBtn.addEventListener("click", () => {
  signOut(auth);
});

sendBtn.addEventListener("click", sendMessage);

async function sendMessage() {
  const text = messageInput.value.trim();
  const imageFile = imageInput.files[0];

  if (!text && !imageFile) return;

  let imageUrl = null;
  if (imageFile) {
    const storageRef = ref(storage, "images/" + imageFile.name + Date.now());
    await uploadBytes(storageRef, imageFile);
    imageUrl = await getDownloadURL(storageRef);
    imageInput.value = "";
  }

  await addDoc(collection(db, "messages"), {
    uid: auth.currentUser.uid,
    text,
    imageUrl,
    createdAt: serverTimestamp(),
  });

  messageInput.value = "";
}

function loadMessages() {
  const q = query(collection(db, "messages"), orderBy("createdAt"));
  onSnapshot(q, (snapshot) => {
    chatBox.innerHTML = "";
    snapshot.forEach((doc) => {
      const msg = doc.data();
      const div = document.createElement("div");
      div.classList.add("message");
      div.classList.add(msg.uid === auth.currentUser.uid ? "sent" : "received");
      if (msg.text) div.textContent = msg.text;
      if (msg.imageUrl) {
        const img = document.createElement("img");
        img.src = msg.imageUrl;
        img.style.maxWidth = "150px";
        img.style.display = "block";
        div.appendChild(img);
      }
      chatBox.appendChild(div);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
  });
}
