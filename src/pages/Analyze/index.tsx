import { PageContainer } from '@ant-design/pro-components';
import { Tabs, TabsProps } from 'antd';
import Factor from './components/Factor'
import Strategy from './components/Strategy'
import Subscribe from './components/Subscribe'
import Demo from './components/Factor/demo'
const HomePage: React.FC = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `推荐因子`,
      children: <Demo></Demo>,
    },
    {
      key: '2',
      label: `策略生成器`,
      children: <Strategy></Strategy>,
    },
    {
      key: '3',
      label: `已订阅`,
      children: <Subscribe></Subscribe>,
    },
  ];
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <PageContainer
    
      ghost
      header={{
        title: '',
      }}
    >
      <Tabs defaultActiveKey="1" items={items} onChange={onChange}></Tabs>
    </PageContainer>
  );
};
export default HomePage;
