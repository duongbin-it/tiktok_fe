import Tippy from '@tippyjs/react/headless';
import axios from 'axios';
import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';
import 'tippy.js/dist/tippy.css';
import { v4 as uuidv4 } from 'uuid';
import { ClearIcon, LoadingIcon, SearchIcon } from '../../../assets/icons/icons';
import AccountItem from '../../../components/AccountItem/AccountItem';
import styles from './Search.module.scss';




const cx = classNames.bind(styles)

const Search: React.FC = () => {

    const [searchValue, setSearchValue] = useState<string>('')
    const [searchResult, setsearchResult] = useState([])
    const [showResult, setShowResult] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const inputRef = useRef<HTMLInputElement>(null)




    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {

            setLoading(true)
            if (!searchValue.trim()) {
                setLoading(false)
                setsearchResult([])
                return;
            }

            axios.get(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(searchValue)}&type=less`)
                .then(res => {
                    setsearchResult(res['data']['data']);
                    setLoading(false)
                })
                .catch(() => {
                    setLoading(false)
                })
        }, 1000)
        return () => clearTimeout(delayDebounceFn)

    }, [searchValue])

    const handleHideResult = () => {
        setShowResult(false)
    }

    return (
        <Tippy
            onClickOutside={handleHideResult}
            appendTo={document['body']}
            interactive={true}
            visible={searchResult.length > 0 && showResult}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex={-1} {...attrs}>
                    <div className={cx('wrapper-1')}>
                        <h4 className={cx('search-title')}>Accounts</h4>
                        {searchResult.map((result) => (
                            <AccountItem key={uuidv4()} data={result} onClick={handleHideResult} />
                        ))}
                    </div>
                </div>
            )}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    placeholder='Search accounts and videos'
                    spellCheck={false} value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setShowResult(true)}
                />
                <span className={cx('seperate')}></span>
                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={() => {
                        setSearchValue('')
                        inputRef.current?.focus()
                        setsearchResult([])
                    }}>
                        <ClearIcon />
                    </button>
                )}

                {loading && <LoadingIcon className={cx('loading')} />}

                <button className={cx('search-btn')}>
                    <SearchIcon></SearchIcon>
                </button>
            </div>
        </Tippy>
    );
}

export default Search;