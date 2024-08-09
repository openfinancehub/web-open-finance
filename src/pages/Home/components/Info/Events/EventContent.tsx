import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { MarketService } from '../../../service';
import CalendarList from './CalendarList';
import { ProCard } from '@ant-design/pro-components';

const EventContent: React.FC = () => {


    return (
        <ProCard direction="row" wrap>

            <ProCard >
                <CalendarList />
            </ProCard>

        </ProCard >
    )
}

export default EventContent;
