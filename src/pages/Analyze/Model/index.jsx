import { getModelList,putModelLi,deleteModelLi,addModelLi } from "../api/other";
import { useState, useEffect } from "react";
import { PageHeader, Card,Modal,Form, message,Button } from "antd";
import { FundOutlined,PlusOutlined } from '@ant-design/icons';
import ToolDialog from "../components/Public/ToolDialog";
import AddDialog from "../components/Public/AddDialog";
import { Provider } from 'react-redux'
import { store } from '@/pages/Store/store'
import '../index.less'
const Model = () => {
  const [modelData, setModelData] = useState([])
  const [showDialog,setShowDialog] = useState(false)
  const [dialogProps, setDialogProps] = useState({})
  const [addDialogProps,setAddDialogProps] = useState({})
  const [showAddDialog,setAddDialog] = useState(false)
  const handleModelList = () => {
    getModelList().then((res) => {
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
    setShowDialog(true)
    setDialogProps(dialogProp)
  }
  const onConfirm = () => {
    setShowDialog(false)
  }
  const onDelete = (id) => {
    deleteModelLi(id).then((res)=>{
      message.success("删除成功")
    })
    setShowDialog(false)
    handleModelList()
  }
  const onSaveData = (data) => {
    putModelLi(data).then((res)=>{
      message.success("保存成功")
    })
    setShowDialog(false)
    handleModelList()
  }
  const createCard = () =>{
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
    addModelLi(data).then((res)=>{
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
      <PageHeader title="模型" >
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
          onConfirm={onConfirm}
          onDelete={onDelete}
          saveData={onSaveData}
      >
      </ToolDialog>
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

export default Model