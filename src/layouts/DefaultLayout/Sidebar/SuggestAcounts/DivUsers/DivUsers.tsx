import classNames from 'classnames/bind';
import React from 'react';
import { Link } from 'react-router-dom';
import { LiveStreamIcon } from '../../../../../assets/icons/icons';
import Tippys from '../../../../../components/Tippys/Tippys';
import styles from './DivUsers.module.scss';


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

function DivUsers({ index, name, username, icon, image, live, data, title }: any) {
    return (
        title !== "Following accounts"
            ? (<Tippys data={data} unoffset>
                <div className={cx('wrapper', index > 4 ? 'hidden' : null)} >
                    <Link to={`/@${username}`}>
                        <div className={cx('img-block')}>
                            {live ? handleIconLive(image) : unhandleIconLive(image)}
                        </div>
                    </Link>
                    <Link className={cx('link-btn')} to={`/@${username}`}>
                        <div className={cx('img-block-label')}>
                            <h4 className={cx('img-block-title')}>{username}</h4>
                            <div style={{ marginLeft: 4, display: 'flex' }}>{icon}</div>
                        </div>
                        <p className={cx('img-block-label-name')}>{name}</p>
                    </Link>
                </div>
            </Tippys>)
            : (
                <div className={cx('wrapper', index > 4 ? 'hidden' : null)} >
                    <Link to={`/@${username}`}>
                        <div className={cx('img-block')}>
                            {live ? handleIconLive(image) : unhandleIconLive(image)}
                        </div>
                    </Link>
                    <Link className={cx('link-btn')} to={`/@${username}`}>
                        <div className={cx('img-block-label')}>
                            <h4 className={cx('img-block-title')}>{username}</h4>
                            <div style={{ marginLeft: 4, display: 'flex' }}>{icon}</div>
                        </div>
                        <p className={cx('img-block-label-name')}>{name}</p>
                    </Link>
                </div>
            )
    );
}

export default DivUsers