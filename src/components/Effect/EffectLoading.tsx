import React from "react"
import { CircleIcon } from "../../assets/icons/icons"

export const EffectLoading: React.FC = () => {
    return (
        <div style={{ position: 'fixed', left: 'calc(50% - 15px)', top: '38%', display: 'none' }} className={"svg-css"}>
            <CircleIcon />
        </div>
    )
}