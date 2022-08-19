import classNames from "classnames/bind";
import React, { Fragment } from "react";
import { CheckIcon } from "../../../../assets/icons/icons";
import styles from "./DivSelect.module.scss";
import DivUsers from "./DivUserSelect/DivUsers";

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
      {data?.data?.map((props: any, index: number) => {
        if (index < 10) {
          return (
            <DivUsers
              key={index}
              index={index}
              name={props.name}
              username={props.username}
              icon={props.blue_check ? <CheckIcon /> : Fragment}
              image={props.image}
              live={props.live}
            />
          )
        }
        else {
          return false
        }
      })}
      <div className={cx("see-more")} onClick={() => console.log(1)}>
        <p className={cx("see-more-btn")}>{atb}</p>
      </div>
    </div>
  );
}

export default DivSelect
