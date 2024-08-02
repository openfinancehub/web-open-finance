import { ProCard } from '@ant-design/pro-components';
import { useState } from 'react';
import './style.less';
import PublicStrategy from './component/PublicStrategy';
const Strategy = () => {
  return (
    <ProCard gutter={16} ghost wrap>
      <ProCard
        gutter={[0, 16]}
        colSpan={{ xs: 24, sm: 24, md: 20, lg: 20, xl: 21 }}
        direction="column">
          111
          {/* <PublicStrategy ButtonId={buttonId}></PublicStrategy> */}
      </ProCard>
    </ProCard>
  );

};

export default Strategy;
