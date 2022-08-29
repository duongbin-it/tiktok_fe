import axios from "axios";
import classNames from "classnames/bind";
import React, { useEffect, useRef, useState } from "react";
import { CheckboxIcon, DropdownIcon } from '../../assets/icons/icons';
import Button from '../../components/Button/Button';
import Uploader from "../../components/Upload/Uploader/Uploader";
import Uploading from '../../components/Upload/Uploading/Uploading';
import styles from "./Upload.module.scss";


const cx = classNames.bind(styles);


const Upload: React.FC = () => {

    const file = useRef<HTMLInputElement>(null)
    const ref_input = useRef<HTMLInputElement>(null);
    const radio_button = useRef<HTMLDivElement>(null)
    const radio_button_item = useRef<HTMLDivElement>(null)
    const span_item = useRef<HTMLSpanElement>(null)
    const rotate_dropdown = useRef<HTMLDivElement>(null)
    const show_dropdown = useRef<HTMLDivElement>(null)

    const [sharp, setSharp] = useState<string>("");
    const [item, setItem] = useState<string>("Public")
    const [button, setButton] = useState<boolean>(true)
    const [dropdown, setDropdown] = useState<boolean>(false)
    const [showinput, setShowinput] = useState<string>("")

    console.log(showinput);


    useEffect(() => {
        (radio_button.current as HTMLDivElement).onclick = () => {
            setButton(!button);
            if (button) {
                (radio_button_item.current as HTMLDivElement).style.backgroundColor = "rgb(11, 224, 155)";
                (span_item.current as HTMLSpanElement).style.left = "calc(100% - 2px)";
                (span_item.current as HTMLSpanElement).style.transform = "translate(-100%, -50%)";

            }
            else {
                (radio_button_item.current as HTMLDivElement).style.backgroundColor = "rgba(22, 24, 35, 0.12)";
                (span_item.current as HTMLSpanElement).style.left = "2px";
                (span_item.current as HTMLSpanElement).style.transform = "translateY(-50%)";
            }
        }
    }, [button])

    const opendialogFile = () => {
        (file.current as HTMLInputElement).click();
    }

    useEffect(() => {
        (file.current as HTMLInputElement).onchange = async (e: any) => {

            let currentFile = e.target.files[0]
            setShowinput(currentFile.name)
            const formData = new FormData()
            formData.append("upload_preset", "tiktok_be-upload")
            formData.append("file", currentFile)
            formData.append("folder", "image")

            const infoUpload = await axios.post("https://api.cloudinary.com/v1_1/dmb7ox9vh/image/upload", formData)
                .then((res) => {
                    return res
                })
            console.log(infoUpload.data.url);
        }
    }, [file])

    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <div className={cx("content")}>
                    <span className={cx("title")}>Upload video</span>
                    <div style={{ marginTop: 2 }}>
                        <span className={cx("note_title")}>Post a video to your account</span>
                    </div>
                    <div className={cx("upload_video")}>
                        <input type="file" hidden={true} ref={file} />
                        <div className={cx("layout_left")}>
                            {showinput ? <Uploading onClick={() => setShowinput("")} /> : <Uploader onClick={opendialogFile} />}
                        </div>
                        <div className={cx("layout_right")}>
                            <div className={cx("group")}>
                                <div className={cx("layout_right-container")}>
                                    <span className={cx("caption")}>Caption</span>
                                    <span className={cx("length-notation")}>0 / 150</span>
                                </div>
                                <div className={cx("input-tag")}>
                                    <input type="text" className={cx("input-tag_item")} ref={ref_input}
                                        onChange={(e) => { setSharp(e.target.value) }} value={sharp} />
                                    <div className={cx("icon-tag1")} onClick={() => { setSharp(prev => prev + "@"); ref_input.current?.focus() }}>
                                        <img src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/at.062a03e9.svg" alt="@" />
                                    </div>
                                    <div className={cx("icon-tag2")} onClick={() => { setSharp(prev => prev + "#"); ref_input.current?.focus() }}>
                                        <img src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/hashtag.234f1b9c.svg" alt="#" />
                                    </div>
                                </div>
                            </div>
                            <div className={cx("group")}>
                                <span className={cx("privacy")}>Cover</span>
                                <div className={cx("show-cover")}>
                                    <div className={cx("show-cover_item")}>
                                        <div className={cx("show-cover_item-item")}></div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx("group")}>
                                <span className={cx("privacy")}>Who can view this video</span>
                                <div className={cx("show-dropdown")}>
                                    <div className={cx("show-dropdown_item")} onClick={() => {
                                        if (dropdown) {
                                            (rotate_dropdown.current as HTMLDivElement).style.transform = "rotate(0deg)";
                                            (show_dropdown.current as HTMLDivElement).style.maxHeight = "0";
                                            setDropdown(false)
                                        } else {
                                            (rotate_dropdown.current as HTMLDivElement).style.transform = "rotate(-180deg)";
                                            (show_dropdown.current as HTMLDivElement).style.maxHeight = "1000px";
                                            setDropdown(true)
                                        }
                                    }}>
                                        <div className={cx("show-dropdown_item-item")}>
                                            <span className={cx("privacy-title")}>{item}</span>
                                            <div className={cx("rotate_dropdown")} ref={rotate_dropdown}>
                                                <DropdownIcon />
                                            </div>
                                            <div className={cx("drop_down--container")} ref={show_dropdown}>
                                                <span className={cx("drop_down--item")}
                                                    style={item === "Public" ? { backgroundColor: "rgba(22, 24, 35, 0.06)" } : { backgroundColor: 'transparent' }}
                                                    onClick={() => setItem("Public")}>Public</span>
                                                <span className={cx("drop_down--item")}
                                                    style={item === "Friends" ? { backgroundColor: "rgba(22, 24, 35, 0.06)" } : { backgroundColor: 'transparent' }}
                                                    onClick={() => setItem("Friends")}>Friends</span>
                                                <span className={cx("drop_down--item")}
                                                    style={item === "Private" ? { backgroundColor: "rgba(22, 24, 35, 0.06)" } : { backgroundColor: 'transparent' }}
                                                    onClick={() => setItem("Private")}>Private</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx("group")}>
                                <span className={cx("privacy")}>Allow users to:</span>
                                <div className={cx("input-checkbox")} style={{ display: "flex", marginTop: 6 }}>
                                    <div className={cx("input-checkbox--item")}>
                                        <div className={cx("div-checkbox")}>
                                            <input className={cx("input-item")} type="checkbox" id="1" />
                                            <div className={cx("checked-checkbox")}>
                                                <CheckboxIcon />
                                            </div>
                                        </div>
                                        <div className={cx("label")}>
                                            <label htmlFor="1" style={{ paddingLeft: 12 }}>
                                                <span className={cx("label-checkbox")}>Comment</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className={cx("input-checkbox--item")}>
                                        <div className={cx("div-checkbox")}>
                                            <input className={cx("input-item")} type="checkbox" id="2" />
                                            <div className={cx("checked-checkbox")}>
                                                <CheckboxIcon />
                                            </div>
                                        </div>
                                        <div className={cx("label")}>
                                            <label htmlFor="2" style={{ paddingLeft: 12 }}>
                                                <span className={cx("label-checkbox")}>Duet</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className={cx("input-checkbox--item")}>
                                        <div className={cx("div-checkbox")}>
                                            <input className={cx("input-item")} type="checkbox" id="3" />
                                            <div className={cx("checked-checkbox")}>
                                                <CheckboxIcon />
                                            </div>
                                        </div>
                                        <div className={cx("label")}>
                                            <label htmlFor="3" style={{ paddingLeft: 12 }}>
                                                <span className={cx("label-checkbox")}>Stitch</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx("group1")}>
                                <div style={{ display: "flex", alignItems: "center", paddingTop: 4 }}>
                                    <span className={cx("privacy")}>Run a copyright check</span>
                                    <div className={cx("radio-button")} ref={radio_button}>
                                        <div className={cx("radio-button-item")} ref={radio_button_item}>
                                            <span className={cx("span-item")} ref={span_item}></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx("group")}>
                                <span className={cx("policity")}
                                >We'll check your video for potential copyright infringements on used sounds. If infringements are found, you can edit the video before posting.
                                </span>
                                <span className={cx("policity1")}>Learn more</span>
                            </div>
                            <div className={cx("group1")}>
                                <div className={cx("button-property")}>
                                    <Button button_property>Discard</Button>
                                    <Button button_property_none>Post</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Upload