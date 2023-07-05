import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { ProCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';

const Home: React.FC = () => {
  const { name } = useModel('global');
  return (
    <>
      <ProCard split="vertical">
      <ProCard title="左侧详情" colSpan="30%">
        左侧内容
      </ProCard>
      <ProCard title="左右分栏子卡片带标题" headerBordered>
        <div style={{ height: 360 }}>右侧内容</div>
      </ProCard>
    </ProCard>
    </>
  );
};

export default Home;