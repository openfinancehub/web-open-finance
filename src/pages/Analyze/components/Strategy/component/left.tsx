import { useEffect,useState } from 'react'
import { request } from 'umi';
import { Button, Space } from 'antd';
export default function Left({ onDataChange }) {
    const size = 'large'
    // 股票种类的数据
    const [sotckListData, setsotckList] = useState([])
    const [selectedButton, setSelectedButton] = useState('平安银行')
    const sotckList = () => {
        const data = {
            key: "8140ad230f687daede75a08855e8ae5ff40c3ba8"
        }
        request('http://139.159.205.40:8808/quant/sotcklist', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(data)
        }).then((res) => {
            setsotckList(res.data.map((item) => {
                return item.split(',')
            }))

        }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        sotckList()
    }, [])

    // 点击切换股票数据
    const handleButtonChange = (buttonStr: React.SetStateAction<string>, butttonId: string, buttonNum: any) => {
        setSelectedButton(buttonStr);
        onDataChange(butttonId,buttonNum)
    };
    return (
            <div style={{ textAlign: "center", height: "88vh", overflow: "auto" }}>
                <Space direction="vertical" >
                    {
                        sotckListData.map((item, index) => {
                            return (
                                <Button key={index} size={size}
                                    type={selectedButton === item[0] ? 'primary' : 'default'}
                                    onClick={() => handleButtonChange(item[0], item[1], item[2])}>{item[0]}</Button>
                            )
                        })
                    }
                </Space>
            </div>
    )
}
