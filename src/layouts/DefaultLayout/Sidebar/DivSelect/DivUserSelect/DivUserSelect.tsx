import classNames from 'classnames/bind';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { LiveStreamIcon } from '../../../../../assets/icons/icons';
import styles from './DivUserSelect.module.scss';


const cx = classNames.bind(styles)

const handleIconLive: React.FC = (image: any) => (
    <>
        <LiveStreamIcon />
        <span className={cx('img-block-btn')} style={{ width: 26, height: 26 }}>
            <img className={cx('img-avatar')} src={image} alt='avatar'></img>
        </span>
    </>
)

const unhandleIconLive = (image: any) => (
    <span className={cx('img-block-btn')} >
        <img className={cx('img-avatar')} src={image} alt='avatar'></img>
    </span>
)

function DivUserSelect({ name, username, link, icon, image, live }: any) {
    return (
        <>
            <div className={cx('wrapper')}>
                <Link to={link}>
                    <div className={cx('img-block')}>
                        {live ? handleIconLive(image) : unhandleIconLive(image)}
                    </div>
                </Link>
                <Link className={cx('link-btn')} to={link}>
                    <div className={cx('img-block-label')}>
                        <h4 className={cx('img-block-title')}>{name}</h4>
                        <div style={{ marginLeft: 4 }}>{icon}</div>
                    </div>
                    <p className={cx('img-block-label-name')}>{username}</p>
                </Link>
            </div>
        </>
    );
}

export default DivUserSelect;






{/* <Tippy
interactive
zIndex={1}
appendTo={document.body}
delay={[400, 700]}
offset={[130, 6]}
placement='bottom'
hideOnClick={false}
onShow={() => {
    ConnectApi("https://tiktok-nodejs1.herokuapp.com/api/users", "POST", { username: data.username }).then((req) => setDatadetails(req))
}}
render={(attrs) => (
    <div className={cx('search-result')} tabIndex={-1} {...attrs}>
        <DetailsProfile data={data} datadetails={datadetails?.data[0]} />
    </div>
)}>
<span className={cx('img-block-btn')} >
    <img className={cx('img-avatar')} src={image} alt='avatar'></img>
</span>
</Tippy> */}