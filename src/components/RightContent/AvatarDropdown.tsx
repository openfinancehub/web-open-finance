import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import { stringify } from 'querystring';
import React, { useCallback } from 'react';
import { history, useModel } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
// import { outLogin } from '@/services/ant-design-pro/api';
import type { MenuInfo } from 'rc-menu/lib/interface';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  // await outLogin();
  const { query = {}, search, pathname } = history.location;
  const { redirect } = query;
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/login' && !redirect) {
    history.replace({
      pathname: '/login',
      search: stringify({
        redirect: pathname + search
      })
    });
  }
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({}) => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        setInitialState(s => ({ ...s, currentUser: undefined }));
        localStorage.removeItem('userInfo');
        loginOut();
        return;
      }
    },
    [setInitialState]
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.nickName) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {/* {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )} */}
      {/* {menu && <Menu.Divider />} */}

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span
        className={`${styles.action} ${styles.account}`}
        style={{ display: 'inline-block', marginRight: '50px' }}>
        <Avatar
          size="small"
          src={
            currentUser.avatarUrl ||
            'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
          }
          alt="avatar"
        />
        <span
          style={{ display: 'inline-block', marginLeft: '10px' }}
          className={`${styles.name} anticon`}>
          {currentUser.nickName}
        </span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
