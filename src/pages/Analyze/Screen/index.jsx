import { getStrategyList } from "../api/other";
import { useState, useEffect } from "react";
import { PageHeader, Card,Modal,Form,Input } from "antd";
import { FundOutlined } from '@ant-design/icons';
import '../index.less'
import ToolDialog from "../components/Public/ToolDialog";
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
      />

      {/* <Modal
        title="详情"
        open={detailsModalOpen}
        onOk={handleOk}
        width={1000}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={initValue}
        >
          <Form.Item label="Tool Name" name="name" >
            <Input placeholder="Tool Name" />
          </Form.Item>
          <Form.Item label="Tool description" name="description" >
            <Input placeholder="Tool description" ></Input>
          </Form.Item>
          <Form.Item label="Tool Icon Source"  >
          <Input placeholder="Tool Icon Source" ></Input>
          </Form.Item>
        </Form>
      </Modal> */}
    </div>
  )
}

export default Screen