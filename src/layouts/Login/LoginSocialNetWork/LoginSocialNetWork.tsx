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

function setStorages(re: any) {
  localStorage.setItem("user", String(re.user.email));
  localStorage.setItem("avatar", String(re.user.photoURL));
}

function Success(isModal: boolean) {
  if (isModal) {
    (document.querySelector("[class='svg-css']") as HTMLDivElement).style.display = 'block';
    (document.querySelector("[class='css-feuqz4']") as HTMLDivElement).style.top = '16px';
    setTimeout(() => { (document.querySelector("[class='css-feuqz4']") as HTMLDivElement).style.top = '-50px'; }, 1500)
  }
  //eslint-disable-next-line no-restricted-globals
  setTimeout(() => { location.reload(); }, 4000);
}

function Fail(err: any, isModal: boolean) {
  console.log(err['message']);
  if (isModal) {
    (document.querySelector("[class='css-feuqz5']") as HTMLDivElement).style.top = '16px';
    setTimeout(() => { (document.querySelector("[class='css-feuqz5']") as HTMLDivElement).style.top = '-50px'; }, 1500);
    (document.querySelector("[class='svg-css']") as HTMLDivElement).style.display = 'none';
  }
}

export function LoginFacebook(isModal: boolean) {
  if (isModal) {
    (document.querySelector("[class='svg-css']") as HTMLDivElement).style.display = 'block';
  }
  const provider = new FacebookAuthProvider();
  signInWithPopup(getAuth(app), provider)
    .then((re) => {
      setStorages(re)
      Success(isModal)
    })
    .catch(err => Fail(err, isModal))
}

export function LoginGoogle(isModal: boolean) {
  if (isModal) {
    (document.querySelector("[class='svg-css']") as HTMLDivElement).style.display = 'block';
  }
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(app), provider)
    .then((re) => {
      setStorages(re)
      Success(isModal)
    })
    .catch(err => Fail(err, isModal))
}

export function LoginGithub(isModal: boolean) {
  if (isModal) {
    (document.querySelector("[class='svg-css']") as HTMLDivElement).style.display = 'block';
  }
  const provider = new GithubAuthProvider();
  signInWithPopup(getAuth(app), provider)
    .then((re) => {
      setStorages(re)
      Success(isModal)
    })
    .catch(err => Fail(err, isModal))
}
