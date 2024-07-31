import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { getStockList } from '../../api/assess';
export default function left({ onDataChange, onInval }) {
  const [sotckListData, setsotckList] = useState([]);
  const [selectedButton, setSelectedButton] = useState('');
  // 获取股票的初始值
  // 数据备份用于过滤
  const [filterData, setFilterList] = useState([]);
  const sotckList = () => {
    const data = {
      key: '8140ad230f687daede75a08855e8ae5ff40c3ba8'
    };
    getStockList(data).then(res => {
      const first = res.data[0].split(',')[0];
      const firstid = res.data[0].split(',')[1];
      setSelectedButton(firstid);
      onInval(firstid, first);
      const list = res.data.map(item => {
        return {
          value:item.split(',')[1],
          label:item.split(',')[0]
        }
      });
      setsotckList(list);
      setFilterList(list);
    });
  };
  const onChange = (value,options) => {
    console.log(`selected ${value}`,options.label);
    onDataChange(value,options.label);
  };
  
  const onSearch = (value) => {
    console.log('search:', value);
  };
  useEffect(() => {
    sotckList();
  }, []);
  return (
    <div>
        <Select
          showSearch
          placeholder="Select a stock"
          optionFilterProp="label"
          defaultValue={selectedButton}
          style={{width:200}}
          onChange={onChange}
          onSearch={onSearch}
          options={sotckListData}
        >

        </Select>
    </div>
  );
}
