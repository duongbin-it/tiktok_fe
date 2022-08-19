import classNames from "classnames/bind"
import React, { Fragment, memo, useEffect, useState } from "react"
import { CheckIcon } from "../../../../assets/icons/icons"
import Button from "../../../../components/Button/Button"
import { Following, handleShowLogin } from "../../../../components/GlobalFunc/GlobalFunc"
import styles from './DetailsProfile.module.scss'

const cx = classNames.bind(styles)
const CurrentUser = localStorage.getItem("user");

interface Props {
    datadetails: any,
    setFollow: any,
}

const DetailsProfile: React.FC<Props> = ({ datadetails, setFollow }) => {
    const [follow, setFollow1] = useState<any>(datadetails?.following);

    useEffect(() => { setFollow1(datadetails?.following) }, [datadetails?.following])

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
                <a href={datadetails.link}>
                    <span className={cx("image_avatar")}>
                        <img src={datadetails.avatar} alt="avatar" />
                    </span>
                </a>
                {(() => {
                    if (follow && CurrentUser) {
                        return (
                            <Button following onClick={() => handleFollow(false)}>
                                Following
                            </Button>
                        );
                    } else {
                        return (
                            <Button follow_profile onClick={() => handleFollow(true)}>
                                Follow
                            </Button>
                        );
                    }
                })()}
            </div>
            <h3 className={cx('title')}>
                <a href={datadetails.link}>{datadetails?.username ? datadetails.username : "________"}</a>
                {datadetails?.blue_check ? <CheckIcon marginLeft={4} marginRight={2} /> : null}
            </h3>
            <br />
            <h4 className={cx('name')}>{datadetails.name}</h4>
            <div style={{ marginTop: 8, display: "flex", justifyContent: 'space-around' }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ fontSize: 17, fontWeight: 500 }}>{datadetails?.count_followers ? datadetails.count_followers : "________"}</span>
                    <span style={{ paddingLeft: 6, fontWeight: 100, fontSize: 17 }}>Followers</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ fontSize: 17, fontWeight: 500 }}>{datadetails?.count_likes ? datadetails.count_likes : "________"}</span>
                    <span style={{ paddingLeft: 6, fontWeight: 100, fontSize: 17 }}>Likes</span>
                </div>
            </div>
            <>
                {datadetails?.bio ? <p className={cx("footers")}>{datadetails?.bio}</p> : Fragment}
            </>
        </div>
    )
}

export default memo(DetailsProfile)