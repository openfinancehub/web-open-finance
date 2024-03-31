import { useEffect, useState } from 'react';
import { request } from 'umi';
import { Select , Button } from 'antd';


const Screen = () => {
    const [factor,setFactor] = useState([])
    const [mode,setMode] = useState([])
    const [facotrLi,setFactorLi] = useState('')
    const [modeLi,setModeLi] = useState('')
    const getFactor = () => {
        request('/quent-api/factor', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            setFactorLi(res.result.factor[0])
            setModeLi(res.result.mode[0])
            let factorData = res.result.factor.map((item:string) => {
                return {
                    value:item,
                    lable:item
                }
            });
            let modeData = res.result.mode.map((item:string)=>{
                return{
                    value:item,
                    lable:item,
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
            val: 1
        }
        request('quent-api/fetch', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        })
    }
    useEffect(() => {
        getFactor()
    }, [])
    function handleFacChange(value:any){
        console.log(value);  
        setFactorLi(value)
    }
    function handleMoChange(value:any){
        console.log(value);
        setModeLi(value)
    }
    function handleQuery(){
        postFetch()
    }
    return (
        <div>
            <Select
                defaultValue="请选择条件"
                style={{ width: 240 }}
                onChange={handleFacChange}
                options={factor}
            />

            &nbsp;&nbsp;
             <Select
                defaultValue="请选择条件"
                style={{ width: 240 }}
                onChange={handleMoChange}
                options={mode}
            />

            &nbsp;&nbsp;
            <Button type="primary" onClick={handleQuery}>查询</Button>
        </div>
    )
}
export default Screen