import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setApi } from '../../../../../redux/actions'
import styles from './DivUserItem.module.scss'

const cx = classNames.bind(styles)

interface Props {
    link: string,
    icon: any,
    icon1: any,
    content: string,
}

const DivUserItem: React.FC<Props> = ({ link, icon, icon1, content }) => {

    const dispath = useDispatch()
    const [act, setAct] = useState(false)

    const Active = ({ isActive }: any) => {
        useEffect(() => {
            setAct(isActive)
        }, [isActive])

        return {
            color: isActive ? "rgba(254, 44, 85, 1)" : "",
        }
    }

    return (
        <NavLink style={Active} to={link} className={cx('wrapper')} onClick={() => { dispath(setApi([])) }}>
            <div className={cx('link')} >
                {act ? icon1 : icon}
                <h2 className={cx('content')}>
                    {content}
                </h2>
            </div>
        </NavLink >
    )
}

export default DivUserItem