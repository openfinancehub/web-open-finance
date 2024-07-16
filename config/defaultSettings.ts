import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  // 拂晓蓝
  // primaryColor: '#1890ff',
  layout: 'mix',
  splitMenus: true,
  // logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',  
  logo: '～@/components/assets/images/openfinance_dark_log.png',
  menu: {
    locale: false
  },
};

export default Settings;
