import React, { useEffect, useState } from 'react';
import { ProList } from '@ant-design/pro-components';
import { HeartTwoTone, CloudDownloadOutlined, CloudTwoTone, FileTextTwoTone } from '@ant-design/icons';
import { history } from 'umi';
import { ModelsItem, header, dataString } from '../../data';
//跳转models详情
const onRow = (record: any) => {
  return {
    onClick: () => {
      console.log(record);
      history.push(`/home/model/item?id=${record.model}`);
    },
  };
};
//models结构沾水
const DescriptionMeta: React.FC<{ json: ModelsItem }> = ({ json }) => {
  return (
    <div key={json.tag}>
      <span>
        <FileTextTwoTone /> {json.tag}
      </span>
      <span>
        <CloudDownloadOutlined style={{ color: '#1890ff' }} /> {json.time}
      </span>
      <span>
        <CloudTwoTone /> {json.download}
      </span>
      <span>
        <HeartTwoTone /> {json.like}
      </span>
    </div>
  );
};
function Models({ data }: { data: ModelsItem[] }) {
  const [filteredModels, setFilteredModels] = useState(data);
  // const [originalData, setOriginalData] = useState(data);
  useEffect(() => {
    const fetchData = async () => {
      setFilteredModels(data);
      // setOriginalData(data);
    };
    fetchData();
  }, [data]);
  const handleModelsChange = (filteredModels: any) => {
    setFilteredModels(filteredModels);
  };
  return (
    <ProList<ModelsItem>
      onRow={onRow}
      // rowKey='name'
      dataSource={filteredModels}
      pagination={{
        pageSize: 10,
      }}
      showActions='hover'
      metas={{
        title: {
          dataIndex: 'model',
          title: '模块名称',
        },
        avatar: {
          dataIndex: 'icon',
          search: false,
        },
        description: {
          dataIndex: 'tag',
          search: false,
          render: (_, json) => <DescriptionMeta json={json} />,
        },
      }}
    />
  );
}

export default Models;
