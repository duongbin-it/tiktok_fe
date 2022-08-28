import Tippy from "@tippyjs/react";
import HeadlessTippy from '@tippyjs/react/headless';
import axios from "axios";
import classNames from "classnames/bind";
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import "tippy.js/dist/tippy.css";
import { NEWFEED } from "../../../api/api";
import { CoinIcon, HelpIcon, KeyboardIcon, LanguageIcon, LogoIcon, LogOutIcon, MessageIcon, MoreIcon, NotificationIcon, NotificationIcon1, PathIcon, PlusIcon, SettingIcon, UserIcon } from "../../../assets/icons/icons";
import Button from "../../../components/Button/Button";
import { handleShowLogin } from "../../../components/GlobalFunction/GlobalFunction";
import Menu from "../../../components/Popper/Menu/Menu";
import { setApi } from "../../../redux/actions";
import Login from "../../Login/Login";
import Search from "../Search/Search";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

const MENU_ITEMS = [
  {
    icon: <LanguageIcon />,
    title: "English",
    children: {
      title: "Language",
      data: [
        {
          code: "en",
          title: "English (Hoa Kỳ)",
        },
        {
          code: "vi",
          title: "Tiếng Việt (Việt Nam)",
        },
      ],
    },
  },
  {
    icon: <HelpIcon />,
    title: "Feedback and help",
    to: "/feedback",
  },
  {
    icon: <KeyboardIcon />,
    title: "Keyboard shortcuts",
  },
];

const userMenu = [
  {
    icon: <UserIcon />,
    title: "View Profile",
    to: "/@hoaa",
  },
  {
    icon: <CoinIcon />,
    title: "Get Coins",
    to: "/coin",
  },
  {
    icon: <SettingIcon />,
    title: "Settings",
    to: "/settings",
  },
  ...MENU_ITEMS,
  {
    icon: <LogOutIcon />,
    title: "Log Out",
    to: "/logout",
    separate: true,
  },
];

const Header: React.FC = () => {
  const dispath = useDispatch()
  const currentUser = localStorage.getItem("user");
  const ref = useRef<HTMLDivElement>(null);
  const active = useRef<HTMLDivElement>(null);
  const [notifi, setNotifi] = useState<boolean>(true);
  const ref_header = useRef<HTMLDivElement>(null)
  const [actived, setActived] = useState<boolean>(false)

  const Active = ({ isActive }: any) => {

    useEffect(() => {
      if (window.location.pathname === "/upload") {
        setActived(true);
        (ref_header.current as HTMLDivElement).style.width = "100%"
      }
    }, [isActive])


    return {
      backgroundColor: isActive ? "rgba(22,24,35,0.06)" : "",
      margin: 0
    };
  }

  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);

  useEffect(() => {
    const Class = (document.querySelector(`[class='${active.current?.className}']`)?.firstChild as HTMLDivElement)?.className.split(" ")[0];
    const Active = (document.querySelector(`[class='${active.current?.className}']`)?.firstChild as HTMLDivElement)?.className.split(" ")[1];
    if (Class !== undefined && Active !== undefined)
      document.querySelectorAll(`.${active.current?.className} span`).forEach((item) => {
        const Click = (item as HTMLSpanElement).onclick = (() => {
          document.querySelector(`[class='${Class} ${Active}']`)?.classList.remove(Active)
          if (!item.classList.contains(Active)) {
            item.classList.add(Active)
          }
          else {
            item.classList.remove(Active)
          }
        })

        return () => {
          document.querySelectorAll(`.${active.current?.className} span`).forEach((item) => {
            (item as HTMLSpanElement).removeEventListener('click', Click)
          })
        }
      })
  })

  useEffect(() => {
    ref.current && ((ref.current as HTMLDivElement).style.background = `url(${localStorage.getItem('avatar')}) center center / cover`)
  }, [ref])

  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")} ref={ref_header}>
        <div className={cx("logo")} >
          <Link to={"/"} style={{ display: "flex" }} onClick={() => {
            dispath(setApi([]))
            if (window.location.pathname === "/") {
              axios.get(NEWFEED).then((res: any) => {
                dispath(setApi(res.data))
              })
            }
            else {
              setTimeout(() => {
                setActived(false); console.log(1);
              }, 4000);
            }
          }}>
            <LogoIcon />
          </Link>
        </div>
        <Search />
        <div className={cx("actions")}>
          {currentUser ? (
            <div className={cx("icon-center")}>
              <NavLink className={cx("action-btn")} style={Active} to="/upload">
                {actived ? <Button text buttonHeader leftIcon={<PlusIcon />}>Upload</Button> : <Button text leftIcon={<PlusIcon />}>Upload</Button>}
              </NavLink>
              <Tippy content="Tin nhắn" delay={[100, 0]}>
                <Link className={cx("action-btn")} to="/messages">
                  <MessageIcon></MessageIcon>
                </Link>
              </Tippy>
              <HeadlessTippy
                interactive
                zIndex={1}
                appendTo={document.body}
                offset={[-100, 6]}
                placement='bottom'
                hideOnClick={true}
                onShow={() => setNotifi(false)}
                onHide={() => setNotifi(true)}
                trigger={'click'}
                render={(attrs) => (
                  <div className={cx('search-result')} tabIndex={-1} {...attrs} style={{ display: "inline" }}>
                    <PathIcon />
                    <div className={cx('notification')}>
                      <div className={cx('notification-content')}>
                        <h4 className={cx('content')}>Notification</h4>
                        <div className={cx('menu')} ref={active}>
                          <span className={cx('menu-item', 'active')}>All activity</span>
                          <span className={cx('menu-item')}>Likes</span>
                          <span className={cx('menu-item')}>Comments</span>
                          <span className={cx('menu-item')}>Mentions and tags</span>
                          <span className={cx('menu-item')}>Followers</span>
                        </div>
                      </div>
                      <div className={cx('notification-item')}>
                        <p className={cx('slogan')}>Previous</p>

                        <div className={cx('user')}>
                          <span className={cx('user-title')}>
                            <img loading='lazy' src='https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/7095391853205422081.jpeg?x-expires=1659459600&x-signature=%2Feaox9BBwPs2LCgzfSyXWG5kQZc%3D' alt="avatar" />
                          </span>
                          <div className={cx('title')}>
                            <Link to='/' className={cx('link-profile')}>duong.binh.hvm</Link>
                            <p className={cx('title-info')}>Follow you. 5-14</p>
                          </div>
                          <Button followback>Follow back</Button>
                        </div>

                      </div>
                    </div>
                  </div>
                )}>
                <button className={cx("action-btn")} onClick={() => setNotifi(!notifi)}>
                  {notifi ? <NotificationIcon /> : <NotificationIcon1 />}
                  <sup className={cx("ting-mess")}>12</sup>
                </button>
              </HeadlessTippy>


            </div>
          ) : (
            <>
              <Button text leftIcon={<PlusIcon />} onClick={handleShowLogin}>
                Upload
              </Button>
              <Button
                primary
                onClick={() => {
                  handleShowLogin();
                }}
              >
                Log in
              </Button>
              <Login />
            </>
          )}
          <Menu items={currentUser ? userMenu : MENU_ITEMS}>
            {currentUser ? (
              <div className={cx("avatar-btn")} ref={ref}></div>
            ) : (
              <button className={cx("more-btn")}>
                <MoreIcon />
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
