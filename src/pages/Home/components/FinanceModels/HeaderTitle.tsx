import React, { useEffect, useState } from 'react';
import { ProList } from '@ant-design/pro-components';
import { Link } from 'react-router-dom';
import { Button, Image, Form, Input, Space, Spin } from 'antd';
import { ModelsItem, } from '../../data';
import styles from './style.less';
const HeaderTitle: React.FC<{
  models: ModelsItem[];
  onModelsChange: (data: ModelsItem[]) => void;
  originalData: ModelsItem[];
  isActivePage: boolean
  setActivePage: React.Dispatch<React.SetStateAction<boolean>>;
  isDeveloper: boolean
  setIsDeveloper: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ models, onModelsChange, originalData, isActivePage, setActivePage, isDeveloper, setIsDeveloper }) => {
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
  // const [isDeveloper, setIsDeveloper] = useState(true);
  const ChangeUser = () => {
    setTimeout(() => {
      setIsDeveloper(!isDeveloper);
      // setLoading(false);  
    }, 500);
    // setIsDeveloper(!isDeveloper);
    console.log("是否开发者模式", isActivePage)
  };


  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {/* <Space size="middle">
        <Spin size="large" />
      </Space> */}
      <div className={styles.inpStyle}>
        <h3 className={styles.fountStyle}>Tools</h3>
      </div>
      <div>
        <Input onChange={(e) => changeModels(e.target.value)} placeholder='Filter by name' />
      </div>
      <div className={styles.but1Style}>
        <Button key='sort1' onClick={() => ChangeStyle()} type='primary'>
          切换展示
        </Button>
      </div>
      <div className={styles.but1Style}>
        <Button key='sort1' onClick={() => ChangeUser()} type='primary'>
          {isDeveloper ? '我要开发' : '随便看看'}
        </Button>
      </div>
      <div className={styles.but2Style}>
        <Button key='sort1' type='primary' >
          <Link to="/home/model/item">新增</Link>
        </Button>
      </div>
    </div>
  );
};

export default HeaderTitle;
