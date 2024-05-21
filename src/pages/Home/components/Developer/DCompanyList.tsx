import React, { useEffect, useState } from 'react';
import { Button, Card, Input, Popover, Radio } from 'antd';
import { Tabs, message as Message } from 'antd';
import { CompanyList } from '@/pages/Finchat/components';

import { FinchatServices } from '@/services';
import { history, useModel } from '@umijs/max';
import _ from 'lodash';

const { Search } = Input;


const DCompanyList: React.FC<{
  companyChange: (company: string) => void;
}> = ({ companyChange }) => {
  //获取请求中的model数据
  const [stockList, setStockList] = useState<any[]>([]);

  const [initCompanyList, setInitCompanyList] = useState<any[]>([]);
  const {
    initialState: { currentUser }
  } = useModel('@@initialState');
  // const commonHeader = {
  //   user: currentUser.username,
  //   req_id: currentUser.id,
  //   req_src: currentUser.avatarUrl,
  //   token: currentUser.token
  // };
  const commonHeader = {
    user: "124",
    req_id: "124",
    req_src: "124",
    token: "124"
  };
  const handleCompany = (list: any[]) => {
    if (list.length === 0) {
      return;  // 如果列表为空，直接返回  
    } else {
      list.splice(0, list.length - 1);
    }
    if (list[0] && list[0].company) {
      companyChange(list[0].company)
    }
  };

  const fetchSidebar = async () => {
    try {
      const res = await FinchatServices.fetchSidebar({
        header: commonHeader
      });
      const {
        stock_list = []
      } = res.output || {};
      setInitCompanyList(stock_list);
      setStockList(stock_list);
    } catch (error) {
      console.log(error, 'error');
    }
  };
  const onSearch = async (value: string) => {
    try {
      if (!value) {
        setStockList(initCompanyList);
        return;
      }
      const res = await FinchatServices.queryCompany({
        header: commonHeader,
        data: { query: value }
      });
      const list = res.output?.result || [];
      setStockList(list);
    } catch (error: any) {
      Message.error(error?.msg);
    }
  };

  const onChange = _.debounce((e: any) => {
    const str = e.target.value;
    if (!str) {
      setStockList(initCompanyList);
      return;
    }
    const list = stockList.filter(i => i.company.indexOf(str) !== -1);
    setStockList(list);
  }, 1000);


  useEffect(() => {
    fetchSidebar()
  }, []);

  return (
    <div style={{ height: 'calc(100vh - 140px)', width: '120%', marginLeft: '15px' }}>
      <Search
        placeholder="Search Companies"
        allowClear
        onSearch={onSearch}
        onChange={onChange}
        style={{ width: '80%', margin: '0 0 12px 0' }}
      />
      <CompanyList list={stockList} handleProps={handleCompany} />
    </div>
  );
};

export default DCompanyList;
