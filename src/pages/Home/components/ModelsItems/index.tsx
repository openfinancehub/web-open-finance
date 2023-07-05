import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Button, Dropdown, Input } from 'antd';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import FinanceItem from './components/FinanceItem'
// import FirstLeftItem from './components/FirstLeftItem'

interface BreadcrumbProps {
  routes?: Route[];
  params?: any;
  separator?: React.ReactNode;
  itemRender?: (route: Route, params: any, routes: Array<any>, paths: Array<any>) => React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export default () => (
  <div
    style={{
      background: '#F5F7FA',
      paddingBlock: 30,
    }}
  >
    <PageContainer
      header={{
        title: '',
        ghost: true,
        breadcrumb: {
          routes: [
            {
              path: 'home',
              breadcrumbName: 'Open Finance'
            },
            {
              path: 'some/path1',
              breadcrumbName: 'Model'
            },
          ],
        },
      }}
      tabBarExtraContent=""
      tabList={[
        {
          tab: 'Text-to-Image',
          key: 'base',
          closable: false,
        },
        {
          tab: 'Diffusers',
          key: 'info1',
        },
        {
          tab: 'stable-diffusion',
          key: 'info2',
        },
        {
          tab: 'arxiv:2307.01952',
          key: 'info3',
        },
        {
          tab: 'arxiv:230952',
          key: 'info4',
        },
        {
          tab: 'other',
          key: 'info5',
        },
      ]}
      tabProps={{
        type: 'editable-card',
        hideAdd: true,
        onEdit: (e, action) => console.log(e, action),
      }}
    >
      <ProCard split="vertical">
        <ProCard title="" >
          <FinanceItem />
        </ProCard>
      </ProCard>
    </PageContainer>
  </div >
);