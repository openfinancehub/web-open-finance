import { useEffect, useState } from 'react';
import { request } from 'umi';
import { Select, Button, Input, Space,message  } from 'antd';
import { useModel } from '@umijs/max';

const Screen = () => {
    const {
        initialState: { currentUser }
      } = useModel('@@initialState');
    const [factor, setFactor] = useState([])
    const [mode, setMode] = useState([])
    const [facotrLi, setFactorLi] = useState('')
    const [modeLi, setModeLi] = useState('')
    const [inputValue,setInputValue] = useState('')
    const commonHeader = {
        user: currentUser.username,
        req_id: currentUser.id,
        req_src: currentUser.avatarUrl,
        token: currentUser.token
    }
    const getFactor = () => {
        request('/quent-api/factor', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            setFactorLi(res.result.factor[0])
            setModeLi(res.result.mode[0])
            let factorData = res.result.factor.map((item: string) => {
                return {
                    value: item,
                    lable: item
                }
            });
            let modeData = res.result.mode.map((item: string) => {
                return {
                    value: item,
                    lable: item,
                }
            })
            setFactor(factorData)
            setMode(modeData)
        })
    }
    
    const postFetch = () => {
        const data = {
            factor: facotrLi,
            mode: modeLi,
            val: inputValue,
            extra:''
        }
        request('quent-api/fetch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
            header:commonHeader
        }).then((res)=>{
            message.info(res.msg)
        })
    }
    useEffect(() => {
        getFactor()
    }, [])
    function handleFacChange(value: any) {
        console.log(value);
        setFactorLi(value)
    }
    function handleMoChange(value: any) {
        console.log(value);
        setModeLi(value)
    }
    function handleQuery() {
        postFetch()

    }
    const handleInput = (e:any)=>{
        setInputValue(e.target.value)
    }
    return (
        <div>
            <Space>
                <Input placeholder="请输入要查询的股票"
                    onChange={handleInput}
                />
                <Select
                    defaultValue="请选择条件"
                    style={{ width: 240 }}
                    onChange={handleFacChange}
                    options={factor}
                />
                <Select
                    defaultValue="请选择条件"
                    style={{ width: 240 }}
                    onChange={handleMoChange}
                    options={mode}
                />
                <Button type="primary" onClick={handleQuery}>查询</Button>
            </Space>
        </div>
    )
}
export default Screen