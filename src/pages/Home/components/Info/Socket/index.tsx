
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useCallback, useEffect, useState } from 'react';
import { MarketService } from '../../../service/';
import { Button, Card, Carousel, Col, Drawer, Input, Row, Skeleton, Space, Spin, Typography } from 'antd';
import DefaultChart from './DefaultChart';
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

export default function StockTable() {

  const [isLoading, setIsLoading] = useState(true);
  const [company, setCompany] = useState<string>('贵州茅台');
  const [data, setData] = useState<StockAnalysis>({});

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
    setCompany(value)
    console.log(value);
  }

  useEffect(() => {
    fetchStockData(company);
  }, [company]);

  return (
    <Row gutter={[16, 16]}>
      <Col offset={16} span={8}>
        <Search
          placeholder={`当前搜索公司为:` + company}
          allowClear
          enterButton="Search"
          onSearch={onSearch}
          style={{ width: 304 }}
        />
      </Col>
      <Skeleton loading={isLoading} round active >
        {Object.entries(data).map(([key, value], index) => (
          <Col span={24} key={index}>
            <Card
              loading={isLoading}
              headStyle={{ textAlign: 'left' }}
              title={<h2>{key}</h2>}
            >
              <Carousel key={`charts` + index} arrows dotPosition="bottom" infinite={false} dots>
                {value.charts.map((chartData) => (
                  <div key={`chartData` + index}>
                    <DefaultChart optionData={chartData.chart} width={'90%'} height={'300px'} />
                    <Typography.Paragraph
                      ellipsis={{
                        expandable: true,
                        onExpand: (event) => event.altKey,
                      }}
                      copyable
                    >
                      {chartData.result}
                    </Typography.Paragraph>
                  </div>
                ))}
              </Carousel>
              <div key={`docs` + index}>
                {value.docs.map((docData) => (
                  <ReactMarkdown key={`ReactMarkdown` + index}>
                    {`docs中的文本` + docData.doc}
                  </ReactMarkdown>
                ))}
              </div>
            </Card>
          </Col>
        ))}
      </Skeleton>
    </Row >
  );
}