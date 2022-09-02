import classNames from 'classnames/bind'
import React from 'react'
import { FollowingIcon, FollowingIconHide, HomeIconActive, HomeIconUnactive, LiveIcon, LiveIconHide } from '../../../../assets/icons/icons'
import styles from './DivUser.module.scss'
import DivUserItem from './DivUserItem/DivUserItem'

const cx = classNames.bind(styles)

const DivUser: React.FC = () => {
    return (
        <div className={cx('wrapper')}>
            <DivUserItem link={'/'} icon={<HomeIconUnactive />} icon1={<HomeIconActive />} content={'For You'} />
            <DivUserItem link={'/following'} icon={<FollowingIcon />} icon1={<FollowingIconHide />} content={'Following'} />
            <DivUserItem link={'/live'} icon={<LiveIcon />} icon1={<LiveIconHide />} content={'LIVE'} />
        </div >
    )
}

export default DivUser