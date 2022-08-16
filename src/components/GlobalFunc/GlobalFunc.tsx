import axios from "axios";
import classNames from "classnames/bind";
import styles from '../../layouts/Login/Login.module.scss';

const cx = classNames.bind(styles);

function handleHideLogin() {
  document.querySelector(`[class='${cx("wrapper-select")}']`)?.classList.replace(String(cx("wrapper-select")), cx("wrapper-selected"));
  document.querySelector(`[class='${cx('wrapper3')}']`)?.classList.replace(cx("wrapper3"), cx("wrapper1"));
  setTimeout(() => {
    document.querySelector(`[class='${cx('wrapper1')}']`)?.classList.replace(cx("wrapper1"), cx("wrapper2"));
    document.querySelector(`[class='${cx('wrapper-selected')}']`)!.classList.replace(cx("wrapper-selected"), String(cx("wrapper-select")));
  }, 200);
}

function handleShowLogin() {
  document.querySelector(`[class='${cx('wrapper-selected')}']`)?.classList.replace(cx("wrapper-selected"), String(cx("wrapper-select")));
  document.querySelector(`[class='${cx('wrapper2')}']`)?.classList.replace(cx("wrapper2"), String(cx("wrapper")));
  document.querySelector(`[class='${cx("wrapper")}']`)?.classList.replace(String(cx("wrapper")), cx("wrapper3"))
}

async function ConnectApi(url: string, method = "GET", data?: object) {
  if (method === "GET") {
    return await axios.get(url);
  } else if (method === "POST") {
    return await axios.post(url, data);
  }
}

function Following(data: any, buff: boolean) {
  if (data._id && data.username) {
    ConnectApi("https://tiktok-nodejs1.herokuapp.com/api/following", "POST", {
      id: data._id,
      value: buff,
      username: data.username,
    });
  }
}

function Hearted(data: any, buff: boolean) {
  if (data._id) {
    ConnectApi("https://tiktok-nodejs1.herokuapp.com/api/hearted", "POST", {
      id: data._id,
      value: buff,
    });
  }
}

export { handleHideLogin, handleShowLogin, ConnectApi, Following, Hearted };
