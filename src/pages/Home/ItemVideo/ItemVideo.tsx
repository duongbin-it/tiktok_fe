/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames/bind";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { CheckIcon, CommentIcon, HeartactiveIcon, HeartIcon, MusicIcon, PauseIcon, PlayIcon, ReportIcon, ShareIcon, SoundIcon, UnSoundIcon } from "../../../assets/icons/icons";
import Button from "../../../components/Button/Button";
import { Following, handleShowLogin, Hearted } from "../../../components/GlobalFunc/GlobalFunc";
import Tippys from "../../../components/Tippys/Tippys";
import useElementOnScreen from "../../../hooks/useElementOnScreen";
import TippyShare from '../../../layouts/components/TippyShare/TippyShare';
import { setButtonSound } from "../../../redux/actions";
import styles from "./ItemVideo.module.scss";

var numeral = require('numeral');
const cx = classNames.bind(styles);


interface Props {
  data: any,
  big: false,
}

const ItemVideo: React.FC<Props> = ({ data, big = false }) => {

  const dispath = useDispatch();
  const sound = useSelector<any>(item => item['sound']);

  const [play, setPlay] = useState<boolean>(false);
  const [time, setTime] = useState<any>(null);
  const [follow, setFollow] = useState<boolean>(data.following);
  const [heart, setHeart] = useState<boolean>(data.heart_check);
  const ref = useRef<HTMLDivElement>(null);
  const ref_img = useRef<HTMLImageElement>(null);
  const ref_avatar = useRef<HTMLImageElement>(null);
  const refSound = useRef<HTMLDivElement>(null);
  const ref_video = useRef<HTMLVideoElement>(null);
  const updateTime = useRef<HTMLDivElement>(null);
  const progres = useRef<HTMLInputElement>(null);
  const progress = useRef<HTMLInputElement>(null);
  const progress__trackupdat = useRef<HTMLDivElement>(null);
  const progress__trackupdate = useRef<HTMLDivElement>(null);
  const isVisibile_video = useElementOnScreen({ threshold: 1 }, ref_video);
  const isVisibile_img = useElementOnScreen({ threshold: 0.5 }, ref_img);
  const isVisibile_avatar = useElementOnScreen({ threshold: 0.5 }, ref_avatar);


  const CurrentUser = localStorage.getItem("user");

  function handleFollow(buff: any) {
    if (CurrentUser) {
      setFollow(!follow);
      Following(data, buff)
    } else {
      handleShowLogin();
    }
  }

  useEffect(() => {
    if (isVisibile_video) {
      if (!play) {
        if (!ref_video.current?.getAttribute('src')) {
          ref_video.current?.setAttribute("src", String(ref_video.current.getAttribute('lazy-src')))
        }
        setPlay(true);
        ref_video.current?.play();
      }
    } else {
      if (play) {
        ref_video.current?.pause();
        setPlay(false);
      }
    }
  }, [isVisibile_video]);


  useEffect(() => {
    if (isVisibile_img && !ref_img.current?.getAttribute('src')) {
      ref_img.current?.setAttribute("src", String(ref_img.current.getAttribute('lazys-src')));
    }
  }, [isVisibile_img])


  useEffect(() => {
    if (isVisibile_avatar && !ref_avatar.current?.getAttribute('src')) {
      ref_avatar.current?.setAttribute("src", String(ref_avatar.current.getAttribute('lazy1-src')));
    }
  }, [isVisibile_avatar])


  useEffect(() => {
    const Click = ref.current!.onclick = function () {
      if (!play) {
        ref_video.current?.play();
        setPlay(false);
      } else {
        ref_video.current?.pause();
        setPlay(true);
      }
    };

    return () => {
      ref.current?.removeEventListener('click', Click)
    }
  }, [play])

  useEffect(() => {
    const timeUpdate = ref_video.current!.ontimeupdate = function () {
      if (ref_video.current?.duration) {
        const progressPercent = Math.floor((ref_video.current?.currentTime / ref_video.current?.duration) * 100);
        setTime(
          (Math.floor(ref_video.current?.currentTime).toString().length >= 2 ? "00:" + Math.floor(ref_video.current?.currentTime) : "00:0" + Math.floor(ref_video.current?.currentTime)) +
          "/" +
          (Math.floor(ref_video.current?.duration).toString().length >= 2 ? "00:" + Math.floor(ref_video.current?.duration) : "00:0" + Math.floor(ref_video.current?.duration))
        );
        progress__trackupdate.current!.style.width = progressPercent + "%";
      }
    };

    const mouseOver = ref_video.current!.onmouseover = function () {
      if (ref_video.current?.duration) {
        setTime(
          (Math.floor(ref_video.current?.currentTime).toString().length >= 2 ? "00:" + Math.floor(ref_video.current?.currentTime) : "00:0" + Math.floor(ref_video.current?.currentTime)) +
          "/" +
          (Math.floor(ref_video.current?.duration).toString().length >= 2 ? "00:" + Math.floor(ref_video.current?.duration) : "00:0" + Math.floor(ref_video.current?.duration))
        );
      }
    };

    const ended = ref_video.current!.onended = function () {
      progress__trackupdate.current!.style.width = 0 + "%";
      setPlay(false);
    };

    return () => {
      ref_video.current?.removeEventListener('timeupdate', timeUpdate)
      ref_video.current?.removeEventListener('mouseover', mouseOver)
      ref_video.current?.removeEventListener('ended', ended)
    }
  }, [time, play])

  useEffect(() => {
    const inPut = progress.current!.oninput = function (e) {
      progress__trackupdate.current!.style.width = (e.target as HTMLInputElement).value + "%";
      const seekTime = (Number((e.target as HTMLInputElement).value) * ref_video.current!.duration) / 100;
      ref_video.current!.currentTime = seekTime;
    };

    const mouseDown = progress.current!.onmousedown = function () {
      ref_video.current?.pause();
    };

    const mouseUp = progress.current!.onmouseup = function () {
      if (isVisibile_video) {
        ref_video.current?.play();
      }
    };

    return () => {
      progress.current?.removeEventListener('input', inPut)
      progress.current?.removeEventListener('mousedown', mouseDown)
      progress.current?.removeEventListener('mouseup', mouseUp)
    }
  }, [progress__trackupdate.current?.style.width])

  useEffect(() => {
    const inPut = progres.current!.oninput = function (e) {
      progress__trackupdat.current!.style.height = (e.target as HTMLInputElement).value + "%";
      let volume = Number((e.target as HTMLInputElement).value) / 100;
      ref_video.current!.volume = volume;
      if (volume < 0.01) {
        dispath(setButtonSound(true));
      } else {
        dispath(setButtonSound(false));
      }
    };

    const Click = refSound.current!.onclick = function () {
      dispath(setButtonSound(!sound));
      if (sound) {
        document.querySelectorAll(`[class='${ref_video.current?.className}']`).forEach(item => {
          (item as HTMLVideoElement).muted = false;
        })
        document.querySelectorAll(`[class='${progress__trackupdat.current?.className}']`).forEach(item => {
          (item as HTMLDivElement).style.height = "100%";
        })
      } else {
        document.querySelectorAll(`[class='${ref_video.current?.className}']`).forEach(item => {
          (item as HTMLVideoElement).muted = true;
        })
        document.querySelectorAll(`[class='${progress__trackupdat.current?.className}']`).forEach(item => {
          (item as HTMLDivElement).style.height = "0%";
        })
      }
    };

    return () => {
      progres.current?.removeEventListener('input', inPut)
      refSound.current?.removeEventListener('click', Click)
    }
  }, [sound]);

  return (
    <div className={cx("wrapper")}>
      {/* <Tippys setFollow={setFollow} data={data}>
        <Link className={cx("link-btn")} to={data.link_profile}>
          <div className={cx("link-btn_div")}>
            <span className={cx("link-btn_span")}>
              <img style={{ width: 100 + "%", height: 100 + "%", objectFit: "cover" }} lazy1-src={data.avatar} alt={'avatar'} ref={ref_avatar} />
            </span>
          </div>
        </Link>
      </Tippys> */}

      {/* LIVESTREAM */}
      <Tippys setFollow={setFollow} data={data}>
        <Link className={cx("link-btn")} to={data.link_profile}>
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
      </Tippys>

      {/* content-title */}
      <div className={cx("div-btn-content")}>
        <div className={cx("div-btn_item")}>
          <div className={cx("div-btn_item-div")}>
            <div style={{ display: "block" }}>
              <h3 className={cx("title")}>
                <a href={data.link_profile}>{data.username}</a>
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
              );
            } else {
              return (
                <Button follow onClick={() => handleFollow(true)}>
                  Follow
                </Button>
              );
            }
          })()}
          <div style={{ fontSize: 16, lineHeight: 22 + "px", wordBreak: "break-word", width: 510 + "px", }}>
            <span className={cx('font-popers')}>{data.title}</span>
            {data.name_tag
              && data.name_tag.map((item: any) => (
                <a className={cx("tag")} href={item.link_tag} target="_blank" rel="noreferrer" key={uuidv4()}>
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
            <img lazys-src={data.image} alt="video" ref={ref_img} />
            <div className={cx("div_first-item")}>
              <div className={cx("div-1")}>
                <div className={cx("div-1_item")}>
                  <video loop muted={true} className={cx("display")} ref={ref_video} lazy-src={data.link_video} />
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
  );
}

export default ItemVideo;
