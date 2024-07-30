import { Alert, Calendar } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import React, { useState } from 'react';

const Text: React.FC = () => {
    const [value, setValue] = useState(() => moment('2024-07-30'));
    const [selectedValue, setSelectedValue] = useState(() => moment('2024-07-30'));

    const onSelect = (newValue: Moment) => {
        setValue(newValue);
        setSelectedValue(newValue);
    };

    const onPanelChange = (newValue: Moment) => {
        setValue(newValue);
    };

    return (
        <div>
            <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`} />
            <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange} />
        </div>
    );
};

export default Text;