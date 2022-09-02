import classNames from "classnames/bind"
import React from "react"
import * as icon from "../../assets/icons/icons"
import { LoginFacebook, LoginGithub, LoginGoogle } from "../../layouts/Login/LoginSocialNetWork/LoginSocialNetWork"
import styles from "./PageLogin.module.scss"


const cx = classNames.bind(styles)

const PageLogin: React.FC = () => {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <div>
                    <div className={cx("title")}>Log in to TikTok</div>
                    <div className={cx("content-title")}>Manage your account, check notifications, comment on videos, and more.</div>
                    <a className={cx("link-title")} href="/qr/code">
                        <div className={cx("qr-code")}>
                            <div className={cx("qr-code-div")}>
                                <icon.QrIcon />
                            </div>
                            Use QR code
                        </div>
                    </a>
                    <a className={cx("link-title")} href="/login/phone-or-email">
                        <div className={cx("content-link-title")}>
                            <div className={cx("content-link-title-div")}>
                                <icon.PersonIcon />
                            </div>
                            Use phone / email / username
                        </div>
                    </a>
                    <div className={cx('type_login')} onClick={() => LoginFacebook(false)}>
                        <div className={cx("type_login--item")}>
                            <icon.FbIcon />
                        </div>
                        Continue with Facebook
                    </div>
                    <div className={cx('type_login')} onClick={() => LoginGoogle(false)}>
                        <div className={cx("type_login--item")}>
                            <icon.GgIcon />
                        </div>
                        Continue with Google
                    </div>
                    <div className={cx('type_login')}>
                        <div className={cx("type_login--item")}>
                            <icon.TwitterIcon />
                        </div>
                        Continue with Twitter
                    </div>
                    <div className={cx('type_login')} onClick={() => LoginGithub(false)}>
                        <div className={cx("type_login--item")}>
                            <icon.GithubIcon />
                        </div>
                        Continue with GitHub
                    </div>
                    <div className={cx('type_login')}>
                        <div className={cx("type_login--item")}>
                            <icon.MicrosoftIcon />
                        </div>
                        Continue with Microsoft
                    </div>
                    <div className={cx('type_login')}>
                        <div className={cx("type_login--item")}>
                            <icon.IclouldIcon />
                        </div>
                        Continue with Apple
                    </div>
                    <div className={cx('type_login')}>
                        <div className={cx("type_login--item")}>
                            <icon.InstagramIcon />
                        </div>
                        Continue with Instagram
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageLogin