import Tippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Header from './Header'
import styles from './Menu.module.scss'
import MenuItem from './MenuItem'

const cx = classNames.bind(styles)

const defaultFn = () => { }

interface Props {
    children: any,
    items: any,
    onChange?: any,
}

const Menu: React.FC<Props> = ({ children, items = [], onChange = defaultFn }) => {

    const [history, setHistory] = useState([{ data: items }])

    const current = history[history.length - 1]


    const renderItems = () => {
        return current.data.map((item: any) => {
            return (
                <MenuItem key={uuidv4()} data={item} onClick={() => {
                    if (!!item.children) {
                        setHistory(prev => [...prev, item.children])
                    }
                    else {
                        onChange(item)
                    }
                }} />
            )
        })
    }

    return (
        <Tippy
            interactive
            appendTo={document.body}
            offset={[12, 8]}
            placement='bottom-end'
            trigger="click"
            render={(attrs) => (
                <div className={cx('content')} tabIndex={-1} {...attrs}>
                    <div className={cx('wrapper-1')}>
                        {history.length > 1 && < Header title='Language' onBack={() => {
                            setHistory(prev => prev.slice(0, prev.length - 1))
                        }} />}
                        <div className={cx('menu-body')}>
                            {renderItems()}
                        </div>
                    </div>
                </div>
            )}
            onHide={() => setHistory(prev => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    )
}

export default Menu