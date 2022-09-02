import classNames from "classnames/bind"
import { ProcessIcon } from "../../../assets/icons/icons"
import styles from "./Uploading.module.scss"
const cx = classNames.bind(styles)


export default function Uploading({ onClick }: any) {
    return (
        <div className={cx("input_uploading")}>
            <div className={cx("input_process")}>
                <div className={cx("input_process-item")}>0%</div>
                <ProcessIcon />
            </div>
            <div className={cx("input_title")}>Uploading</div>
            <button className={cx("input_cancel")} onClick={onClick}>
                <div className={cx("input_cancel-item")}>
                    <div className={cx("input_cancel--item")}>Cancel</div>
                </div>
            </button>
        </div>
    )
}
