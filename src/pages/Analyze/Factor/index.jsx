import { getFactorList,changeFactor,deleteFactor,addFactor } from "../api/other";
import { useState, useEffect } from "react";
import { PageHeader, Card, message,Button } from "antd";
import { FundOutlined,PlusOutlined } from '@ant-design/icons';
import { store } from '@/pages/Store/store'
import '../index.less'
import { Provider } from 'react-redux'
import ToolDialog from "../components/Public/ToolDialog";
import AddDialog from "../components/Public/AddDialog";
const Factor = () => {
  const [modelData, setModelData] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const [dialogProps, setDialogProps] = useState({})
  const [addDialogProps,setAddDialogProps] = useState({})
  const [showAddDialog,setAddDialog] = useState(false)
  const handleModelList = () => {
    getFactorList().then((res) => {
      setModelData(res.data)
    })
  }
  const handleOpen = (item) => {
    const dialogProp = {
      title:"Edit Tool",
      type:"EDIT",
      cancelButtonName: 'Cancel',
      confirmButtonName: '保存',
      data:item
    }
    setDialogProps(dialogProp)
    setShowDialog(true)
  }
  const onSaveData = (data) => {
    changeFactor(data).then((res)=>{
      message.success("修改成功")
    })
    setShowDialog(false)
    handleModelList()
  }
  const onDelete = (id) => {
    deleteFactor(id).then((res)=>{
      message.success("删除成功")
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
    addFactor(data).then((res)=>{
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
      <PageHeader title="量化因子" >
      <div style={{marginBottom:"20px"}} ><Button type="primary" onClick={createCard}  icon={<PlusOutlined />}>新增</Button></div>
        <div className="cardList" >
          {modelData.map((item, index) => {
            return (
              <Card
                key={index}
                hoverable
                style={{ width: '300px' }}
                onClick={()=>handleOpen(item)}
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
          onConfirm={()=>setShowDialog(false)}
          onDelete={onDelete}
          saveData={onSaveData}
      />
        <AddDialog
         show={showAddDialog}
         dialogProps={addDialogProps}
         onCancel={() => setAddDialog(false)}
         onConfirm={()=> setAddDialog(false)}
         saveData={startAddCard}
        />
      </Provider>
    </div>
  )
}

export default Factor