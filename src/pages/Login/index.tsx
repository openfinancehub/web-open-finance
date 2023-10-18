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
      const res = await LoginServices.login({ username, captcha });
      if (res?.code === 0) {
        await setInitialState(s => ({
          ...s,
          currentUser: res.data
        }));
        localStorage.setItem('userInfo', JSON.stringify(res.data));
        history.push('/home');
      } else {
        message.error('服务器错误');
      }
    } catch (error: any) {
      if (error) {
        message.error(error.msg);
      }
    }
  };

  const sendSmsCode = async (phone: any) => {
    try {
      const res = await LoginServices.getCaptcha({ phone });
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
