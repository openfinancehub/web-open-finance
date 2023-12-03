import React, { useEffect, useState } from 'react';
import { ProList } from '@ant-design/pro-components';
import { HeartTwoTone, CloudDownloadOutlined, CloudTwoTone, FileTextTwoTone } from '@ant-design/icons';
import { history } from 'umi';
import { ModelsItem, } from '../../data';
import './style.less';
import ModelsItems from '../ModelsItems/ModelsItems';
// import Modal from 'react-modal';


//models结展示
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
function Models({ data, company, setCompany }) {
  const [filteredModels, setFilteredModels] = useState(data);
  const [modelValue, setModelValue] = useState('');
  const [factorValue, setFactorValue] = useState('');
  const [showModal, setShowModal] = useState(false);

  //跳转models详情
  const onRow = (record: any) => {
    return {
      onClick: () => {
        showModalChange();
        setFactorValue(record.tag)
        setModelValue(record.model)
        console.log(record);
      },
    };
  };
  const showModalChange = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };
  const fetchData = async () => {
    setFilteredModels(data);
  };
  useEffect(() => {
    fetchData();
  }, [data]);
  return (
    <div>
      <div>
        <ProList<ModelsItem>
          onRow={onRow}
          rowKey='name'
          dataSource={filteredModels}
          pagination={{
            pageSize: 10,
          }}
          showActions='hover'
          metas={{
            title: {
              dataIndex: 'model',
              title: '模型名称',
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
      </div>
      {showModal && <div className='my-modal'>
        <ModelsItems
          modelValue={modelValue}
          factorValue={factorValue}
          setModelValue={setModelValue}
          setFactorValue={setFactorValue}
          showModal={showModal}
          setShowModal={setShowModal}
          company={company}
          setCompany={setCompany} />
      </div>}
    </div>
  );
}

export default Models;
