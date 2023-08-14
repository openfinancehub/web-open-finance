import React from 'react';
import { useModel } from 'umi';
import Avatar from './AvatarDropdown';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  return <Avatar />;
};

export default GlobalHeaderRight;
