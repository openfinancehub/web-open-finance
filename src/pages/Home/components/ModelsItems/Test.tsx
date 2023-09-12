
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import FinanceItem from './FinanceItem'
// import FirstLeftItem from './components/FirstLeftItem'

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
              breadcrumbName: 'Open Finance',
            },
            {
              path: 'some/path1',
              breadcrumbName: 'Model'
            },
          ],
        },
      }}
      tabBarExtraContent=""
      tabList={[]}
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