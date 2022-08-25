import classNameNames from "classnames/bind";
import React from "react";
import styles from "./Loading.module.scss";

const cx = classNameNames.bind(styles);

const VideoLoading: React.FC = () => {
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

const FollowingLoading: React.FC = () => {
  return (
    <div className={cx("tiktok-zxrg48-DivUserSkeletonContainerV2")}>
      <div style={{ width: '32px', height: '32px' }} className={cx("tiktok-1jfrc7x-DivBaseComponent-StyledAvatar")} />
      <div className={cx("tiktok-ed9j42-DivSkeletonTitleGroup")}>
        <div style={{ width: '107px', height: '12px' }} className={cx("tiktok-1xxodjj-DivBaseComponent-StyledTitle")} />
        <div style={{ width: '66px', height: '12px' }} className={cx("tiktok-1xxodjj-DivBaseComponent-StyledTitle")} />
      </div>
    </div>
  )
}

const DiscoverLoading: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className={cx("tiktok-1q0ta1o-DivDiscoverSkeletonItem")}>
        <div className={cx("tiktok-qm75kp-DivLinearGradient")} /></div>
      <div className={cx("tiktok-1q0ta1o-DivDiscoverSkeletonItem")}>
        <div className={cx("tiktok-qm75kp-DivLinearGradient")} /></div>
    </div>
  )
}

export { FollowingLoading, VideoLoading, DiscoverLoading };
