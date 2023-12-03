import { Collapse } from 'antd';
import { Button, Input, Tag } from 'antd';
import React, { useState, useEffect } from 'react';
import { StarOutlined } from '@ant-design/icons';
import { categoryJson, modelsJson } from '../../service';
import { ModelsItem, header, modelsData } from '../../data';
const { Panel } = Collapse;

type Description = {
  factor: string,
  icon: string,
  jump_url: string,
};

type ListCategoryType = {
  title: string,
  description: Description[],
}[];

let dataStr: modelsData = {
  ip: '127.0.0.1',
  factor: '',
  time: '',
  extra: 'extra',
};
let head: header = {
  req_id: '1234',
  req_src: 'source',
  user: 'user',
  token: 'token',
};

const IconText = ({ text, icon }: { text: string, icon: React.ReactElement; }) => (
  <span>
    <span>{icon} {text}</span>
  </span>
);

interface InternalProps {
  onFilterFinance: (item: any) => void;
}

const Test: React.FC<InternalProps> = ({ onFilterFinance }) => {

  const [categoryList, setCategoryList] = useState<ListCategoryType>([]);
  const [originalData, setOriginalData] = useState<ListCategoryType>([]);

  const createData = (titles: string[], description: any[]): ListCategoryType => {
    if (titles.length !== description.length) {
      throw new Error('error');
    }
    return titles.map((title, index) => ({
      title,
      description: description[index] as Description[]
    }));
  };
  const fetchCategoryJson = async () => {
    try {
      const response = await categoryJson();
      const titles = Object.keys(response.result.category);
      const descriptions = Object.values(response.result.category);
      const categories = createData(titles, descriptions);

      console.log(categories)

      setCategoryList(categories);
      setOriginalData(categories);
    } catch (error) {
      console.error('fetch data failed', error);
    }
  };

  const handleTriggerEvent = async () => {
    const dataJson = await modelsJson(head, dataStr);
    if (dataJson?.result?.models != null && dataJson.result.ret_code == 0) {
      onFilterFinance(dataJson?.result?.models);
    }
  };


  const filterFinance = (item: { factor: any; icon?: string; jump_url?: string; }) => {
    if (item.factor === dataStr.factor) {
      item.factor = ''
    }
    console.log(item.factor)
    dataStr.factor = item.factor;
    handleTriggerEvent();

    //更新被选中的因子
    // setSelectedFactor(item.factor);
  };

  const colors = ['red', 'blue', 'green', 'yellow', 'orange'];
  useEffect(() => {
    handleTriggerEvent();
    fetchCategoryJson();
  }, []);

  return (
    <Collapse accordion>
      {categoryList.map((item, index) => {
        const color = colors.find((_, index) => item.title === categoryList[index].title) || 'blue';
        return (
          <Panel header={item.title} key={item.title} >
            {item.description.map(({ factor }, index) => {
              return <Tag
                key={index}
                icon={<StarOutlined />}
                color={color}
                onClick={() => filterFinance({ factor })}
              > {factor} </Tag>
            })}
          </Panel>
        );
      })}
    </Collapse >
  )
};

export default Test;