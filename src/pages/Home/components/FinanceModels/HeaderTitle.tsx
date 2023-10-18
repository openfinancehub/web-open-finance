import React, { useEffect, useState } from 'react';
import { ProList } from '@ant-design/pro-components';
import { Link } from 'react-router-dom';
import { Button, Modal, Form, Input } from 'antd';
import { ModelsItem, } from '../../data';
import styles from './style.less';
import MyEditor from './MyEditor';

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
  const [isFormVisible, setIsFormVisible] = useState(false);
  const handleButtonClick = () => {
    setIsFormVisible(true);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <div className={styles.inpStyle}>
        <h3 className={styles.fountStyle}>Tools</h3>
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
        <Button key='sort1' type='primary' >
          <Link to="/home/model/item">新增</Link>
        </Button>
        {/* <Button key='sort1' type='primary' onClick={handleButtonClick}>
          新增
        </Button>
        {isFormVisible ? <MyEditor /> : ''} */}
      </div>
    </div>
  );
};

export default HeaderTitle;
