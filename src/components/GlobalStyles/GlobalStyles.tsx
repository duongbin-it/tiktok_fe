import React from 'react';
import './GlobalStyles.module.scss'

interface Props {
    children: any,
}

const GlobalStyles: React.FC<Props> = ({ children }) => {
    return (children);
}

export default GlobalStyles;