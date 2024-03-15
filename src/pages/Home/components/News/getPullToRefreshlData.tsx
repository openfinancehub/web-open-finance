import React, { useEffect, useState } from "react";
import { InfiniteScroll, PullToRefresh, List } from "antd-mobile";
import { sleep } from "antd-mobile/es/utils/sleep";
import { getNews } from '../../service';
import { getImportantEvents } from '../../service';
import { getMarket } from '../../service';
import { getFocusedStocks } from '../../service';

const GetPullToRefreshlData = (props: { itemKey: string }) => {
    const { itemKey } = props;

    async function getNextData() {
        const ret: string[] = [];
        // return ret;
        let response;
        switch (itemKey) {
            case "1":
                // const ret1: string[] = [];
                response = await getNews();
                if (response.data) {
                    ret.push(response.data.name);
                }
                break;
            case "2":

                response = await getFocusedStocks();
                if (response.data) {
                    ret.push(response.data.description);
                }
                break;
            default:
                response = await getMarket();
                if (response.data) {
                    ret.push(response.data);
                }

        }


        console.log(response, "response")
        // if (response.data) {
        //     show(itemKey);
        // }
        return ret;
    }

    const [data, setData] = useState<string[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const loadMore = async () => {
        const append = await getNextData();
        setData([...data, ...append]);
        setHasMore(append.length > 0);
    };

    useEffect(() => {
        const fetchData = async () => {
            setData([]);
            const newData = await getNextData();
            setData(newData);
        };
        fetchData();
    }, [itemKey]);

    return (
        <div style={{ height: '100vh', overflowY: 'scroll' }}>
            <PullToRefresh
                key={itemKey}
                onRefresh={async () => {
                    await sleep(1000);
                    setData([...await getNextData(), ...data]);
                }}
            >
                <List>
                    {data.map((item: any, index: number) => (
                        <List.Item key={index}>
                            {item}
                        </List.Item>
                    ))}
                </List>
                <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
            </PullToRefresh>
        </div>
    );
};

export default GetPullToRefreshlData;
