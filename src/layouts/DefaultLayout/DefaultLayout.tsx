import classNames from "classnames/bind"
import React, { useRef } from "react"
import Header from "../components/Header/Header"
import styles from "./DefaultLayout.module.scss"
import Sidebar from "./Sidebar/Sidebar"

const cx = classNames.bind(styles)

interface Props {
  children: any,
}

const DefaultLayout: React.FC<Props> = ({ children }) => {

  const scrollHome = useRef<HTMLDivElement>(null)

  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>
        <Sidebar />
        <div className={cx("content")} ref={scrollHome}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
