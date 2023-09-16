
import { PageContainer, ProCard } from '@ant-design/pro-components';
import FinanceItem from './components/FinanceItem'

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
              path: '',
              breadcrumbName: 'Open Finance',
            },
            {
              path: '',
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