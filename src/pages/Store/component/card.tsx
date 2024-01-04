import { Card, Col, Row } from 'antd';
import { history, useModel } from '@umijs/max';
import { stringify } from 'rc-field-form/es/useWatch';

export default function AgentCard(props) {
    // console.log(props, "props");
    const onClick = () => {
        sessionStorage.setItem('role', JSON.stringify(props));
        history.push({
          pathname: `/finchat`
        });
      };
    return (
        <Col>
            <Card
                hoverable
                style={{ width: 180, height: 240 }}
                title= {props.role}
                cover={<img alt= {props.role} src={props.icon}/>}
                bordered={false}
                onClick={onClick}
            >
                {props.desc}
            </Card>
        </Col>
    )
}