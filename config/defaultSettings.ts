import { Settings as LayoutSettings } from '@ant-design/pro-layout';
// import RightContent from '@/components/RightContent';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  // 拂晓蓝
  // primaryColor: '#1890ff',
  layout: 'mix',
  splitMenus: true,
  logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',  
  menu: {
    locale: false
  },
  // rightContentRender: () => <RightContent />

};

export default Settings;
