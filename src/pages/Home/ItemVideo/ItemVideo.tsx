/* eslint-disable react-hooks/exhaustive-deps */
import Tippy from "@tippyjs/react/headless"
import classNames from "classnames/bind"
import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'
import { CheckIcon, CommentIcon, HeartactiveIcon, HeartIcon, MoreIcon, MusicIcon, PauseIcon, PlayIcon, ReportIcon, ShareIcon, SoundIcon, UnSoundIcon } from "../../../assets/icons/icons"
import Button from "../../../components/Button/Button"
import { Following, handleShowLogin, Hearted } from "../../../components/GlobalFunction/GlobalFunction"
import Tippys from "../../../components/Tippys/Tippys"
import useElementOnScreen from "../../../hooks/useElementOnScreen"
import TippyShare from '../../../layouts/components/TippyShare/TippyShare'
import { setButtonSound } from "../../../redux/actions"
import styles from "./ItemVideo.module.scss"

var numeral = require('numeral')
const cx = classNames.bind(styles)


interface Props {
  data: any,
  big: false,
}

const ItemVideo: React.FC<Props> = ({ data, big = false }) => {

  const dispath = useDispatch()
  const sound = useSelector<any>(item => item['sound'])

  const [play, setPlay] = useState<boolean>(false)
  const [time, setTime] = useState<any>(null)
  const [follow, setFollow] = useState<boolean>(data.following)
  const [heart, setHeart] = useState<boolean>(data.heart_check)
  const ref = useRef<HTMLDivElement>(null)
  const ref_img = useRef<HTMLImageElement>(null)
  const ref_avatar = useRef<HTMLImageElement>(null)
  const refSound = useRef<HTMLDivElement>(null)
  const ref_video = useRef<HTMLVideoElement>(null)
  const updateTime = useRef<HTMLDivElement>(null)
  const progres = useRef<HTMLInputElement>(null)
  const progress = useRef<HTMLInputElement>(null)
  const progress__trackupdat = useRef<HTMLDivElement>(null)
  const progress__trackupdate = useRef<HTMLDivElement>(null)


  const isVisibile_video = useElementOnScreen({ threshold: 1 }, ref_video)
  const isVisibile_img = useElementOnScreen({ threshold: 0.5 }, ref_img)
  const isVisibile_avatar = useElementOnScreen({ threshold: 0.5 }, ref_avatar)


  const CurrentUser = localStorage.getItem("user")

  function handleFollow(buff: any) {
    if (CurrentUser) {
      setFollow(!follow)
      Following(data, buff)
    } else {
      handleShowLogin()
    }
  }


  useEffect(() => {
    if (isVisibile_video) {
      if (!play) {
        if (!ref_video.current?.getAttribute('src')) {
          ref_video.current?.setAttribute("src", String(ref_video.current.getAttribute('lazy-src')))
        }
        setPlay(true)
        ref_video.current?.play()
        ref_video.current!.currentTime = 0
      }
    } else {
      if (play) {
        ref_video.current?.pause()
        setPlay(false)
      }
    }
  }, [isVisibile_video])


  useEffect(() => {
    if (isVisibile_img && !ref_img.current?.getAttribute('src')) {
      ref_img.current?.setAttribute("src", String(ref_img.current.getAttribute('lazys-src')))
    }
  }, [isVisibile_img])


  useEffect(() => {
    if (isVisibile_avatar && !ref_avatar.current?.getAttribute('src')) {
      ref_avatar.current?.setAttribute("src", String(ref_avatar.current.getAttribute('lazy1-src')))
    }
  }, [isVisibile_avatar])


  useEffect(() => {
    const Click = ref.current!.onclick = function () {
      if (!play) {
        ref_video.current?.play()
        setPlay(false)
      } else {
        ref_video.current?.pause()
        setPlay(true)
      }
    }

    return () => {
      ref.current?.removeEventListener('click', Click)
    }
  }, [play])

  useEffect(() => {
    const timeUpdate = ref_video.current!.ontimeupdate = function () {
      if (ref_video.current?.duration) {
        const progressPercent = Math.floor((ref_video.current?.currentTime / ref_video.current?.duration) * 100)
        setTime(
          (Math.floor(ref_video.current?.currentTime).toString().length >= 2 ? "00:" + Math.floor(ref_video.current?.currentTime) : "00:0" + Math.floor(ref_video.current?.currentTime)) +
          "/" +
          (Math.floor(ref_video.current?.duration).toString().length >= 2 ? "00:" + Math.floor(ref_video.current?.duration) : "00:0" + Math.floor(ref_video.current?.duration))
        )
        progress__trackupdate.current!.style.width = progressPercent + "%"
      }
    }

    const mouseOver = ref_video.current!.onmouseover = function () {
      if (ref_video.current?.duration) {
        setTime(
          (Math.floor(ref_video.current?.currentTime).toString().length >= 2 ? "00:" + Math.floor(ref_video.current?.currentTime) : "00:0" + Math.floor(ref_video.current?.currentTime)) +
          "/" +
          (Math.floor(ref_video.current?.duration).toString().length >= 2 ? "00:" + Math.floor(ref_video.current?.duration) : "00:0" + Math.floor(ref_video.current?.duration))
        )
      }
    }

    const ended = ref_video.current!.onended = function () {
      progress__trackupdate.current!.style.width = 0 + "%"
    }

    return () => {
      ref_video.current?.removeEventListener('timeupdate', timeUpdate)
      ref_video.current?.removeEventListener('mouseover', mouseOver)
      ref_video.current?.removeEventListener('ended', ended)
    }
  }, [time, play])

  useEffect(() => {
    const inPut = progress.current!.oninput = function (e) {
      progress__trackupdate.current!.style.width = (e.target as HTMLInputElement).value + "%"
      const seekTime = (Number((e.target as HTMLInputElement).value) * ref_video.current!.duration) / 100
      ref_video.current!.currentTime = seekTime
    }

    const mouseDown = progress.current!.onmousedown = function () {
      ref_video.current?.pause()
    }

    const mouseUp = progress.current!.onmouseup = function () {
      if (isVisibile_video) {
        ref_video.current?.play()
      }
    }

    return () => {
      progress.current?.removeEventListener('input', inPut)
      progress.current?.removeEventListener('mousedown', mouseDown)
      progress.current?.removeEventListener('mouseup', mouseUp)
    }
  }, [progress__trackupdate.current?.style.width])

  useEffect(() => {
    const inPut = progres.current!.oninput = function (e) {
      progress__trackupdat.current!.style.height = (e.target as HTMLInputElement).value + "%"
      let volume = Number((e.target as HTMLInputElement).value) / 100
      ref_video.current!.volume = volume
      if (volume < 0.01) {
        dispath(setButtonSound(true))
      } else {
        dispath(setButtonSound(false))
      }
    }

    const Click = refSound.current!.onclick = function () {
      dispath(setButtonSound(!sound))
      if (sound) {
        document.querySelectorAll(`[class='${ref_video.current?.className}']`).forEach(item => {
          (item as HTMLVideoElement).muted = false
        })
        document.querySelectorAll(`[class='${progress__trackupdat.current?.className}']`).forEach(item => {
          (item as HTMLDivElement).style.height = "100%"
        })
      } else {
        document.querySelectorAll(`[class='${ref_video.current?.className}']`).forEach(item => {
          (item as HTMLVideoElement).muted = true
        })
        document.querySelectorAll(`[class='${progress__trackupdat.current?.className}']`).forEach(item => {
          (item as HTMLDivElement).style.height = "0%"
        })
      }
    }

    return () => {
      progres.current?.removeEventListener('input', inPut)
      refSound.current?.removeEventListener('click', Click)
    }
  }, [sound])

  return (
    <div className={cx("wrapper")}>
      <Tippys setFollow={setFollow} data={data}>
        {
          data.live
            ? <Link className={cx("link-btn")} to={`/@${data.username}`}>
              <div className={cx("link-btn_div")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="none" className={cx('live-icon')} viewBox="0 0 52 52">
                  <circle cx="26" cy="26" r="25.25" stroke="url(#paint0_linear)" strokeWidth="1.5"></circle>
                  <defs>
                    <linearGradient
                      id="paint0_linear" x1="-22.739" x2="29.261" y1="26" y2="71.479" gradientUnits="userSpaceOnUse"><stop stopColor="#FF1764"></stop><stop offset="1" stopColor="#ED3495"></stop>
                    </linearGradient>
                  </defs>
                </svg>

                <span className={cx("link-btn_span1")}>
                  <img style={{ width: 100 + "%", height: 100 + "%", objectFit: "cover", maxWidth: '100%', display: "block" }} lazy1-src={data.avatar} alt={'avatar'} ref={ref_avatar} />
                </span>
                <span className={cx('live-stream')}>LIVE</span>
              </div>
            </Link>
            :
            <Link className={cx("link-btn")} to={`/@${data.username}`}>
              <div className={cx("link-btn_div1")}>
                <span className={cx("link-btn_span")}>
                  <img style={{ width: 100 + "%", height: 100 + "%", objectFit: "cover" }} lazy1-src={data.avatar} alt={'avatar'} ref={ref_avatar} />
                </span>
              </div>
            </Link>
        }
      </Tippys>

      {/* content-title */}
      <div className={cx("div-btn-content")}>
        <div className={cx("div-btn_item")}>
          <div className={cx("div-btn_item-div")}>
            <div style={{ display: "block" }}>
              <h3 className={cx("title")}>
                <a href={`/@${data.username}`}>{data.username}</a>
                {data.blue_check ? <CheckIcon marginLeft={4} marginRight={2} /> : null}
              </h3>
              <h4 className={cx("name-title")}>{data.name}</h4>
            </div>
          </div>
          {(() => {
            if (follow && CurrentUser) {
              return (
                <Button following onClick={() => handleFollow(false)}>
                  Following
                </Button>
              )
            }
            else if (data.username === localStorage.getItem("username") && CurrentUser) {
              return (
                <Tippy
                  interactive
                  appendTo={document.body}
                  offset={[125, 6]}
                  placement='bottom-end'
                  trigger="click"
                  render={(attrs) => (
                    <div className={cx('content')} tabIndex={-1} {...attrs}>
                      <div className={cx("tippy__wrapper")}>
                        <div className={cx("tippy__wrapper--item")}>
                          <a className={cx("tippy__link")} href="/">
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                x="0"
                                y="0"
                                fill="currentColor"
                                viewBox="0 0 64 64"
                                style={{ paddingRight: 6 }}
                              >
                                <path d="M26.938 4a2.99 2.99 0 00-2.305 1.08.993.993 0 00-.143.227L22.357 10H11c-1.654 0-3 1.346-3 3v6c0 1.654 1.346 3 3 3h2v35c0 1.654 1.346 3 3 3h32c1.654 0 3-1.346 3-3V22h2c1.654 0 3-1.346 3-3v-6c0-1.654-1.346-3-3-3H41.645l-2.133-4.693a1.006 1.006 0 00-.143-.227A2.993 2.993 0 0037.064 4H26.937zm0 2h10.125c.26 0 .507.1.69.277L39.448 10H24.553l1.693-3.723A.999.999 0 0126.938 6zM11 12h42c.551 0 1 .448 1 1v6c0 .552-.449 1-1 1H11c-.551 0-1-.448-1-1v-6c0-.552.449-1 1-1zm3 2a1 1 0 00-1 1v2a1 1 0 102 0v-2a1 1 0 00-1-1zm5 0a1 1 0 00-1 1v2a1 1 0 102 0v-2a1 1 0 00-1-1zm5 0a1 1 0 00-1 1v2a1 1 0 102 0v-2a1 1 0 00-1-1zm5 0a1 1 0 00-1 1v2a1 1 0 102 0v-2a1 1 0 00-1-1zm6 0a1 1 0 00-1 1v2a1 1 0 102 0v-2a1 1 0 00-1-1zm5 0a1 1 0 00-1 1v2a1 1 0 102 0v-2a1 1 0 00-1-1zm5 0a1 1 0 00-1 1v2a1 1 0 102 0v-2a1 1 0 00-1-1zm5 0a1 1 0 00-1 1v2a1 1 0 102 0v-2a1 1 0 00-1-1zm-35 8h34v35c0 .552-.449 1-1 1H16c-.551 0-1-.448-1-1v-1h23a1 1 0 100-2H15V22zm5 6a1 1 0 00-1 1v12a1 1 0 102 0V29a1 1 0 00-1-1zm8 0a1 1 0 00-1 1v20a1 1 0 102 0V29a1 1 0 00-1-1zm8 0a1 1 0 00-1 1v20a1 1 0 102 0V29a1 1 0 00-1-1zm8 0a1 1 0 00-1 1v4a1 1 0 102 0v-4a1 1 0 00-1-1zm0 8a1 1 0 00-1 1v12a1 1 0 102 0V37a1 1 0 00-1-1zm-24 8a1 1 0 00-1 1v4a1 1 0 102 0v-4a1 1 0 00-1-1zm22 10a1 1 0 100 2h4a1 1 0 100-2h-4z"></path>
                              </svg>
                            </div>
                            <span className={cx("tippy__link--hover")}>Xóa video</span>
                          </a>
                        </div>
                        <div className={cx("tippy__wrapper--item")}>
                          <a className={cx("tippy__link")} href="/">
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                x="0"
                                y="0"
                                viewBox="0 0 32 32"
                                fill="currentColor"
                                style={{ paddingRight: 6 }}
                              >
                                <path d="M23.9 3.973a4.102 4.102 0 00-2.908 1.22L5.18 21.008l-1.455 7.267 7.267-1.455.215-.213 15.6-15.6a4.074 4.074 0 000-5.814 4.097 4.097 0 00-2.907-1.22zm0 1.904c.503 0 1.006.244 1.493.73.973.974.973 2.013 0 2.987l-.694.691-2.984-2.984.691-.694c.487-.486.991-.73 1.494-.73zm-3.6 2.838l2.985 2.984-12.11 12.112a6.779 6.779 0 00-2.986-2.987l12.112-12.11zM6.905 22.576a4.61 4.61 0 012.522 2.52l-3.15.63.628-3.15z"></path>
                              </svg>
                            </div>
                            <span className={cx("tippy__link--hover")}>Chỉnh sửa video</span>
                          </a>
                        </div>
                        <div className={cx("tippy__wrapper--item")}>
                          <a className={cx("tippy__link")} href="/">
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                x="0"
                                y="0"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                style={{ paddingRight: 6 }}
                              >
                                <path d="M2.5 2C1.676 2 1 2.676 1 3.5v9c0 .824.676 1.5 1.5 1.5h11c.824 0 1.5-.676 1.5-1.5v-7c0-.824-.676-1.5-1.5-1.5H6.797l-.652-1.21A1.496 1.496 0 004.825 2zm0 1h2.324c.184 0 .352.102.442.262L6.203 5H13.5c.281 0 .5.219.5.5V7H5.219C4.579 7 4 7.414 3.797 8.023L2.18 12.88A.484.484 0 012 12.5v-9c0-.281.219-.5.5-.5zm2.719 5H14v4.5c0 .281-.219.5-.5.5H3.195l1.551-4.656A.498.498 0 015.22 8z"></path>
                              </svg>
                            </div>
                            <span className={cx("tippy__link--hover")}>Tải video này xuống</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                >
                  <div className={cx("settings__videos")}>
                    <MoreIcon />
                  </div>
                </Tippy>
              )
            }
            else {
              return (
                <Button follow onClick={() => handleFollow(true)}>
                  Follow
                </Button>
              )
            }
          })()}
          <div style={{ fontSize: 16, lineHeight: 22 + "px", wordBreak: "break-word", width: 510 + "px", }}>
            <span className={cx('font-popers')}>{data.title}</span>
            {data.name_tag
              && data.name_tag.map((item: any) => (
                <a className={cx("tag")} href={`/tag/${item.key}`} target="_blank" rel="noreferrer" key={uuidv4()}>
                  <strong className={cx("tag_strong")}>
                    #{item.key}
                  </strong>
                </a>
              ))}
          </div>
          <h4 className={cx("video-music")}>
            <a className={cx("video-music_a")} href={data.link_music}>
              <MusicIcon marginRight={5} marginTop={2} />
              {data.name_music}
            </a>
          </h4>
        </div>

        {/* xử lý video */}
        <div className={cx("div-btn-video")}>
          <div className={big ? cx("div_first", "Big") : cx("div_first")}>
            <img lazys-src={data.link_video.replace("mp4", "jpg")} alt="video" ref={ref_img} />
            <div className={cx("div_first-item")}>
              <div className={cx("div-1")}>
                <div className={cx("div-1_item")}>
                  <video loop muted={true} preload="none" className={cx("display")} ref={ref_video} lazy-src={data.link_video} />
                </div>
              </div>
              <div className={cx("button-play")} onClick={() => setPlay(!play)} ref={ref}>
                {play ? <PlayIcon /> : <PauseIcon />}
              </div>
              <div className={cx("toast-sound")}>
                <div className={cx("button-sound")} ref={refSound}>
                  <div className={cx("video-sound")}>{sound ? <UnSoundIcon /> : <SoundIcon />}</div>
                </div>
                <div className={cx("edit-sound")}>
                  <input className={cx("progres")} type="range" step="1" min="0" max="100" ref={progres} />
                  <div className={cx("progress__trac")}>
                    <div className={cx("progress__track-updat")} ref={progress__trackupdat}></div>
                  </div>
                </div>
              </div>
              <div className={cx("button-footer")}>
                <div className={cx("process-item")}>
                  <input className={cx("progress")} type="range" step="1" min="0" max="100" ref={progress} />
                  <div className={cx("progress__track")}>
                    <div className={cx("progress__track-update")} ref={progress__trackupdate}></div>
                  </div>
                </div>
                <div className={cx("process-number")} ref={updateTime}>
                  {time}
                </div>
              </div>
              <p className={cx("button-report")}><ReportIcon marginRight="5" />Report</p>
            </div>
          </div>
          <div className={cx("button-reaction")}>
            <button className={cx("button-heart")} onClick={() => { setHeart(!heart); if (!CurrentUser) { handleShowLogin() } else Hearted(data, !heart) }}>
              <span className={cx("title-reaction")}>
                {heart && CurrentUser ? <HeartactiveIcon /> : <HeartIcon />}
              </span>
              <strong className={cx("title-reactjs")}>
                {data.heart.toString().length >= 4 ? numeral(data.heart).format('0.0a').toString().toUpperCase() : data.heart}
              </strong>
            </button>
            <button className={cx("button-heart")} onClick={handleShowLogin}>
              <span className={cx("title-reaction")}>
                <CommentIcon />
              </span>
              <strong className={cx("title-reactjs")}>
                {data.comment.toString().length >= 4 ? numeral(data.comment).format('0.0a').toString().toUpperCase() : data.comment}
              </strong>
            </button>
            <TippyShare>
              <button className={cx("button-heart")} onClick={handleShowLogin}>
                <span className={cx("title-reaction")}>
                  <ShareIcon />
                </span>
                <strong className={cx("title-reactjs")}>
                  {data.share.toString().length >= 4 ? numeral(data.share).format('0.0a').toString().toUpperCase() : data.share}
                </strong>
              </button>
            </TippyShare>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemVideo
