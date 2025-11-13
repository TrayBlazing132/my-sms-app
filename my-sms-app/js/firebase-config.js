<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC3kZsD6Ijk4oQBXa1OIFHeXDFkChoetvM",
    authDomain: "smsd-9f92a.firebaseapp.com",
    projectId: "smsd-9f92a",
    storageBucket: "smsd-9f92a.firebasestorage.app",
    messagingSenderId: "602548576100",
    appId: "1:602548576100:web:495c1f0c91feb06bc96471",
    measurementId: "G-26JKF1Q2JH"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>