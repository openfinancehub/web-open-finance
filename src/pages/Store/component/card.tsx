import { Card, Col, Row } from 'antd';
import { history, useModel } from '@umijs/max';

export default function AgentCard(props) {
    console.log(props)
    const onClick = () => {
        sessionStorage.setItem('role', JSON.stringify(props.title));
        history.push({
          pathname: `/finchat`
        });
      };
    return (
        <Col>
            <Card
                hoverable
                style={{ width: 180, height: 240 }}
                title= {props.title}
                cover={<img alt= {props.title} src={props.url}/>}
                bordered={false}
                onClick={onClick}
            >
                {props.desc}
            </Card>
        </Col>
    )
}