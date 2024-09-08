import { getStrategyList, getStrategySeek,deleteStrategy,putStratrgy,addStratrgy } from "../api/other";
import { useState, useEffect } from "react";
import { ProCard } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import { PageHeader, Card, Modal, Table, message,Button } from "antd";
import { FundOutlined } from '@ant-design/icons';
import '../index.less'
import { store } from '@/pages/Store/store'
import { Provider } from 'react-redux'
import ToolDialog from "../components/Public/ScreenDialog";
import AddScreenDialog from "../components/Public/AddScreenDialog";
const Screen = () => {
  const [modelData, setModelData] = useState([])
  const [addDialogProps,setAddDialogProps] = useState({})
  const [showAddDialog,setAddDialog] = useState(false)
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
      message.success("查询成功");
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
  const onSaveData = (data) => {
    putStratrgy(data).then((res)=>{
      message.success("保存成功")
    })
    setShowDialog(false)
    handleModelList()
  }
  const onDelete = (item) => {
    deleteStrategy(item).then((res)=>{
      setShowDialog(false)
      message.success("删除成功");
    })
    setShowDialog(false)
    handleModelList()
  }
  const createCard = () => {
    const dialogProp = {
      title:"Add New Tool",
      type:"ADD",
      cancelButtonName: 'Cancel',
      confirmButtonName: '新增',
      data:{}
    }
  setAddDialogProps(dialogProp)
  setAddDialog(true)
  }
  const startAddCard = (data) => {
    addStratrgy(data).then((res)=>{
      message.success("创建成功")
    })
    setAddDialog(false)
    handleModelList()
  }
  useEffect(() => {
    handleModelList()
  }, [])
  return (
    <div>
      <Provider store={store} >
        <PageHeader title="筛选列表" >
          <div style={{marginBottom:"20px"}} ><Button type="primary" onClick={createCard}  icon={<PlusOutlined />}>新增</Button></div>
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
          saveData={onSaveData}
        />
        <AddScreenDialog
             show={showAddDialog}
             dialogProps={addDialogProps}
             onCancel={() => setAddDialog(false)}
             onConfirm={()=> setAddDialog(false)}
             saveData={startAddCard}
        ></AddScreenDialog>
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