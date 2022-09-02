import React from "react"
import Header from "../components/Header/Header"

interface Props {
    children: any,
}

const HeaderOnly: React.FC<Props> = ({ children }) => {
    return (
        <div>
            <Header />
            <div className="container">
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default HeaderOnly