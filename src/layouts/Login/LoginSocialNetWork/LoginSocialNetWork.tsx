import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCk1yOXH9SpvO0Aafky8WJRe4WmX2EP0-Q",
  authDomain: "login-6d6c7.firebaseapp.com",
  projectId: "login-6d6c7",
  storageBucket: "login-6d6c7.appspot.com",
  messagingSenderId: "523075927369",
  appId: "1:523075927369:web:f5f88d841cb9fcd3bb6e98",
  measurementId: "G-20TDXHFC3G",
};
const app = initializeApp(firebaseConfig);

function Success() {
  (document.querySelector("[class='svg-css']") as HTMLDivElement).style.display = 'block';
  (document.querySelector("[class='css-feuqz4']") as HTMLDivElement).style.top = '16px';
  setTimeout(() => { (document.querySelector("[class='css-feuqz4']") as HTMLDivElement).style.top = '-50px'; }, 3000)
  //eslint-disable-next-line no-restricted-globals
  setTimeout(() => { location.reload(); }, 4000);
}

function Fail(err: any) {
  console.log(err['message']);
  (document.querySelector("[class='css-feuqz5']") as HTMLDivElement).style.top = '16px';
  setTimeout(() => { (document.querySelector("[class='css-feuqz5']") as HTMLDivElement).style.top = '-50px'; }, 3000);
  (document.querySelector("[class='svg-css']") as HTMLDivElement).style.display = 'none';
}

export function LoginFacebook() {
  const provider = new FacebookAuthProvider();
  signInWithPopup(getAuth(app), provider)
    .then((re) => {
      localStorage.setItem("user", String(re.user.email));
      localStorage.setItem("avatar", String(re.user.photoURL));
      Success()
    })
    .catch(err => Fail(err))
}

export function LoginGoogle() {
  const provider = new GoogleAuthProvider();
  (document.querySelector("[class='svg-css']") as HTMLDivElement).style.display = 'block';
  signInWithPopup(getAuth(app), provider)
    .then((re) => {
      localStorage.setItem("user", String(re.user.email));
      localStorage.setItem("avatar", String(re.user.photoURL));
      Success()
    })
    .catch(err => Fail(err))
}

export function LoginGithub() {
  const provider = new GithubAuthProvider();
  (document.querySelector("[class='svg-css']") as HTMLDivElement).style.display = 'block';
  signInWithPopup(getAuth(app), provider)
    .then((re) => {
      localStorage.setItem("user", String(re.user.email));
      localStorage.setItem("avatar", String(re.user.photoURL));
      Success()
    })
    .catch(err => Fail(err))
}
