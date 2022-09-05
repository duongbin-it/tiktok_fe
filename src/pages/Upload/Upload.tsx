/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
import { generateVideoThumbnails } from "@rajesh896/video-thumbnails-generator"
import axios from "axios"
import classNames from "classnames/bind"
import getImageSize from 'image-size-from-url'
import React, { useEffect, useRef, useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import { POST_VIDEO } from "../../api/api"
import { CheckboxIcon, DropdownIcon } from '../../assets/icons/icons'
import Button from '../../components/Button/Button'
import { EffectLoading } from "../../components/Effect/EffectLoading"
import Uploader from "../../components/Upload/Uploader/Uploader"
import Uploading from '../../components/Upload/Uploading/Uploading'
import styles from "./Upload.module.scss"

const bytes = require('bytes')
const cx = classNames.bind(styles)

const Upload: React.FC = () => {

    const file = useRef<HTMLInputElement>(null)
    const ref_input = useRef<HTMLInputElement>(null)
    const radio_button = useRef<HTMLDivElement>(null)
    const radio_button_item = useRef<HTMLDivElement>(null)
    const span_item = useRef<HTMLSpanElement>(null)
    const rotate_dropdown = useRef<HTMLDivElement>(null)
    const show_dropdown = useRef<HTMLDivElement>(null)

    const [base64Video, setbaseVideo] = useState<string>("")
    const [listimage, setListimage] = useState<string[]>([])
    const [length, setLength] = useState(0)
    const [sharp, setSharp] = useState<string>("")
    const [item, setItem] = useState<string>("Public")
    const [button, setButton] = useState<boolean>(true)
    const [dropdown, setDropdown] = useState<boolean>(false)
    const [showinput, setShowinput] = useState<any>("")
    const [data, setData] = useState<string>("select")


    useEffect(() => {
        (radio_button.current as HTMLDivElement).onclick = () => {
            setButton(!button)
            if (button) {
                (radio_button_item.current as HTMLDivElement).style.backgroundColor = "rgb(11, 224, 155)";
                (span_item.current as HTMLSpanElement).style.left = "calc(100% - 2px)";
                (span_item.current as HTMLSpanElement).style.transform = "translate(-100%, -50%)"

            }
            else {
                (radio_button_item.current as HTMLDivElement).style.backgroundColor = "rgba(22, 24, 35, 0.12)";
                (span_item.current as HTMLSpanElement).style.left = "2px";
                (span_item.current as HTMLSpanElement).style.transform = "translateY(-50%)"
            }
        }
    }, [button])

    const opendialogFile = () => {
        (file.current as HTMLInputElement).click()
    }

    useEffect(() => {
        (file.current as HTMLInputElement).onchange = (e: any) => {
            setListimage([])
            const currentFile = e.target.files[0]
            setShowinput(currentFile)
            setTimeout(() => {
                const reader = new FileReader()
                reader.readAsDataURL(currentFile)
                reader.onload = () => {
                    setData('change')
                    ref_input.current!.placeholder = showinput;
                    (document.querySelector(`[class='${cx("input-tag")}']`) as HTMLDivElement).style.pointerEvents = 'unset';
                    (ref_input.current as HTMLInputElement).style.color = 'unset';
                    (ref_input.current as HTMLInputElement).style.background = 'unset';
                    (ref_input.current as HTMLInputElement).style.pointerEvents = 'unset';
                    (ref_input.current as HTMLInputElement).style.border = '1px solid rgba(22, 24, 35, 0.12)';
                    (ref_input.current as HTMLInputElement).placeholder = 'Hãy nhập nội dung video của bạn ở đây...'
                    reader.result && setbaseVideo(String(reader.result))
                    generateVideoThumbnails(currentFile, 8, "video").then((thumbnailArray) => {
                        thumbnailArray.map((item) => {
                            return setListimage(prev => [...prev, item])
                        })
                    }).catch((err) => {
                        console.error(err)
                    })
                }
            }, 1000)
        }
    }, [file, showinput])

    const postVideo = async () => {
        (document.querySelector("[class='svg-css']") as HTMLDivElement).style.display = 'block'
        setSharp("")
        ref_input.current!.placeholder = ""
        const title = []
        const array: {}[] = []
        const tag = sharp.split(" ")

        for (const key in tag) {
            if (tag[key].includes("#")) {
                await array.push({ key: tag[key].replace("#", "") })
            }
            else {
                await title.push(tag[key])
            }
        }

        const content = title.join(" ")
        const formData = new FormData()
        formData.append("upload_preset", "tiktok_be-upload")
        formData.append("file", showinput)
        formData.append("folder", "video")

        await axios.post("https://api.cloudinary.com/v1_1/dmb7ox9vh/video/upload", formData)
            .then(async (infoUpload) => {
                const { width } = await getImageSize(infoUpload.data.url.replace("mp4", "jpg"))
                await axios.post(POST_VIDEO, {
                    "username": localStorage.getItem("username"),
                    "title": content.trim(),
                    "heart": 0,
                    "share": 0,
                    "comment": 0,
                    "height": width > 600 ? "unset" : 504.25,
                    "name_tag": array,
                    "link_music": "https://www.tiktok.com/music/nh%E1%BA%A1c-n%E1%BB%81n-%F0%9D%99%A7%F0%9D%99%A4%F0%9D%99%A1%F0%9D%99%A1%F0%9D%99%9A%F0%9D%99%A3-7123551846429461275",
                    "link_video": infoUpload.data.url,
                    "asset_id": infoUpload.data.asset_id,
                    "name_music": `nhạc nền - ${localStorage.getItem("user")}`,
                    "heart_check": false
                })
                    .then(() => {
                        (document.querySelector("[class='svg-css']") as HTMLDivElement).style.display = 'none'
                        setSharp("Upload Lên TikTok thành công! 😀")
                        setTimeout(() => {
                            location.href = '/'
                        }, 1000)
                    })
            })
    }

    return (
        <div className={cx("wrapper")}>
            <EffectLoading />
            <div className={cx("container")}>
                <div className={cx("content")}>
                    <span className={cx("title")}>Upload video</span>
                    <div style={{ marginTop: 2 }}>
                        <span className={cx("note_title")}>Post a video to your account</span>
                    </div>
                    <div className={cx("upload_video")}>
                        <input type="file" hidden={true} ref={file} accept="video/mp4,video/x-m4v,video/*" />
                        <div className={cx("layout_left")}>
                            {data
                                ? data === 'select'
                                    ? <Uploader onClick={opendialogFile} content="Select file" />
                                    : <Uploader onClick={opendialogFile} content="Change file"
                                        name_file={showinput.name}
                                        title="Successfully uploaded"
                                        size={"Size video: " + bytes.format(showinput.size, { unitSeparator: ' ' })}
                                    />
                                : <Uploading />
                            }
                        </div>
                        <div className={cx("layout_right")}>
                            <div className={cx("group")}>
                                <div className={cx("layout_right-container")}>
                                    <span className={cx("caption")}>Caption</span>
                                    <span className={cx("length-notation")}>{length} / 150</span>
                                </div>
                                <div className={cx("input-tag")}>
                                    <input type="text" className={cx("input-tag_item")} ref={ref_input} placeholder="Hãy nhập nội dung video của bạn ở đây..."
                                        onChange={
                                            (e) => {
                                                if (!e.target.value.startsWith(" ")) {
                                                    setLength(e.target.value.length)
                                                    const lastValue = e.target.value.slice(e.target.value.length - 1, e.target.value.length)
                                                    if (lastValue === "#") {
                                                        setSharp(e.target.value.slice(0, e.target.value.length - 1) + " " + lastValue)
                                                    }
                                                    else {
                                                        setSharp(e.target.value)
                                                    }
                                                }
                                            }} value={sharp} maxLength={150} />
                                    <div className={cx("icon-tag1")} onClick={() => {
                                        ref_input.current?.value.length === 0 ? setSharp(prev => prev + "@") : setSharp(prev => prev + " @")
                                        ref_input.current?.focus()
                                        setLength(ref_input.current!.value.length)
                                    }}>
                                        <img
                                            src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/at.062a03e9.svg" alt="@" />
                                    </div>
                                    <div className={cx("icon-tag2")} onClick={() => {
                                        ref_input.current?.value.length === 0 ? setSharp(prev => prev + "#") : setSharp(prev => prev + " #")
                                        ref_input.current?.focus()
                                        setLength(ref_input.current!.value.length)
                                    }}>
                                        <img
                                            alt="#"
                                            src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/hashtag.234f1b9c.svg"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={cx("group")}>
                                <span className={cx("privacy")}>Cover</span>
                                <div className={cx("show-cover")} >
                                    {listimage[0] && <div className={cx("show-cover_item")}>
                                        {listimage ? listimage.filter((item, index) => index <= 7 && item).map((item) => {
                                            return (
                                                <img key={uuidv4()} className={cx("show__cover-image")} alt="thumbnail" src={item} />
                                            )
                                        }) : null}
                                    </div>}
                                    {
                                        listimage[0]
                                            ?
                                            <div className={cx("image__scale")}>
                                                <div>
                                                    <video className={cx("image__scale--item")} src={base64Video} />
                                                </div>
                                            </div>
                                            :
                                            <div className={cx("image__scale-item")}></div>
                                    }
                                </div>
                            </div>
                            <div className={cx("group")}>
                                <span className={cx("privacy")}>Who can view this video</span>
                                <div className={cx("show-dropdown")}>
                                    <div className={cx("show-dropdown_item")} onClick={() => {
                                        if (dropdown) {
                                            (rotate_dropdown.current as HTMLDivElement).style.transform = "rotate(0deg)";
                                            (show_dropdown.current as HTMLDivElement).style.maxHeight = "0"
                                            setDropdown(false)
                                        } else {
                                            (rotate_dropdown.current as HTMLDivElement).style.transform = "rotate(-180deg)";
                                            (show_dropdown.current as HTMLDivElement).style.maxHeight = "1000px"
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
                                    {showinput && sharp ? <Button button_property_primary onClick={postVideo}>Post</Button> : <Button button_property_none>Post</Button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Upload