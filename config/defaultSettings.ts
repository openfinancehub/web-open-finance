import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  // 拂晓蓝
  // primaryColor: '#1890ff',
  layout: 'mix',
  // splitMenus: true,
  logo: "@/pages/Store/assets/images/openfiance_dark_log.png"
};

export default Settings;
