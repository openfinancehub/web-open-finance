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

  const fetchAgents = async () => {
    try {
      const res = await AgentServices.fetchAgent({
        header: {
            user: currentUser.username,
            req_id: currentUser.id,
            req_src: currentUser.avatarUrl,
            token: currentUser.token
      }});          
      if (res.output?.role_list?.length) {
        const tempList = res.output.role_list;
        const agentlist: any[] = []
        tempList.forEach((v: any) => {
          // console.log(v);   
          agentlist.push(
            {url: 'https://randomuser.me/api/portraits/men/41.jpg',
             desc: v.desc, 
             title: v.role
            })
        setAgentList(agentlist);  
        });
      }
      // console.log(agentList, 'agentList');
    } catch (error) {
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const agentlist = agentList.map(
    (agent) => 
    <AgentCard icon={agent.url} desc={agent.desc} role={agent.title}/>
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