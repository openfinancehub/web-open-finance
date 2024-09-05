import { getStrategyList, getStrategySeek,deleteStrategy } from "../api/other";
import { useState, useEffect } from "react";
import { ProCard } from '@ant-design/pro-components';
import { PageHeader, Card, Modal, Form, Input, Table, message } from "antd";
import { FundOutlined } from '@ant-design/icons';
import '../index.less'
import { store } from '@/pages/Store/store'
import { Provider } from 'react-redux'
import ToolDialog from "../components/Public/ScreenDialog";
const Screen = () => {
  const [modelData, setModelData] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const [dialogProps, setDialogProps] = useState({})
  // 分析结果弹窗
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  const handleModelList = () => {
    getStrategyList().then((res) => {
      setModelData(res.data)
    })
  }
  const handleOpen = (item) => {
    const dialogProp = {
      title: "Edit Tool",
      type: "EDIT",
      cancelButtonName: 'Cancel',
      confirmButtonName: '保存',
      data: item
    }
    setShowDialog(true)
    setDialogProps(dialogProp)
  }
  const onConfirm = (item) => {
    setShowDialog(false)
    const option = item.map((item) => {
      return {
        feature_name: item.feature_name,
        mode: item.operator,
        val: item.val
      }
    })
    const data = {
      data: option
    }
    getStrategySeek(data).then((res) => {
      message.success(res.msg);
      const resData = res.data.result;
      const arr = [];
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
            compare: (a, b) => {
              console.log(a[item], b[item], '数据展示');
              return a[item] - b[item]
            },
          },
        };
      });
      const firstName = {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 300
      };

      const tableData = row.map((name, i) => {
        const rowData = { name };
        title.forEach((column, j) => {
          rowData[column] = Number(arr[j][i]).toFixed(4)
        });
        return rowData;
      });
      setColumns([firstName, ...columnsone]);
      setDataSource(tableData);
      setIsModalOpen(true);
    })
  }
  const tableListClose = () => {
    setIsModalOpen(false)
  }
  const onDelete = (item) => {
    deleteStrategy(item).then((res)=>{
      setShowDialog(false)
      message.success("删除成功");
      handleModelList()
    })
  }
  useEffect(() => {
    handleModelList()
  }, [])
  return (
    <div>
      <Provider store={store} >
        <PageHeader title="模型" >
          <div className="cardList" >
            {modelData.map((item, index) => {
              return (
                <Card
                  key={index}
                  hoverable
                  style={{ width: '300px' }}
                  onClick={() => handleOpen(item)}
                >
                  <FundOutlined /> <p>{item?.name}</p>
                </Card>
              )
            })
            }
          </div>
        </PageHeader>
        <ToolDialog
          show={showDialog}
          dialogProps={dialogProps}
          onCancel={() => setShowDialog(false)}
          onConfirm={onConfirm}
          onDelete={onDelete}
        />

        <Modal title="分析结果" width={1200} bodyStyle={{ height: 500 }} open={isModalOpen} onOk={tableListClose} onCancel={tableListClose} >
          <ProCard bordered style={{ width: '100%',height:'100%', overflow: 'auto' }}>
            <Table dataSource={dataSource} columns={columns} />
          </ProCard>
        </Modal>
      </Provider>

    </div>
  )
}

export default Screen