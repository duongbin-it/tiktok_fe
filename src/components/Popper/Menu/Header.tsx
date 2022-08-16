import classNames from "classnames/bind";
import React from "react";
import { BackIcon } from "../../../assets/icons/icons";
import styles from './Menu.module.scss';

const cx = classNames.bind(styles)

interface Props {
    title: string,
    onBack: any,
}

const Header: React.FC<Props> = ({ title, onBack }) => {
    return (
        <header className={cx('header')}>
            <button className={cx('back-btn')} onClick={onBack}>
                <BackIcon />
            </button>
            <h4 className={cx('header-title')}>{title}</h4>
        </header>
    );
}

export default Header;