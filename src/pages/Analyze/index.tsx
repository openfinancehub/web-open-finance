import { PageContainer } from '@ant-design/pro-components';
import { Tabs, TabsProps } from 'antd';
import Factor from './components/Factor'
import Strategy from './components/Strategy'
// import Subscribe from './components/Subscribe'
// import Demo from './components/Factor/demo'
import Screen from "./components/Screen";
const HomePage: React.FC = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `推荐因子`,
      children: <Factor></Factor>,
    },
    {
      key: '2',
      label: `策略生成器`,
      children: <Strategy></Strategy>,
    },
    {
      key: '3',
      label: `筛选列表`,
      children: <Screen></Screen>,
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
