import { Card, Drawer, InputNumber } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import { ProCard, ProTable } from '@ant-design/pro-components';


interface PDFProps {
    url: string;
}



const PDFContent: React.FC<PDFProps> = ({ url }) => {

    // useEffect(() => {
    // }, [url]);

    return (
        <div >
            <iframe 
                key={url}
                src={url}
                title="PDF Viewer"
                width="100%"
                height="100%"
            />
        </div >
    );
};

export default PDFContent;