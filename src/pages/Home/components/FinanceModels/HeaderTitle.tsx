import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Image, Form, Input, Space, Spin } from 'antd';
import { ModelsItem, } from '../../data';
import styles from './style.less';
import { history } from 'umi';

const HeaderTitle: React.FC<{
  onModelsChange: (data: ModelsItem[]) => void;
  originalData: ModelsItem[];
  isActivePage: boolean
  setActivePage: React.Dispatch<React.SetStateAction<boolean>>;
  isDeveloper: boolean
  setIsDeveloper: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ onModelsChange, originalData, isActivePage, setActivePage, isDeveloper, setIsDeveloper }) => {
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
  const ChangeUser = () => {
    if (isDeveloper) {
      history.push('/home/developer');
    } else {
      history.push('/home');
    }

    console.log("是否开发者模式", isActivePage)
  };


  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <div className={styles.inpStyle}>
        <h3 className={styles.fountStyle}>Tools</h3>
      </div>
      <div>
        <Input onChange={(e) => changeModels(e.target.value)} placeholder='Filter by name' />
      </div>
      <div className={styles.but1Style}>
        {isDeveloper ? <Button key='sort1' onClick={() => ChangeStyle()} type='primary'>
          切换展示
        </Button> : null}
      </div>
      <div className={styles.but1Style}>
        <Button key='sort1' onClick={() => ChangeUser()} type='primary'>
          {isDeveloper ? '随便看看' : '我要开发'}
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
