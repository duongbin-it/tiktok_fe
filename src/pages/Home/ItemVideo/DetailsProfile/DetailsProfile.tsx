import classNames from "classnames/bind"
import React, { Fragment, memo, useEffect, useState } from "react"
import { CheckIcon } from "../../../../assets/icons/icons"
import Button from "../../../../components/Button/Button"
import { Following, handleShowLogin } from "../../../../components/GlobalFunc/GlobalFunc"
import styles from './DetailsProfile.module.scss'

var numeral = require('numeral');
const cx = classNames.bind(styles)
const CurrentUser = localStorage.getItem("user");

interface Props {
    datadetails: any,
    setFollow: any,
    suggest?: any,
}

const DetailsProfile: React.FC<Props> = ({ datadetails, setFollow, suggest }: any) => {
    const [follow, setFollow1] = useState<any>(datadetails?.following);
    useEffect(() => {
        setFollow1(datadetails?.following)
    }, [datadetails?.following])

    function handleFollow(buff: any) {
        if (CurrentUser) {
            setFollow(!follow)
            setFollow1(!follow)
            Following(datadetails, buff)
        } else {
            handleShowLogin();
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <a href={`/@${datadetails.username}`}>
                    <span className={cx("image_avatar")}>
                        <img src={datadetails.avatar} alt="avatar" />
                    </span>
                </a>
                {
                    datadetails['username'] !== "Fail Data" ? (() => {
                        if (follow && CurrentUser) {
                            return (
                                <Button following_profile onClick={() => handleFollow(false)}>
                                    Following
                                </Button>
                            );
                        } else {
                            return (
                                suggest
                                    ? (<Button primary onClick={() => handleFollow(true)}>
                                        Follow
                                    </Button>)
                                    : (<Button follow_profile onClick={() => handleFollow(true)}>
                                        Follow
                                    </Button>)
                            );
                        }
                    })() : null
                }
            </div>
            <h3 className={cx('title')}>
                <a href={`/@${datadetails.username}`}>{datadetails?.username ? datadetails.username : "________"}</a>
                {datadetails?.blue_check ? <CheckIcon marginLeft={4} marginRight={2} /> : null}
            </h3>
            <br />
            <h4 className={cx('name')}>{datadetails.name}</h4>
            <div style={{ marginTop: 8, display: "flex", justifyContent: 'space-around' }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ fontSize: 17, fontWeight: 500 }}>
                        {numeral(datadetails?.count_followers).format('0.0a').toString().toUpperCase()}
                    </span>
                    <span style={{ paddingLeft: 6, fontWeight: 100, fontSize: 17 }}>Followers</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ fontSize: 17, fontWeight: 500 }}>
                        {numeral(datadetails?.count_likes).format('0.0a').toString().toUpperCase()}
                    </span>
                    <span style={{ paddingLeft: 6, fontWeight: 100, fontSize: 17 }}>Likes</span>
                </div>
            </div>
            <>
                {datadetails?.bio && !suggest ? <p className={cx("footers")}>{datadetails?.bio}</p> : null}
            </>
        </div>
    )
}

export default memo(DetailsProfile)