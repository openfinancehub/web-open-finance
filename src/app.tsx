// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
import RightContent from '@/components/RightContent';
import { history } from 'umi';

export async function getInitialState() {
  if (history.location.pathname !== '/login') {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    if (userInfo?.id) {
      return {
        currentUser: userInfo,
        settings: {
          layout: 'mix',
          splitMenus: true
        }
      };
    } else {
      history.push('/login');
    }
  }
  return {
    settings: {
      layout: 'mix',
      splitMenus: true
    }
  };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false
    },
    layout: 'mix',
    splitMenus: true,
    rightContentRender: () => <RightContent />
  };
};