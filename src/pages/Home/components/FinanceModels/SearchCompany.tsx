import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Image, Form, Input, Space, Spin, Select, Tag } from 'antd';
import type { SelectProps } from 'antd';
import { FinchatServices } from '@/services';
import debounce from 'lodash/debounce';

const commonHeader = {
  user: "124",
  req_id: "124",
  req_src: "124",
  token: "124"
};

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
}
// 远程搜索，防抖控制，请求时序控制，加载状态
function DebounceSelect<
  ValueType extends { key?: string; label: React.ReactNode; value: string | number } = any,
>({ fetchOptions, debounceTimeout = 800, ...props }: DebounceSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
}


const SearchCompany: React.FC = () => {
  const [initCompanyList, setInitCompanyList] = useState<any[]>([]);
  // const fetchSidebar = async () => {
  //   try {
  //     const res = await FinchatServices.fetchSidebar({
  //       header: commonHeader
  //     });
  //     const { stock_list = [] } = res.output || {};
  //     const companyList = stock_list.map((item: { company: string; icon: any; id: any; }) => ({
  //       value: item.company,
  //       label: item.company,
  //       id: item.company,
  //       icon: item.icon,
  //       color: 'gold'
  //     }));
  //     setInitCompanyList(companyList);
  //   } catch (error) {
  //     console.log(error, 'error');
  //   }
  //   console.log(initCompanyList, 'initCompanyList')
  // };
  // useEffect(() => {
  //   fetchSidebar()
  // }, []);

  async function fetchUserList(value: string): Promise<any[]> {
    // console.log('fetching company', value);

    return FinchatServices.queryCompany({
      header: commonHeader,
      data: { query: value }
    }).then(a => {
      console.log(a, 'a');
      return a
    }).then((res) =>
      res.output.result.map(
        (item: { company: string; icon: any; id: any; }) => ({
          label: `${item.company}`,
          value: item.company,
        }),
      ),
    );
  }

  const [value, setValue] = useState<any[]>([]);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <DebounceSelect
        mode="multiple"
        value={value}
        placeholder="Select Company"
        fetchOptions={fetchUserList}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default SearchCompany;