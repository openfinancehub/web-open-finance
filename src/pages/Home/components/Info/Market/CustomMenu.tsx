import React from 'react';
import { Menu, MenuProps } from 'antd';
import styles from './style.less'

interface MenuItem {
    key: string;
    label: string;
    type?: string;
    children?: MenuItem[];
}

interface CustomMenuProps {
    navList: MenuItem[];
    scrollToElement: (key: string) => void;
}

const CustomMenu: React.FC<CustomMenuProps> = ({ navList, scrollToElement }) => {
    return (
        <Menu
            className={styles.fixedMenu}
            onClick={({ key }) => {
                scrollToElement(key);
            }}
            mode="inline"
            items={navList}
        />
    );
};

export default CustomMenu;