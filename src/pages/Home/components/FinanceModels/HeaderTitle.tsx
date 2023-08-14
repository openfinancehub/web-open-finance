import React, { useEffect, useState } from 'react';
import { ProList } from '@ant-design/pro-components';
import { Button, Input } from 'antd';
import { ModelsItem, header, dataString } from '../../data';
import styles from './style.less';

const HeaderTitle: React.FC<{
  models: ModelsItem[];
  onModelsChange: (data: ModelsItem[]) => void;
  originalData: ModelsItem[];
  isActivePage: boolean
  setActivePage: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ models, onModelsChange, originalData, isActivePage, setActivePage }) => {
  //筛选框过滤，将过滤后的数据交给FinanceModels展示
  const changeModels = (value: string) => {
    const filteredModels = originalData.filter((item) => {
      return item.model.toLowerCase().includes(value.toLowerCase());
    });
    onModelsChange(filteredModels);
  };
  //更改样式展示
  const ChangeStyle = () => {
    setActivePage(!isActivePage)
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <div className={styles.inpStyle}>
        <h3 className={styles.fountStyle}>Models</h3>
      </div>
      <div className={styles.inpStyle}>
        <h3 className={styles.figStyle}>{models.length}</h3>
      </div>
      <div>
        <Input onChange={(e) => changeModels(e.target.value)} placeholder='Filter by name' />
      </div>
      <div className={styles.but1Style}>
        <Button key='sort1' onClick={() => ChangeStyle()} type='primary'>
          切换展示
        </Button>
      </div>
      <div className={styles.but2Style}>
        <Button key='sort1' type='primary'>
          Full-text search
        </Button>
      </div>
    </div>
  );
};

export default HeaderTitle;
