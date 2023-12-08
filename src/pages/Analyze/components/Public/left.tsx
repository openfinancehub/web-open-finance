import { useEffect,useState } from 'react'
import { request } from 'umi';
import { Button, Space } from 'antd';
export default function left({ onDataChange }) {
    const size = 'large'
    // 股票种类的数据
    const [sotckListData, setsotckList] = useState([])
    const [selectedButton, setSelectedButton] = useState('')
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
            const first = res.data[0].split(',')[0]            
            setSelectedButton(first)
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
            <div style={{ textAlign: "center", height: "88vh", overflowY: "auto",width:'100%' }}>
                <Space direction="vertical" style={{width:'100%',padding:'0 20px'}}>
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
