import classNames from "classnames/bind"
import React from "react"
import { CloseIcon, FbIcon, GgIcon, GithubIcon, IclouldIcon, InstagramIcon, MicrosoftIcon, PersonIcon, QrIcon, TwitterIcon } from "../../assets/icons/icons"
import { EffectLoading } from "../../components/Effect/EffectLoading"
import { Notification } from "../../components/Effect/Notification"
import { handleHideLogin } from "../../components/GlobalFunction/GlobalFunction"
import styles from "./Login.module.scss"
import { LoginFacebook, LoginGithub, LoginGoogle } from "./LoginSocialNetWork/LoginSocialNetWork"

const cx = classNames.bind(styles)

const Login: React.FC = () => {

  return (
    <div className={cx("wrapper")}>
      <Notification />
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
                className={cx("link-login")} onClick={() => LoginFacebook(true)}>
                <div className={cx("link-login-item")}>
                  <div className={cx("item-properties")}>{<FbIcon />}</div>
                  Continue with Facebook
                </div>
              </div>
              <div className={cx("link-login")} onClick={() => LoginGoogle(true)}>
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
              <div className={cx("link-login")} onClick={() => LoginGithub(true)}>
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
            <EffectLoading />
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
  )
}

export default Login
