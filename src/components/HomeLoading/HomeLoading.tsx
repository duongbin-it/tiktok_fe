import classNameNames from "classnames/bind";
import React from "react";
import styles from "./Loading.module.scss";

const cx = classNameNames.bind(styles);

const Loading: React.FC = () => {
  return (
    <div className={cx('tiktok-9lp6mc-DivOneColSkeletonContainer')}>
      <div className={cx('tiktok-uq4t48-DivOneColSkeletonAvatar')}>

      </div>
      <div className={cx('tiktok-9o5334-DivOneColSkeletonWrapper')}>
        <div className={cx('tiktok-1dlxk7v-DivOneColSkeletonContentContainer')}>
          <div>
            <div className={cx('tiktok-181yrtw-DivOneColSkeletonContent')}>
            </div>
            <div className={cx('tiktok-j05zcj-DivOneColSkeletonContent')}>
            </div>
          </div></div><div className={cx('tiktok-nfbgaz-DivOneColSkeletonContent')}>
        </div>
        <div className={cx('tiktok-nolr0o-DivOneColSkeletonContent')}>
        </div>
      </div>
    </div>
  );
}

export default Loading;
