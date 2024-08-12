import { Card } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
// import viewer from '../pdfjs/web/viewer'
// import * as pdfjsLib from 'pdfjs-dist/webpack';
// import * as pdf from 'pdfjs-dist'
// import pdfWorker from 'pdfjs-dist/build/pdf.worker.js?url'
import RcResizeObserver from 'rc-resize-observer';
import { ProCard, ProTable } from '@ant-design/pro-components';
const Text: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [responsive, setResponsive] = useState(false);
    return (
        <RcResizeObserver
            key="resize-observer"
            onResize={(offset) => {
                setResponsive(offset.width < 596);
            }}
        >
            <ProCard split={responsive ? 'horizontal' : 'vertical'}>
                <ProCard bordered >
                    <a href="https://pdf.dfcfw.com/pdf/H2_AN202408061639155597_1.pdf?1722936327000.pdf" target="_blank">
                        点击在新窗口查看
                    </a>
                </ProCard>

                <ProCard bordered  >
                    <embed src="https://pdf.dfcfw.com/pdf/H2_AN202408061639155597_1.pdf?1722936327000.pdf#page=2"
                        title="PDF Viewer"
                        width="100%"
                        height="500px">
                    </embed>
                </ProCard>

            </ProCard>
        </RcResizeObserver>
    );
};

export default Text;