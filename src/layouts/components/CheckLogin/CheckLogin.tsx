/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment, useState } from 'react';
import { Following, handleShowLogin } from '../../../components/GlobalFunc/GlobalFunc';


interface Props {
    CurrentUser?: string,
    buff: boolean,
    data: any,
}

const handleFollow: React.FC<Props> = ({ CurrentUser, buff, data }) => {
    const [follow, setFollow] = useState<boolean>(data.following);
    if (CurrentUser) {
        setFollow(!follow);
        Following(data, buff)
    } else {
        handleShowLogin();
    }

    return (
        <Fragment></Fragment>
    )
}

export default handleFollow
