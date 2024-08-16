import { getModelList } from "../api/other";
import { useState, useEffect } from "react";
import { PageHeader, Card,Modal,Form } from "antd";
import { FundOutlined } from '@ant-design/icons';
import ToolDialog from "../components/Public/ToolDialog";
import { Provider } from 'react-redux'
import { store } from '@/pages/Store/store'
import '../index.less'
const Model = () => {
  const [modelData, setModelData] = useState([])
  const [showDialog,setShowDialog] = useState(false)
  const [dialogProps, setDialogProps] = useState({})
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
      confirmButtonName: 'Save',
      data:item
    }
    setShowDialog(true)
    setDialogProps(dialogProp)
  }
  const onConfirm = () => {
    setShowDialog(false)
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
      >
      </ToolDialog>
      </Provider>
   
    </div>
  )
}

export default Model