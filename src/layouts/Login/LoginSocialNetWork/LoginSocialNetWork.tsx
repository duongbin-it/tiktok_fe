import axios from "axios"
import { initializeApp } from "firebase/app"
import { FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { ADD_USERS } from "../../../api/api"

const firebaseConfig = {
  apiKey: "AIzaSyCk1yOXH9SpvO0Aafky8WJRe4WmX2EP0-Q",
  authDomain: "login-6d6c7.firebaseapp.com",
  projectId: "login-6d6c7",
  storageBucket: "login-6d6c7.appspot.com",
  messagingSenderId: "523075927369",
  appId: "1:523075927369:web:f5f88d841cb9fcd3bb6e98",
  measurementId: "G-20TDXHFC3G",
}
const app = initializeApp(firebaseConfig)

async function setStorages(re: any) {

  localStorage.setItem("user", String(re.user.displayName))
  localStorage.setItem("avatar", String(re.user.photoURL))
  await axios.post(ADD_USERS, {
    "live": false,
    "blue_check": false,
    "name": re.user.displayName,
    "username": re._tokenResponse.email ? re._tokenResponse.email.replace(/@.*$/, "") : re.user.uid,
    "count_followers": 0,
    "count_likes": 0,
    "bio": "Còn nhiều chỗ chưa hoàn thiện, mn thông cảm cho mình nhoa!",
    "following": false,
    "avatar": re.user.photoURL,
    "email": re._tokenResponse.email,
    "password": "password-default",
    "permission": "user",
    "birthday": "16/02/2002",
    "gender": "Male"
  })
    .then(() => {
      localStorage.setItem("username", re._tokenResponse.email ? re._tokenResponse.email.replace(/@.*$/, "") : re.user.uid)
    })
}

function Success(isModal: boolean) {
  if (isModal) {
    (document.querySelector("[class='svg-css']") as HTMLDivElement).style.display = 'block';
    (document.querySelector("[class='css-feuqz4']") as HTMLDivElement).style.top = '16px'
    setTimeout(() => { (document.querySelector("[class='css-feuqz4']") as HTMLDivElement).style.top = '-50px' }, 1500)
  }
  //eslint-disable-next-line no-restricted-globals
  setTimeout(() => { location.reload() }, 4000)
}

function Fail(err: any, isModal: boolean) {
  console.log(err['message'])
  if (isModal) {
    (document.querySelector("[class='css-feuqz5']") as HTMLDivElement).style.top = '16px';
    (document.querySelector("[class='svg-css']") as HTMLDivElement).style.display = 'none'
    setTimeout(() => { (document.querySelector("[class='css-feuqz5']") as HTMLDivElement).style.top = '-50px' }, 1500)
  }
}

export function LoginFacebook(isModal: boolean) {
  if (isModal) {
    (document.querySelector("[class='svg-css']") as HTMLDivElement).style.display = 'block'
  }
  const provider = new FacebookAuthProvider()
  signInWithPopup(getAuth(app), provider)
    .then((re) => {
      setStorages(re)
      Success(isModal)
    })
    .catch(err => Fail(err, isModal))
}

export function LoginGoogle(isModal: boolean) {
  if (isModal) {
    (document.querySelector("[class='svg-css']") as HTMLDivElement).style.display = 'block'
  }
  const provider = new GoogleAuthProvider()
  signInWithPopup(getAuth(app), provider)
    .then((re) => {
      setStorages(re)
      Success(isModal)
    })
    .catch(err => Fail(err, isModal))
}

export function LoginGithub(isModal: boolean) {
  if (isModal) {
    (document.querySelector("[class='svg-css']") as HTMLDivElement).style.display = 'block'
  }
  const provider = new GithubAuthProvider()
  signInWithPopup(getAuth(app), provider)
    .then((re) => {
      setStorages(re)
      Success(isModal)
    })
    .catch(err => Fail(err, isModal))
}
