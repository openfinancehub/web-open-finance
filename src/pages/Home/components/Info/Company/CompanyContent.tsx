import { useEffect, useState } from 'react';
import { MarketService } from '../../../service';
import { Card, Carousel, Col, Drawer, Input, Modal, Row, Skeleton, message } from 'antd';
import DefaultChart from '../Public/DefaultChart';
import ReactMarkdown from 'react-markdown';

const { Search } = Input;

interface StockAnalysis {
  [section: string]: SectionData;
}

interface SectionData {
  indicator: string[];
  charts: ChartData[];
  docs: DocData[];
}

interface ChartData {
  result: string;
  chart: any;
}

interface DocData {
  title: string;
  doc: string;
  source: string;
}

export default function CompanyContent() {

  const [isLoading, setIsLoading] = useState(true);
  const [company, setCompany] = useState<string>('贵州茅台');
  const [data, setData] = useState<StockAnalysis>({});
  const [visibleChartsMap, setVisibleChartsMap] = useState(new Map<string, number>());

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentChart, setCurrentChart] = useState<any>(null);

  const fetchStockData = async (value: string) => {
    try {
      setIsLoading(true);
      const response = await MarketService.getStockData(value);

      if (response && Object.keys(response).length > 0) {
        setData(response);
        console.log(data, 'data');
      }
    } catch (error) {
      console.error('Fetch data error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSearch = (value: string) => {
    setCompany(value);
    console.log(value);
  };

  const isShowChart = (chartData: any) => {
    console.log(chartData, 'chartData');
    setIsModalOpen(true);
    setCurrentChart(chartData)
  };

  // const onMore = (key: string) => {
  //   const charts = data[key]?.charts;
  //   if (charts) {
  //     const currentVisibleCharts = visibleChartsMap.get(key) || 1;
  //     if (currentVisibleCharts < charts.length) {
  //       // 显示所有图表
  //       setVisibleChartsMap(prevState => {
  //         return new Map(prevState.set(key, charts.length));
  //       });
  //     } else if (charts.length === 1) {
  //       // 提示暂无更多数据
  //       message.info("暂无更多数据")
  //       // console.log("暂无更多数据")
  //     } else {
  //       // 收起图表
  //       setVisibleChartsMap(prevState => {
  //         return new Map(prevState.set(key, 1));
  //       });
  //     }
  //   }
  // };

  useEffect(() => {
    fetchStockData(company);
  }, [company]);

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Search
            placeholder={`当前搜索公司为:${company}`}
            allowClear
            enterButton="Search"
            onSearch={onSearch}
            style={{ width: 304 }}
          />
        </Col>
      </Row>
      <Skeleton loading={isLoading} round active >
        {Object.entries(data).map(([key, value], index) => {
          const { indicator, charts, docs } = value
          // 默认显示 1 个图表
          const visibleCharts = visibleChartsMap.get(key) || 1;

          return (
            <Card
              loading={isLoading}
              key={key}
              style={{ margin: '16px 0 16px 0' }}
              headStyle={{ textAlign: 'left' }}
              title={<h2>{key}</h2>}
            // extra={
            //   <a onClick={() => onMore(key)} >
            //     {visibleCharts === 1 ? '查看更多' : '收起'}
            //   </a>
            // }
            >
              {indicator.length > 0 && (
                <Card style={{ textAlign: 'left', marginBottom: 16 }} key={`indicator` + index}>
                  {indicator.map((item, index) => (
                    <ReactMarkdown key={`指标-${index}`}>
                      {`指标 ${index}: ${item}`}
                    </ReactMarkdown>
                  ))}
                </Card>
              )}

              <Card key={`charts` + index} style={{ width: '100%', marginBottom: 16 }}>
                <Carousel
                  arrows
                  infinite={false}
                  dots
                  slidesToShow={Math.min(3, charts.length)}
                  slidesToScroll={1}
                >
                  {charts.map((chartData, index) => (
                    <Card
                      onClick={() => isShowChart(chartData.chart)}
                      bordered={false}
                      key={`chartsCol${index}`}
                    >
                      <Card>
                        <DefaultChart optionData={chartData.chart} width={'100%'} height={'300px'} />
                      </Card>
                      <Card>
                        <ReactMarkdown>
                          {chartData.result}
                        </ReactMarkdown>
                      </Card>
                    </Card>
                  ))}
                </Carousel>
              </Card>

              <Card key={`docs` + index}>
                {docs.map((docData) => (
                  <ReactMarkdown key={`ReactMarkdown` + index}>
                    {`docs中的文本` + docData.doc}
                  </ReactMarkdown>
                ))}
              </Card>
            </Card>
          )
        })}
        <Modal
          centered
          open={isModalOpen}
          onOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
          width={1000}
        >
          <DefaultChart optionData={currentChart} width={'100%'} height={'500px'} />
        </Modal>
      </Skeleton>
    </div>
  );
}