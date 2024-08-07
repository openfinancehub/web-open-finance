import { ProList } from '@ant-design/pro-components';
import { Button, Input, Tag } from 'antd';
import React, { useState, useEffect } from 'react';
import { LikeOutlined, StarOutlined } from '@ant-design/icons';
import { Description, ModelsItem, ListCategoryType, modelsData } from '../../data';
import { FactorService } from '../../service/';


const IconText = ({ text, icon }: { text: string, icon: React.ReactElement; }) => (
  <span>
    <span>{icon} {text}</span>
  </span>
);
let dataStr: modelsData = {
  ip: '127.0.0.1',
  factor: '',
  time: '',
  extra: 'extra',
};

const colors = ['red', 'blue', 'green', 'yellow', 'orange'];

const createData = (titles: string[], description: any[]): ListCategoryType => {
  if (titles.length !== description.length) {
    throw new Error('error');
  }
  return titles.map((title, index) => ({
    title,
    description: description[index] as Description[]
  }));
};

function CategoryItem({ onFilterFinance }: { onFilterFinance: (data: any) => void }) {
  const [categoryList, setCategoryList] = useState<ListCategoryType>([]);
  const [originalData, setOriginalData] = useState<ListCategoryType>([]);

  const [selectedFactor, setSelectedFactor] = useState('');
  //初始化因子结构数据
  const handleTriggerEvent = async (factor: string) => {
    const dataJson = await FactorService.getModels(factor);
    // console.log(dataJson)
    if (dataJson && dataJson.models != null && dataJson.ret_code == 0) {
      onFilterFinance(dataJson.models);
    }
  };
  const fetchCategoryJson = async () => {
    try {
      const response = await FactorService.categoryJson();
      // console.log(response.data.category)
      const titles = Object.keys(response.category);
      const descriptions = Object.values(response.category);
      const categories = createData(titles, descriptions);
      setCategoryList(categories);
      setOriginalData(categories);
    } catch (error) {
      console.error('fetch data failed', error);
    }
  };
  useEffect(() => {
    fetchCategoryJson();
    handleTriggerEvent('');
  }, []);
  //点击事件请求后端接口获取因子信息
  const filterFinance = (item: { factor: any; icon?: string; jump_url?: string; }, title: string) => {
    console.log(item.factor, title)
    if (title + item.factor === dataStr.factor) {
      item.factor = ''
    }
    dataStr.factor = title + item.factor;
    handleTriggerEvent(item.factor);

    //更新被选中的因子
    setSelectedFactor(title + item.factor);
  };
  //输入框过滤事件
  const changeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = originalData.map((item) => {
      const filteredDescription = item.description.filter(
        (category) => category.factor.toLocaleLowerCase().includes(event.target.value)
      );
      return {
        ...item,
        title: filteredDescription.length === 0 ? "" : item.title,
        description: filteredDescription,
      };
    });
    setCategoryList(filtered);
  };

  return (
    <div>
      <div>
        <Input onChange={changeCategory} placeholder='Filter Task By Name' />
      </div>
      <div>
        <ProList
          itemLayout="vertical"
          rowKey="id"
          dataSource={categoryList}
          metas={{
            title: {},
            description: {
              dataIndex: 'description',
              title: '',
              render: (_, item) => {
                const color = colors.find((_, index) => item.title === categoryList[index].title) || 'blue';
                return (
                  item.description.map(({ factor }, index) => (
                    <Tag key={item.title + factor} color={color} onClick={() => filterFinance({ factor }, item.title)}
                      style={selectedFactor === item.title + factor ? { backgroundColor: 'lightblue' } : {}}>
                      <IconText icon={<StarOutlined />} text={factor} key={item.title + factor} />
                    </Tag>
                  ))
                );
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default CategoryItem;
