import classNames from "classnames/bind";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MusicIcon, SharpIcon } from "../../../assets/icons/icons";
import Button from "../../../components/Button/Button";
import { ConnectApi, handleShowLogin } from "../../../components/GlobalFunc/GlobalFunc";
import DivSelect from "./DivSelect/DivSelect";
import DivUser from "./DivUser/DivUser";
import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);

const dieukhoan = [
  { title: 'About', },
  { title: 'Newsroom', },
  { title: 'Contact', },
  { title: 'Careers', },
  { title: 'ByteDance', },
  { title: 'TikTok for Good', },
  { title: 'Advertise', },
  { title: 'Developers', },
  { title: 'Transparency', },
  { title: 'TikTok Rewards', },
  { title: 'Help', },
  { title: 'Safety', },
  { title: 'Terms', },
  { title: 'Privacy', },
  { title: 'Creator Portal', },
  { title: 'Community Guidelines', },
]


const Sidebar: React.FC = () => {
  const [api, setApi] = useState<any>();
  const ref = useRef<HTMLDivElement>(null);
  const currentUser = localStorage.getItem("user");

  useEffect(() => {
    localStorage.setItem("ref", ref.current?.className || '');
  }, [ref]);

  async function Discover() {
    return await ConnectApi("https://tiktok-nodejs1.herokuapp.com/api/discover", "GET").then((res) => setApi(res));
  }

  useEffect(() => {
    Discover();
  }, []);

  return (
    <div className={cx("wrapper")} ref={ref}>
      <div className={cx("container")}>
        <DivUser />
        {(() => {
          if (!currentUser) {
            return (
              <div className={cx("containers")}>
                <p style={{ fontSize: 16 + "px", lineHeight: 22 + "px", color: "rgba(22, 24, 35, 0.5" }}>Log in to follow creators, like videos, and view comments.</p>
                <Button login onClick={handleShowLogin}>
                  Log in
                </Button>
              </div>
            );
          } else {
            return <DivSelect title="Following accounts" atb="See more" />;
          }
        })()}

        <DivSelect title="Suggested accounts" atb="See all" />
        <div className={cx("wrapper-1")}>
          <p className={cx("title")}>Discover</p>
          <div className={cx("container-1")}>
            {api
              ? api.data[0].data.map((item: any, index: number) => (
                (() => {
                  switch (item.icon) {
                    case "MusicIcon":
                      return (
                        <Link key={index} className={cx("link")} to={`/music/${item.content.replace('-', '').replace(/ /g, "_")}`}>
                          <div className={cx("content")}>
                            <p className={cx("icon-btn")}>
                              <MusicIcon />
                            </p>
                            <p className={cx("title-btn")}>{item.content}</p>
                          </div>
                        </Link>
                      )
                    case "SharpIcon":
                      return (
                        <Link key={index} className={cx("link")} to={`/tag/${item.content}`}>
                          <div className={cx("content")}>
                            <p className={cx("icon-btn")}>
                              <SharpIcon />
                            </p>
                            <p className={cx("title-btn")}>{item.content}</p>
                          </div>
                        </Link>
                      )
                  }
                })()
              ))
              : null}
          </div>
        </div>
        <div className={cx("sperate")}></div>
        <div className={cx('footer')}>
          <div className={cx('footer-item')}>
            {dieukhoan.map((props, index) => (
              <Link key={index} className={cx('link-footer')} to={`/@${props.title.toLowerCase().replace('-', '').replace(/ /g, "_")}`}>{props.title}</Link>
            ))}
          </div>
          <span className={cx('span-title')}>© 2022 TikTok</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
