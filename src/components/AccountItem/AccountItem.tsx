import classNames from 'classnames/bind';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles)

interface Props {
    data: any,
    onClick: any,
}

const AccountItem: React.FC<Props> = ({ data, onClick }) => {
    return (
        <Link to={`/@${data['nickname']}`} className={cx('wrapper')} onClick={onClick}>
            <img className={cx('avatar')} src={data['avatar']} alt={data['full_name']} />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data['full_name']}</span>
                    {data['tick']}
                </h4>
                <span className={cx('username')}>{data.nickname}</span>
            </div>
        </Link>
    )
}

export default AccountItem;