import { useEffect, useState } from 'react'
import { request } from 'umi';
import { Button, Space,Input } from 'antd';
export default function left({ onDataChange }) {
    const size = 'large'
    // 股票种类的数据
    const [sotckListData, setsotckList] = useState([])
    const [selectedButton, setSelectedButton] = useState('') 
    // 数据备份用于过滤
    const [filterData,setFilterList] = useState([])
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
            const list = res.data.map((item) => {
                return item.split(',')
            })
            setsotckList(list)
            setFilterList(list)

        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        sotckList()
    }, [])
    
    const changeButton =(event:React.ChangeEvent<HTMLInputElement>)=>{
        const filtered = filterData.filter((item)=>{
            return item[0].includes(event.target.value)
        })
        console.log(filtered);
        
        setsotckList(filtered)
    }
    // 点击切换股票数据
    const handleButtonChange = (buttonStr: React.SetStateAction<string>, butttonId: string, buttonNum: any) => {
        setSelectedButton(buttonStr);
        onDataChange(butttonId, buttonNum)
    };
    return (
        <div style={{ textAlign: "center", height: "88vh", overflowY: "auto", width: '100%' }}>
            <div style={{width:'80%',margin:'0 auto',marginBottom:20,}}>
                <Input onChange={changeButton} placeholder='请输入股票名称' />
            </div>
            <Space direction="vertical" style={{ width: '100%'}}>
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
