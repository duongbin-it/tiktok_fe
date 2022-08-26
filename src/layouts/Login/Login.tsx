import classNames from "classnames/bind";
import React from "react";
import { CircleIcon, CloseIcon, FbIcon, GgIcon, GithubIcon, IclouldIcon, InstagramIcon, MicrosoftIcon, PersonIcon, QrIcon, TwitterIcon } from "../../assets/icons/icons";
import { handleHideLogin } from "../../components/GlobalFunction/GlobalFunction";
import styles from "./Login.module.scss";
import { LoginFacebook, LoginGithub, LoginGoogle } from "./LoginSocialNetWork/LoginSocialNetWork";

const cx = classNames.bind(styles);

const Login: React.FC = () => {

  return (
    <div className={cx("wrapper")}>
      <div><div className="css-feuqz4" style={{ transition: 'top 1s linear', display: "flex", justifyContent: "center", fontFamily: 'ProximaNova, PingFangSC, sans-serif', fontWeight: 600, position: 'fixed', top: '-50px', left: '0px', color: 'rgb(255, 255, 255)', zIndex: 1002, width: '100%', pointerEvents: 'none', userSelect: 'none' }}><span><div className="css-feuqz4-notice" style={{ right: '50%', marginTop: '-8px' }}><div className="css-feuqz4-notice-content" style={{ backgroundColor: 'rgba(84, 84, 84, 0.92)', display: 'inline-block', padding: '10px 8px', pointerEvents: 'all', maxWidth: '100%', borderRadius: '2px' }}><div className="css-9aj0a0-DivMessageContainer e1wz89c90" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50vw', direction: 'ltr', minWidth: '300px' }}><span>Login Success</span></div></div></div></span></div></div>
      <div><div className="css-feuqz5" style={{ transition: 'top 1s linear', display: "flex", justifyContent: "center", fontFamily: 'ProximaNova, PingFangSC, sans-serif', fontWeight: 600, position: 'fixed', top: '-50px', left: '0px', color: 'rgb(255, 255, 255)', zIndex: 1002, width: '100%', pointerEvents: 'none', userSelect: 'none' }}><span><div className="css-feuqz4-notice" style={{ right: '50%', marginTop: '-8px' }}><div className="css-feuqz4-notice-content" style={{ backgroundColor: 'rgba(84, 84, 84, 0.92)', display: 'inline-block', padding: '10px 8px', pointerEvents: 'all', maxWidth: '100%', borderRadius: '2px' }}><div className="css-9aj0a0-DivMessageContainer e1wz89c90" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50vw', direction: 'ltr', minWidth: '300px' }}><span>Login Error</span></div></div></div></span></div></div>
      <div className={cx("wrapper-ui")}></div>
      <div className={cx("wrapper-select")}>
        <div className={cx("container")}>
          <div className={cx("header-login")}>
            <div className={cx("content")}>
              <div className={cx("title")}>Log in to TikTok</div>
              <div className={cx("link-login")} >
                <div className={cx("link-login-item")}>
                  <div className={cx("item-properties")}>{<QrIcon />}</div>
                  Use QR code
                </div>
              </div>
              <div className={cx("link-login")} >
                <div className={cx("link-login-item")}>
                  <div className={cx("item-properties")}>{<PersonIcon />}</div>
                  Use phone / email / username
                </div>
              </div>
              <div
                className={cx("link-login")} onClick={() => LoginFacebook()}>
                <div className={cx("link-login-item")}>
                  <div className={cx("item-properties")}>{<FbIcon />}</div>
                  Continue with Facebook
                </div>
              </div>
              <div className={cx("link-login")} onClick={() => LoginGoogle()}>
                <div className={cx("link-login-item")}>
                  <div className={cx("item-properties")}>{<GgIcon />}</div>
                  Continue with Google
                </div>
              </div>
              <div className={cx("link-login")} >
                <div className={cx("link-login-item")}>
                  <div className={cx("item-properties")}>{<TwitterIcon />}</div>
                  Continue with Twitter
                </div>
              </div>
              <div className={cx("link-login")} onClick={() => LoginGithub()}>
                <div className={cx("link-login-item")}>
                  <div className={cx("item-properties")}>{<GithubIcon />}</div>
                  Continue with GitHub
                </div>
              </div>
              <div className={cx("link-login")} >
                <div className={cx("link-login-item")}>
                  <div className={cx("item-properties")}>{<MicrosoftIcon />}</div>
                  Continue with Microsoft
                </div>
              </div>
              <div className={cx("link-login")} >
                <div className={cx("link-login-item")}>
                  <div className={cx("item-properties")}>{<IclouldIcon />}</div>
                  Continue with Apple
                </div>
              </div>
              <div className={cx("link-login")} >
                <div className={cx("link-login-item")}>
                  <div className={cx("item-properties")}>{<InstagramIcon />}</div>
                  Continue with Instagram
                </div>
              </div>
            </div>
            <div style={{ position: 'fixed', left: 'calc(50% - 15px)', top: '38%', display: 'none' }} className={"svg-css"}>
              <CircleIcon />
            </div>
          </div>
          <div className={cx("footer-login")}>
            <div>Don’t have an account?</div>
            <a className={cx("link-login")} href=".">
              <span className={cx("link-login1")}>Sign up</span>
            </a>
          </div>
        </div>
        <div
          className={cx("close")}
          onClick={() => {
            handleHideLogin()
          }}
        >
          <CloseIcon />
        </div>
      </div>
    </div>
  );
}

export default Login;
