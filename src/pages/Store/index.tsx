import { Card, Col, Row } from 'antd';
import {
    ProCard,
    ProForm,
    ProFormText
} from '@ant-design/pro-components';

import { history, useModel } from '@umijs/max';
import React, {useEffect, useState } from 'react';

import AgentCard from './component/card';
import { AgentServices } from '@/services';

const Store: React.FC = () => {

  const {
    initialState: { currentUser }
  } = useModel('@@initialState');

  const [agentList, setAgentList] = useState<any[]>([]);

  const fetchAgent = async () => {
    try {
      const res = await AgentServices.fetchAgent({
        header: {
            user: currentUser.username,
            req_id: currentUser.id,
            req_src: currentUser.avatarUrl,
            token: currentUser.token
      }});

      const { output } = res;
      if (output?.result?.length) {
        const tempList = output.result;
        const agentlist: any[] = []
        tempList.forEach((v: any) => {
          console.log(JSON.parse(v));
          const item = JSON.parse(v);          
          agentList.push(
            {url: 'https://randomuser.me/api/portraits/men/41.jpg',
             desc: item.desc, 
             title:item.title
            })
        setAgentList(agentlist);  
        });
      }
      console.log(res, 'res');
    } catch (error) {
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    fetchAgent();
  }, []);

  const agents = [
    {url: "https://randomuser.me/api/portraits/men/41.jpg", desc: "Buffett", title: "Buffett"},
    {url: "https://randomuser.me/api/portraits/men/41.jpg", desc: "Musk", title: "Musk"},
    {url: "https://randomuser.me/api/portraits/men/41.jpg", desc: "Wood", title: "Wood"},
    {url: "https://randomuser.me/api/portraits/men/41.jpg", desc: "Dalio", title: "Dalio"},
    {url: "https://randomuser.me/api/portraits/men/41.jpg", desc: "Dalio", title: "Dalio"},               
  ]

  const agentlist = agents.map(
    (agent) => 
    <AgentCard url={agent.url} desc={agent.desc} title={agent.title}/>
  );

  return (
    <>
      <ProCard split="vertical" style={{height: 1200}} bordered>
        <ProCard title="Create Agent" colSpan="25%" >
            <ProForm>
                <ProFormText width="md" name="company" label="Agent名称" placeholder="请输入名称" />    
                <ProFormText width="md" name="prompt" label="Prompt" placeholder="请输入代理说明" /> 
                <ProFormText width="md" name="input" label="输入格式" placeholder="json格式" /> 
                <ProFormText width="md" name="output" label="输出格式" placeholder="json格式" />       
            </ProForm>
        </ProCard>
        <ProCard 
            title="常用的Agents" 
            direction="column"
            bordered = {false}
            layout="center"
        >
            <Row gutter={108}>
                {agentlist}                                                                
            </Row>
        </ProCard>
      </ProCard>
    </>
  );
};

export default Store;