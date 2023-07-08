import { PlusOutlined, HomeOutlined, ContactsOutlined, ClusterOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Divider, Input, Row, Tag } from 'antd';
import React, { useState, useRef } from 'react';
import { GridContent } from '@ant-design/pro-components';
import { Link, useRequest } from 'umi';
import type { RouteChildrenProps } from 'react-router';
import Projects from './components/Projects';
import Articles from './components/Articles';
import Applications from './components/Applications';
import type { CurrentUser, TagType, tabKeyType } from './data.d';
import { queryCurrent } from './service';
import styles from './Center.less';

const operationTabList = [
  {
    key: 'articles',
    tab: (
      <span>
        文章 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
  {
    key: 'applications',
    tab: (
      <span>
        应用 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
  {
    key: 'projects',
    tab: (
      <span>
        项目 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
];

const TagList: React.FC<{ tags: CurrentUser['tags'] }> = ({ tags }) => {
  const ref = useRef<Input | null>(null);
  const [newTags, setNewTags] = useState<TagType[]>([]);
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const showInput = () => {
    setInputVisible(true);
    if (ref.current) {
      // eslint-disable-next-line no-unused-expressions
      ref.current?.focus();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let tempsTags = [...newTags];
    if (inputValue && tempsTags.filter((tag) => tag.label === inputValue).length === 0) {
      tempsTags = [...tempsTags, { key: `new-${tempsTags.length}`, label: inputValue }];
    }
    setNewTags(tempsTags);
    setInputVisible(false);
    setInputValue('');
  };

  return (
    <div className={styles.tags}>
      <div className={styles.tagsTitle}>标签</div>
      {(tags || []).concat(newTags).map((item) => (
        <Tag key={item.key}>{item.label}</Tag>
      ))}
      {inputVisible && (
        <Input
          ref={ref}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag onClick={showInput} style={{ borderStyle: 'dashed' }}>
          <PlusOutlined />
        </Tag>
      )}
    </div>
  );
};

const Center: React.FC<RouteChildrenProps> = () => {
  const [tabKey, setTabKey] = useState<tabKeyType>('articles');

  //  获取用户信息
  const { data: currentUser, loading } =
  {
    loading: false,
    data: {
      "name": "Serati Ma",
      "avatar": "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
      "userid": "00000001",
      "email": "antdesign@alipay.com",
      "signature": "海纳百川，有容乃大",
      "title": "交互专家",
      "group": "蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED",
      "tags": [
        {
          "key": "0",
          "label": "很有想法的"
        },
        {
          "key": "1",
          "label": "专注设计"
        },
        {
          "key": "2",
          "label": "辣~"
        },
        {
          "key": "3",
          "label": "大长腿"
        },
        {
          "key": "4",
          "label": "川妹子"
        },
        {
          "key": "5",
          "label": "海纳百川"
        }
      ],
      "notice": [
        {
          "id": "xxx1",
          "title": "Alipay",
          "logo": "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
          "description": "那是一种内在的东西，他们到达不了，也无法触及的",
          "updatedAt": "2023-07-08T10:00:55.125Z",
          "member": "科学搬砖组",
          "href": "",
          "memberLink": ""
        },
        {
          "id": "xxx2",
          "title": "Angular",
          "logo": "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",
          "description": "希望是一个好东西，也许是最好的，好东西是不会消亡的",
          "updatedAt": "2017-07-24T00:00:00.000Z",
          "member": "全组都是吴彦祖",
          "href": "",
          "memberLink": ""
        },
        {
          "id": "xxx3",
          "title": "Ant Design",
          "logo": "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png",
          "description": "城镇中有那么多的酒馆，她却偏偏走进了我的酒馆",
          "updatedAt": "2023-07-08T10:00:55.125Z",
          "member": "中二少女团",
          "href": "",
          "memberLink": ""
        },
        {
          "id": "xxx4",
          "title": "Ant Design Pro",
          "logo": "https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png",
          "description": "那时候我只会想自己想要什么，从不想自己拥有什么",
          "updatedAt": "2017-07-23T00:00:00.000Z",
          "member": "程序员日常",
          "href": "",
          "memberLink": ""
        },
        {
          "id": "xxx5",
          "title": "Bootstrap",
          "logo": "https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png",
          "description": "凛冬将至",
          "updatedAt": "2017-07-23T00:00:00.000Z",
          "member": "高逼格设计天团",
          "href": "",
          "memberLink": ""
        },
        {
          "id": "xxx6",
          "title": "React",
          "logo": "https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png",
          "description": "生命就像一盒巧克力，结果往往出人意料",
          "updatedAt": "2017-07-23T00:00:00.000Z",
          "member": "骗你来学计算机",
          "href": "",
          "memberLink": ""
        }
      ],
      "notifyCount": 12,
      "unreadCount": 11,
      "country": "China",
      "geographic": {
        "province": {
          "label": "浙江省",
          "key": "330000"
        },
        "city": {
          "label": "杭州市",
          "key": "330100"
        }
      },
      "address": "西湖区工专路 77 号",
      "phone": "0752-268888888"
    }
  };


  //  渲染用户信息
  const renderUserInfo = ({ title, group, geographic }: Partial<CurrentUser>) => {
    return (
      <div className={styles.detail}>
        <p>
          <ContactsOutlined
            style={{
              marginRight: 8,
            }}
          />
          {title}
        </p>
        <p>
          <ClusterOutlined
            style={{
              marginRight: 8,
            }}
          />
          {group}
        </p>
        <p>
          <HomeOutlined
            style={{
              marginRight: 8,
            }}
          />
          {(geographic || { province: { label: '' } }).province.label}
          {
            (
              geographic || {
                city: {
                  label: '',
                },
              }
            ).city.label
          }
        </p>
      </div>
    );
  };

  // 渲染tab切换
  const renderChildrenByTabKey = (tabValue: tabKeyType) => {
    if (tabValue === 'projects') {
      return <Projects />;
    }
    if (tabValue === 'applications') {
      return <Applications />;
    }
    if (tabValue === 'articles') {
      return <Articles />;
    }
    return null;
  };

  return (
    <GridContent>
      <Row gutter={24}>
        <Col lg={7} md={24}>
          <Card bordered={false} style={{ marginBottom: 24 }} loading={loading}>
            {!loading && currentUser && (
              <div>
                <div className={styles.avatarHolder}>
                  <img alt="" src={currentUser.avatar} />
                  <div className={styles.name}>{currentUser.name}</div>
                  <div>{currentUser?.signature}</div>
                </div>
                {renderUserInfo(currentUser)}
                <Divider dashed />
                <TagList tags={currentUser.tags || []} />
                <Divider style={{ marginTop: 16 }} dashed />
                <div className={styles.team}>
                  <div className={styles.teamTitle}>团队</div>
                  <Row gutter={36}>
                    {currentUser.notice &&
                      currentUser.notice.map((item) => (
                        <Col key={item.id} lg={24} xl={12}>
                          <Link to={item.href}>
                            <Avatar size="small" src={item.logo} />
                            {item.member}
                          </Link>
                        </Col>
                      ))}
                  </Row>
                </div>
              </div>
            )}
          </Card>
        </Col>
        <Col lg={17} md={24}>
          <Card
            className={styles.tabsCard}
            bordered={false}
            tabList={operationTabList}
            activeTabKey={tabKey}
            onTabChange={(_tabKey: string) => {
              setTabKey(_tabKey as tabKeyType);
            }}
          >
            {renderChildrenByTabKey(tabKey)}
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};
export default Center;
