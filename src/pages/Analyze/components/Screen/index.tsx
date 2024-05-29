import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Form, InputNumber, Select, Space, Table, message } from 'antd';
import { useEffect, useState } from 'react';
import { request } from 'umi';

const Screen = () => {
  const {
    initialState: { currentUser }
  } = useModel('@@initialState');
  const [factor, setFactor] = useState([]);
  const [mode, setMode] = useState([]);
  const [facotrLi, setFactorLi] = useState('');
  const [modeLi, setModeLi] = useState('');
  const [inputValue, setInputValue] = useState(0.01);
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  // const commonHeader = {
  //     user: currentUser.username,
  //     req_id: currentUser.id,
  //     req_src: currentUser.avatarUrl,
  //     token: currentUser.token
  // }
  const getFactor = () => {
    request('/quent-api/factor', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      setFactorLi(res.result.factor[0]);
      setModeLi(res.result.mode[0]);

      let modeDataLabel = Object.keys(res.result.mode[0]) 
      let modeDataValue = Object.values(res.result.mode[0])
      const modeData:any = modeDataLabel.map((item,index)=>{
        return{
          label:item,
          value:modeDataValue[index]
        }
      })
      setFactor(res.result.factor);
      setMode(modeData);
    });
  };

  const postFetch = (option:any) => {
    const data = {
      factor: facotrLi,
      mode: modeLi,
      val: inputValue
    };
    request('quent-api/fetch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        data: option
      }
    }).then(res => {
      message.success(res.msg);
      const resData = res.result;
      const arr: any = [];
      const title = Object.keys(resData);
      const firstTitle = title[0];
      const row = Object.keys(resData[firstTitle].TIME);
      const columnsone = title.map(item => {
        arr.push(Object.values(resData[item].result));
        return {
          title: item,
          dataIndex: item,
          key: item,
          sorter: {
            compare: (a:any, b:any) => {
              console.log(a[item],b[item],'数据展示');
              
              return  a[item] - b[item]
            },            
          },
        };
      });
      const firstName = {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width:'5%'
      };

      const tableData = row.map((name, i) => {
        const rowData = { name };
        title.forEach((column, j) => {
          rowData[column] = arr[j][i].toFixed(4);
        });
        return rowData;
      });
      setColumns([firstName, ...columnsone]);
      setDataSource(tableData);
    });
  };
  useEffect(() => {
    getFactor();
  }, []);

  function handleQuery(values: any) {
    console.log();
    if (values.data.length == 0) {
      message.warning('请添加查询条件');
    }else{
      console.log(values);
      postFetch(values.data)
    }
  }

  return (
    <div>
      <Form name="筛选列表" onFinish={handleQuery} autoComplete="off">
        <Form.List name="data">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: 'flex',
                    marginBottom: -5
                  }}
                  align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, 'factor']}
                    rules={[
                      {
                        required: true,
                        message: '请选择条件'
                      }
                    ]}>
                    <Select
                      defaultValue="请选择条件"
                      style={{ width: 240 }}
                      options={factor}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'mode']}
                    rules={[
                      {
                        required: true,
                        message: '请选择条件'
                      }
                    ]}>
                    <Select
                      defaultValue="请选择条件"
                      style={{ width: 240 }}
                      options={mode}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'val']}
                    rules={[
                      {
                        required: true,
                        message: '请选择数值'
                      }
                    ]}>
                    <InputNumber
                      style={{
                        width: 100
                      }}
                      min="0"
                      max="10"
                      step="0.01"
                      stringMode
                    />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}

              <Form.Item>
                <Space>
                  <Button
                    style={{ width: 130 }}
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}>
                    新增条件
                  </Button>
                  <Button type="primary" htmlType="submit">
                    查询
                  </Button>
                </Space>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
      <ProCard bordered style={{overflow:'auto'}}>
        <Table dataSource={dataSource} columns={columns}  />
      </ProCard>
    </div>
  );
};
export default Screen;
