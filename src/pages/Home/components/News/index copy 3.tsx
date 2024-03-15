
import React, { useRef, useState } from "react";
import { Tabs, Swiper } from "antd-mobile";
import { SwiperRef } from "antd-mobile/es/components/swiper";
import GetPullToRefreshlData from "./getPullToRefreshlData";
import "./styles.less";

const tabItems = [
  { key: "market", title: "市场" },
  { key: "events", title: "事件" },
  { key: "stocks", title: "股票" },
  { key: "my", title: "我的" }
];
export default function () {
  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(1);
  return (
    <div>
      <div
        style={{ position: "sticky", top: 0, zIndex: 2, background: "#fff" }}
      >
        <Tabs
          className="fixedBottom"
          activeKey={tabItems[activeIndex].key}
          onChange={(key) => {
            const index = tabItems.findIndex((item) => item.key === key);
            setActiveIndex(index);
            swiperRef.current?.swipeTo(index);
          }}
        >
          {tabItems.map((item) => (
            <Tabs.Tab title={item.title} key={item.key} />
          ))}
        </Tabs>
      </div>
      <Swiper
        direction="horizontal"
        loop
        indicator={() => null}
        ref={swiperRef}
        defaultIndex={activeIndex}
        onIndexChange={(index) => {
          setActiveIndex(index);
        }}
      >
        <Swiper.Item>
          <div className="ontent">
            <GetPullToRefreshlData itemKey="1" />
            市场
          </div>
        </Swiper.Item>
        <Swiper.Item>
          <div className="ontent">
            <GetPullToRefreshlData itemKey="2" />
            事件
          </div>
        </Swiper.Item>
        <Swiper.Item>
          <div className="ontent">
            <GetPullToRefreshlData itemKey="3" />
            股票
          </div>
        </Swiper.Item>
        <Swiper.Item>
          <div className="ontent">
            <GetPullToRefreshlData itemKey="4" />
            我的
          </div>
        </Swiper.Item>
      </Swiper>
    </div>
  );
}
