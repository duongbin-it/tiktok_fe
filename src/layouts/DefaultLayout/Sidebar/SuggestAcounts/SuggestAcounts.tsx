import classNames from "classnames/bind";
import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { CheckIcon } from "../../../../assets/icons/icons";
import DivUsers from "./DivUsers/DivUsers";
import styles from "./SuggestAcounts.module.scss";

const cx = classNames.bind(styles);

interface Props {
  title: string,
  atb: any,
  data?: any,
}

const SuggestAcounts: React.FC<Props> = ({ title, atb, data }) => {

  return (
    <div className={cx("wrapper")}>
      <p className={cx("title")}>{title}</p>
      {data?.data?.map((props: any, index: number) => {
        if (index < 10) {
          return (
            <DivUsers
              key={uuidv4()}
              index={index}
              name={props.name}
              username={props.username}
              icon={props.blue_check ? <CheckIcon /> : null}
              image={props.avatar}
              live={props.live}
              title={title}
            />
          )
        }
        else {
          return false
        }
      })}
      <div className={cx("see-more")}>
        <p className={cx("see-more-btn")}>{atb}</p>
      </div>
    </div>
  );
}

export default SuggestAcounts
