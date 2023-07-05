import { PageContainer } from '@ant-design/pro-components';
import { Access, useAccess } from '@umijs/max';
import { Button } from 'antd';

const InfoPage: React.FC = () => {
  const access = useAccess();
  return (
    <PageContainer
      ghost
     
    >
      我是个人信息
    </PageContainer>
  );
};

export default InfoPage;
