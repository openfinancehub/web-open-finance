import { getModelList } from "../api/other";
import { useState, useEffect } from "react";
import { PageHeader, Card,Modal,Form,Input } from "antd";
import { FundOutlined } from '@ant-design/icons';
import '../index.less'
const Model = () => {
  const [modelData, setModelData] = useState([])
  const [detailsModalOpen,setDetailsModelOpen] = useState(false)
  const [form] = Form.useForm();
  const [initValue,setInitValue] = useState({})
  const handleModelList = () => {
    getModelList().then((res) => {
      setModelData(res.data)
    })
  }
  const handleOpen = (item) => {
    setDetailsModelOpen(true)
    setInitValue(item)
  }
  const handleOk = () =>{
    setDetailsModelOpen(false)
  } 
  const handleCancel = () => {
    setDetailsModelOpen(false)
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
      <Modal
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
      </Modal>
    </div>
  )
}

export default Model