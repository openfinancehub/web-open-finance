import { PageContainer } from '@ant-design/pro-components';
import { Access, useAccess } from '@umijs/max';
import { Button } from 'antd';

const ContentPage: React.FC = () => {
  const access = useAccess();
  return (
    <PageContainer
      ghost
     
    >
      我是发布内容
    </PageContainer>
  );
};

export default ContentPage;
