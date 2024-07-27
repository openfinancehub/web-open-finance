import { ProCard } from '@ant-design/pro-components';
import { useState,useEffect } from 'react';
import { request } from 'umi';
import { FundOutlined } from '@ant-design/icons';
import {PageHeader,  Card,Modal } from 'antd';
const ModelAnaly = () => {
  const [cardList,setCardList] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getModelList = () => {
    request('http://129.204.166.171:5003/api/v1/model/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      setCardList(res);
    });
  };
  const handleOpen = ()=>{
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }
  useEffect(()=>{
    getModelList()
  },[])
  return (
    <div>
        <PageHeader title="模型" >
        </PageHeader>
        <div style={{ height: '14vh', overflow: "auto", paddingBottom:'0.5vh',paddingTop:'0.5vh'  }} >
        <div className="cardList"  >
        {cardList.map((item, index) => {
            return (
              <Card
                key={index} 
                hoverable
                style={{ width: '300px' }}
                onClick={handleOpen}>
                <FundOutlined /> <p>{item?.name}</p>
              </Card>
            );
          })}
          </div>
        </div>
        <Modal
          title="模型分析"
          open={isModalOpen}
          onOk={handleOk}
          width={1000}
          onCancel={handleOk}>

      </Modal>
    </div>

  );

};

export default ModelAnaly;
