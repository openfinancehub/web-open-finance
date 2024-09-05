import { Card, Drawer, InputNumber } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import { ProCard, ProTable } from '@ant-design/pro-components';
import PDFContent from './PDFContent';

const Text: React.FC = () => {
    const [page, setPage] = useState<number>(0);
    // https://api.idocv.com/view/url?url=http%3a%2f%2fapi.idocv.com%2fdata%2fdoc%2ftest.pdf
    // https://pdf.dfcfw.com/pdf/H2_AN202408191639329975_1.pdf?1724068313000.pdf
    // https://fao.fudan.edu.cn/_upload/article/files/f5/53/8b40af524563b9b60049899b2dd3/c9a205b4-4188-4af3-863e-bc4e56872e33.pdf
    const [url, setUrl] = useState<string>();

    const changeURL = (value: string) => {
        setUrl(value + '#page=' + page)
        console.log(url)
    }

    const onChange = (value) => {
        setPage(value)
    };


    return (
        <div >
            <div>
                <a onClick={() => changeURL(`https://a.data96.com/pdf_preview/upload/%E4%B8%AD%E6%96%87.pdf`)}>
                    open PDF
                </a>
                <InputNumber min={1} max={10} onChange={onChange} defaultValue={1} />
            </div>
            {url ? <PDFContent url={url}></PDFContent> : <div></div>}
        </div >
    );
};

export default Text;