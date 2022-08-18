import classNames from "classnames/bind";
import React, { Fragment } from "react";
import { CheckIcon } from "../../../../assets/icons/icons";
import styles from "./DivSelect.module.scss";
import DivUserSelect from "./DivUserSelect/DivUserSelect";

const cx = classNames.bind(styles);

interface Props {
  title: string,
  atb: any,
  data?: any,
}

const DivSelect: React.FC<Props> = ({ title, atb, data }) => {

  return (
    <div className={cx("wrapper")}>
      <p className={cx("title")}>{title}</p>
      {data?.data?.map((props: any, index: number) => (
        <DivUserSelect
          key={index}
          name={props.name}
          username={props.username}
          icon={props.blue_check ? <CheckIcon /> : Fragment}
          image={props.image}
          live={props.live} />
      ))}
      <div className={cx("see-more")}>
        <p className={cx("see-more-btn")}>{atb}</p>
      </div>
    </div>
  );
}

export default DivSelect
