import classNames from "classnames/bind";
import React, { Fragment } from "react";
import { CheckIcon } from "../../../../assets/icons/icons";
import styles from "./DivSelect.module.scss";
import DivUserSelect from "./DivUserSelect/DivUserSelect";

const cx = classNames.bind(styles);

const data = [
  {
    live: false,
    blue_check: false,
    name: "adi.syahreza",
    username: "Adi Syahreza",
    link: "/@adi.syahreza",
    image: "https://i.ibb.co/J2pck6h/1.jpg",
  },
  {
    live: false,
    blue_check: false,
    name: "theanh28entertainment",
    username: "Theanh28 Entertainment",
    link: "/@theanh28entertainment",
    image: "https://i.ibb.co/JQN1DFx/2.jpg",
  },
  {
    live: false,
    blue_check: false,
    name: "datvilla94",
    username: "🔥Đạt Villa🔥",
    link: "/@datvilla94",
    image: "https://i.ibb.co/MshdN4t/3.jpg",
  },
  {
    live: false,
    blue_check: false,
    name: "manhtienkhoi_",
    username: "Mạnh Tiến Khôi 🐯",
    link: "/@manhtienkhoi_",
    image: "https://i.ibb.co/NmQtXXN/4.jpg",
  },
  {
    live: false,
    blue_check: false,
    name: "tiin.vn",
    username: "Tiin.vn",
    link: "/@tiin.vn",
    image: "https://i.ibb.co/cvKwcZT/5.jpg",
  },
  {
    live: false,
    blue_check: false,
    name: "norinpham_m4",
    username: "NorinPham",
    link: "/@adi.syahreza",
    image: "https://i.ibb.co/Q9H6tHN/6.jpg",
  },
  {
    live: false,
    blue_check: false,
    name: "duong.binhn.hvm",
    username: "Bình Dương Nguyễn100",
    link: "/@adi.syahreza",
    image: "https://i.ibb.co/4ZJGPRb/7.jpg",
  },
  {
    live: false,
    blue_check: false,
    name: "vinhtech",
    username: "Vinh Tech",
    link: "/@adi.syahreza",
    image: "https://i.ibb.co/Xz9HHMb/8.jpg",
  },
  {
    live: false,
    blue_check: false,
    name: "coupleblogvn",
    username: "CoupleTv",
    link: "/@adi.syahreza",
    image: "https://i.ibb.co/kXb0LtT/9.jpg",
  },
  {
    live: false,
    blue_check: false,
    name: "caocuongvu",
    username: "caocuongvu",
    link: "/@adi.syahreza",
    image: "https://i.ibb.co/z4z0SR9/10.jpg",
  },
  {
    live: false,
    blue_check: false,
    name: "bayashi.tiktok",
    username: "バヤシ🥑Bayashi",
    link: "/@adi.syahreza",
    image: "https://i.ibb.co/Nys4HQ3/11.jpg",
  },
];


interface Props {
  title: string,
  atb: any,
}

const DivSelect: React.FC<Props> = ({ title, atb }) => {
  return (
    <div className={cx("wrapper")}>
      <p className={cx("title")}>{title}</p>
      {data.map((props, index) => (
        <DivUserSelect key={index} name={props.name} username={props.username} link={props.link} icon={props.blue_check ? <CheckIcon /> : Fragment} image={props.image} live={props.live} />
      ))}
      <div className={cx("see-more")}>
        <p className={cx("see-more-btn")}>{atb}</p>
      </div>
    </div>
  );
}

export default DivSelect
