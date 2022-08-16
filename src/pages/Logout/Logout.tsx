import React, { Fragment, useEffect } from "react";
import { CircleIcon, LogoLogoutIcon } from "../../assets/icons/icons";
import './Logout.css';

const Logout: React.FC = () => {

    useEffect(() => {
        setTimeout(() => {
            (document.querySelector("[class='css-feuqz5']") as HTMLDivElement).style.top = '16px';
            (document.querySelector("[class='svg-css']") as HTMLDivElement).style.display = 'block';
            setTimeout(() => {
                setTimeout(() => {
                    // eslint-disable-next-line no-restricted-globals
                    setTimeout(() => { localStorage.removeItem('user'); location.href = '/' }, 0);
                }, 1000)
            }, 2000)
        }, 0)
    }, [])

    return (
        <Fragment>
            <LogoLogoutIcon />
            <div><div className="css-feuqz5" style={{ transition: 'top 1s linear 0.4s', display: "flex", justifyContent: "center", fontFamily: 'ProximaNova, PingFangSC, sans-serif', fontWeight: 600, position: 'fixed', top: '-50px', left: '0px', color: 'rgb(255, 255, 255)', zIndex: 1002, width: '100%', pointerEvents: 'none', userSelect: 'none' }}><span><div className="css-feuqz4-notice" style={{ right: '50%', marginTop: '-8px' }}><div className="css-feuqz4-notice-content" style={{ backgroundColor: 'rgba(84, 84, 84, 0.92)', display: 'inline-block', padding: '10px 8px', pointerEvents: 'all', maxWidth: '100%', borderRadius: '2px' }}><div className="css-9aj0a0-DivMessageContainer e1wz89c90" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50vw', direction: 'ltr', minWidth: '300px' }}><span>Sign out successful, please wait a moment
            </span></div></div></div></span></div></div>
            <div style={{ position: 'fixed', left: 'calc(50% - 15px)', top: '38%', display: 'none' }} className={"svg-css"}>
                <CircleIcon />
            </div>
        </Fragment>
    )
}

export default Logout
