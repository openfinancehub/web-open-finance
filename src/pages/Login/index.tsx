import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginFormPage,
  ProForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText
} from '@ant-design/pro-components';
import { Tabs, message } from 'antd';
// import type { CSSProperties } from 'react';
import { useState } from 'react';
import { history, useModel } from 'umi';

import { LoginServices } from '@/services';

type LoginType = 'phone' | 'account';

// const iconStyles: CSSProperties = {
//   color: 'rgba(0, 0, 0, 0.2)',
//   fontSize: '18px',
//   verticalAlign: 'middle',
//   cursor: 'pointer'
// };

export default () => {
  const [loginType, setLoginType] = useState<LoginType>('phone');
  const { initialState, setInitialState } = useModel('@@initialState');

  const [form] = ProForm.useForm();

  const handleSubmit = async (values: { mobile: string; captcha: string }) => {
    try {
      const { mobile: username, captcha } = values;
      let res = await LoginServices.login({ username, captcha });
      console.log(res, 'res');
      res = {
        data: {
          id: 1,
          username: '13476722550',
          nickName: '小伙伴66254',
          avatarUrl:
            'https://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=%E5%A4%B4%E5%83%8F&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&hd=undefined&latest=undefined&copyright=undefined&cs=297808936,3321743440&os=321555049,2416277572&simid=297808936,3321743440&pn=68&rn=1&di=7229357672103936001&ln=1896&fr=&fmq=1689691787817_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=3c&objurl=https%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F31%2F8c%2F55%2F318c5586cf3a7a757684d9567fdbee66.jpg&rpstart=0&rpnum=0&adpicid=0&nojc=undefined&dyTabStr=MCw2LDMsMSw0LDUsMiw4LDcsOQ%3D%3D',
          token:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuaWNrbmFtZSI6IuWwj-S8meS8tDY2MjU0IiwiaWQiOjEsImV4cCI6MTY5MDI5ODU1NX0.TvvWTHJWziqfMVeK8EpUvLEQ1rXbhpe0R6I08a7UTAc'
        }
      };
      await setInitialState(s => ({
        ...s,
        currentUser: res.data
      }));
      localStorage.setItem('userInfo', JSON.stringify(res.data));
      history.push('/home');
    } catch (error) {
      message.error(error?.msg);
      console.log(error, 'error');
    }
  };

  const sendSmsCode = async (phone: any) => {
    try {
      const res = LoginServices.getCaptcha({ phone });
      console.log(res, 'res');
    } catch (error) {}
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        height: 'calc(100vh - 48px)'
      }}>
      <LoginFormPage
        form={form}
        backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
        // logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        title="Open Finance"
        subTitle="全球最大的金融投资平台"
        onFinish={handleSubmit}>
        <Tabs
          centered
          activeKey={loginType}
          onChange={activeKey => setLoginType(activeKey as LoginType)}>
          <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
          <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
        </Tabs>
        {loginType === 'account' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />
              }}
              placeholder={'用户名: admin or user'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!'
                }
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />
              }}
              placeholder={'密码: ant.design'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！'
                }
              ]}
            />
          </>
        )}
        {loginType === 'phone' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MobileOutlined className={'prefixIcon'} />
              }}
              name="mobile"
              placeholder={'手机号'}
              rules={[
                {
                  required: true,
                  message: '请输入手机号！'
                },
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: '手机号格式错误！'
                }
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />
              }}
              captchaProps={{
                size: 'large'
              }}
              placeholder={'请输入验证码'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'获取验证码'}`;
                }
                return '获取验证码';
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: '请输入验证码！'
                }
              ]}
              onGetCaptcha={async () => {
                const phone = form.getFieldValue('mobile');
                if (!phone) {
                  message.error('请先输入手机号');
                  throw new Error();
                }
                const m = form.getFieldsError(['mobile']);
                console.log(m);
                if (m[0].errors.length > 0) {
                  message.error(m[0].errors[0]);
                  throw new Error();
                }
                console.log(phone, 'mobile');
                await sendSmsCode(phone);
                message.success('获取验证码成功！验证码为：1234');
              }}
            />
          </>
        )}
        <div
          style={{
            marginBlockEnd: 24
          }}>
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <a
            style={{
              float: 'right'
            }}>
            忘记密码
          </a>
        </div>
      </LoginFormPage>
    </div>
  );
};
