import { getStrategyList } from "../api/other";
import { useState, useEffect } from "react";
import { PageHeader, Card,Modal,Form,Input } from "antd";
import { FundOutlined } from '@ant-design/icons';
import '../index.less'
import { store } from '@/pages/Store/store'
import { Provider } from 'react-redux'
import ScreenDialog from "../components/Public/ScreenDialog";
const Screen = () => {
  const [modelData, setModelData] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const [dialogProps, setDialogProps] = useState({})
  const handleModelList = () => {
    getStrategyList().then((res) => {
      setModelData(res.data)
    })
  }
  const handleOpen = (item) => {
    const dialogProp = {
      title:"Edit Tool",
      type:"EDIT",
      cancelButtonName: 'Cancel',
      confirmButtonName: '分析',
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
      <ScreenDialog
            show={showDialog}
            dialogProps={dialogProps}
            onCancel={() => setShowDialog(false)}
            onConfirm={onConfirm}
      />
      </Provider>
    </div>
  )
}

export default Screen