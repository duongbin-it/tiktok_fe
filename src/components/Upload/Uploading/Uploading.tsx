import classNames from "classnames/bind";
import { ProcessIcon } from "../../../assets/icons/icons";
import styles from "./Uploading.module.scss";
const cx = classNames.bind(styles);


export default function Uploading() {
    return (
        <div className={cx("input_uploading")}>
            <div className={cx("input_process")}>
                <div className={cx("input_process-item")}>0%</div>
                {/* <ProcessIcon /> */}

                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">
                    <defs>
                        <linearGradient x1="0%" x2="0%" y1="100%" y2="0%">
                            <stop offset="0%" stopColor="red"></stop>
                            <stop offset="100%" stopColor="#ff0"></stop>
                        </linearGradient>
                    </defs>
                    <circle
                        cx="40"
                        cy="40"
                        r="36"
                        fill="transparent"
                        stroke="rgba(22, 24, 35, 0.12)"
                        strokeDasharray="226.1946710584651 226.1946710584651"
                        strokeWidth="4"
                        className="tiktok-progress-background"
                    ></circle>
                    <circle
                        cx="40"
                        cy="40"
                        r="36"
                        fill="transparent"
                        stroke="#FE2C55"
                        strokeDasharray="226.1946710584651 226.1946710584651"
                        strokeDashoffset="99.526"
                        strokeLinecap="square"
                        strokeWidth="4"
                        className={cx("tiktok-progress-bar")}
                        transform="rotate(-90)"
                    ></circle>
                </svg>
            </div>
            <div className={cx("input_title")}>Uploading</div>
            <button className={cx("input_cancel")}>
                <div className={cx("input_cancel-item")}>
                    <div className={cx("input_cancel--item")}>Cancel</div>
                </div>
            </button>
        </div>
    )
}
