import classNames from "classnames/bind"
import styles from "./Uploader.module.scss"


const cx = classNames.bind(styles)

interface Props {
    onClick?: any,
    content: string
}


const Upload: React.FC<Props> = ({ onClick, content }) => {
    return (
        <div className={cx("input_upload")} onClick={onClick}>
            <img src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/cloud-icon1.ecf0bf2b.svg"
                alt="Upload" style={{ width: 40, height: 29 }} />
            <div className={cx("title_select")}>
                <span className={cx("title_select-item")}>Select video to upload</span>
            </div>
            <div className={cx("note-title_select")}>
                <span className={cx("title_select-item")}>Or drag and drop a file</span>
            </div>
            <div className={cx("type_select")}>
                <div className={cx("type_select-item")}>
                    <span className={cx("title_button")}>MP4 or WebM</span>
                </div>
                <div className={cx("type_select-item")}>
                    <span className={cx("title_button")}>720x1280 resolution or higher</span>
                </div>
                <div className={cx("type_select-item")}>
                    <span className={cx("title_button")}>Up to 10 minutes</span>
                </div>
                <div className={cx("type_select-itemlast")}>
                    <span className={cx("title_button")}>Less than 2 GB</span>
                </div>
            </div>
            <div className={cx("button_select")}>
                <button className={cx("button_select-button")}>
                    <div className={cx("button_container")}>
                        <div className={cx("button_content")}>{content}</div>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Upload
