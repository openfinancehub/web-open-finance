import React, { useState, useEffect } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Space, Dropdown, Popover, Select, MenuProps } from 'antd';
const { Option } = Select;
import { Stock } from '@ant-design/plots';
import { Link, request } from 'umi';
import { ProFormGroup, ProFormDependency, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import './style.css'


// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MyComponentProps {
    // Define any props required by the component
}


const Demo: React.FC<MyComponentProps> = () => {

    return (
        <div>
            <ProFormText name="name" label="姓名" />
            <ProFormSelect
                name="addr"
                width="md"
                label="与 name 联动的选择器"
                // dependencies 的内容会注入 request 中
                dependencies={['name']}
                request={async (params) => [
                    { label: params.name, value: 'all' },
                    { label: 'Unresolved', value: 'open' },
                    { label: 'Resolved', value: 'closed' },
                    { label: 'Resolving', value: 'processing' },
                ]}
            />
        </div>
    )
}
export default Demo;