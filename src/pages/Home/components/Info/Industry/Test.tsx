import { Card } from 'antd';
import React, { useState, useEffect, useRef } from 'react';

const Text: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const loadPdfFile = () => {
        const fileInput = fileInputRef.current;
        if (!fileInput) return;

        const file = fileInput.files?.[0];
        if (!file) return;

        const blobUrl = URL.createObjectURL(file);
        window.open(blobUrl, '_blank');
    };

    return (
        <div>
            <input type="file" accept=".pdf" ref={fileInputRef} />
            <button onClick={loadPdfFile}>点击查看PDF</button>

            <Card title={'iframe方式'} style={{ width: '50%' }}>
                <a href="https://pdf.dfcfw.com/pdf/H2_AN202408061639155597_1.pdf?1722936327000.pdf">
                    点击查看
                </a>
            </Card>

            <Card title={'iframe方式'} style={{ width: '50%' }}>
                <iframe src="https://pdf.dfcfw.com/pdf/H2_AN202408061639155597_1.pdf?1722936327000.pdf">
                </iframe>
            </Card>

            <Card title={'embed方式'} style={{ width: '50%' }}>
                <embed src="https://www.lilnong.top/static/pdf/B-4-RxJS%E5%9C%A8React%E4%B8%AD%E7%9A%84%E5%BA%94%E7%94%A8-%E9%BE%99%E9%80%B8%E6%A5%A0_.pdf">
                </embed>

                <embed src="https://pdf.dfcfw.com/pdf/H2_AN202408061639155597_1.pdf?1722936327000.pdf">
                </embed>
            </Card>

        </div>
    );
};

export default Text;