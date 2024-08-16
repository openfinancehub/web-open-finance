import { getFactorList } from "../api/other";
import { useState, useEffect } from "react";
import { PageHeader, Card,Modal,Form,Input } from "antd";
import { FundOutlined } from '@ant-design/icons';
import { store } from '@/pages/Store/store'
import '../index.less'
import { Provider } from 'react-redux'
import ToolDialog from "../components/Public/ToolDialog";
const Factor = () => {
  const [modelData, setModelData] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const [dialogProps, setDialogProps] = useState({})
  const handleModelList = () => {
    getFactorList().then((res) => {
      setModelData(res.data)
      console.log(res.data,'因子数据');
      
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
    setDialogProps(dialogProp)
    setShowDialog(true)
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
      <PageHeader title="量化因子" >
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

export default Factor