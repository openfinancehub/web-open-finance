import { PageContainer } from '@ant-design/pro-components';
import MyEditor from './components/MyEditor';

const InfoPage: React.FC = () => {
  return (
    <PageContainer ghost>
      <MyEditor />
    </PageContainer>
  );
};

export default InfoPage;
